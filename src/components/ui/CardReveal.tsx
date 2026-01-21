import { animate, motion, type PanInfo, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface CardRevealProps {
    children: React.ReactNode;
    onFullyRevealed?: () => void;
    language?: 'es' | 'en';
}

export default function CardReveal({ children, onFullyRevealed, language = 'es' }: CardRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const sliderY = useMotionValue(0);
    const dragY = useMotionValue(0);
    const [progressPercent, setProgressPercent] = useState(0);

    const handleTopPercent = useTransform(sliderY, [0, 100], [75, 0]);
    const clipBottom = useTransform(sliderY, [0, 100], [0, 100]);
    const progress = useTransform(sliderY, [0, 100], [0, 100]);

    const badgeOpacity = useTransform(sliderY, [70, 85], [0, 1]);
    const badgeScale = useTransform(sliderY, [70, 85], [0.9, 1]);

    useMotionValueEvent(sliderY, "change", (latest) => {
        setProgressPercent(Math.round(latest));
    });

    const handleDrag = (_: any, info: PanInfo) => {
        if (!containerRef.current) return;

        const containerHeight = containerRef.current.offsetHeight;
        const draggedUpPixels = -info.offset.y;
        const dragPercent = (draggedUpPixels / containerHeight) * 100;
        const clampedPercent = Math.max(0, Math.min(100, dragPercent));

        sliderY.set(clampedPercent);
    };

    const handleDragEnd = () => {
        const currentY = sliderY.get();

        if (currentY > 70) {
            animate(sliderY, 100, {
                type: "spring",
                stiffness: 300,
                damping: 30,
                onComplete: () => {
                    onFullyRevealed?.();
                }
            });
        } else {
            animate(sliderY, 0, {
                type: "spring",
                stiffness: 400,
                damping: 30
            });

            animate(dragY, 0, {
                type: "spring",
                stiffness: 400,
                damping: 30
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl isolate select-none"
        >
            <div className="absolute inset-0 bg-slate-900" />

            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 flex items-center justify-center">
                {children}
            </div>

            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    clipPath: useTransform(
                        clipBottom,
                        (value) => `inset(0 0 ${value}% 0)`
                    )
                }}
            >
                <div className="w-full h-full relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-700/10 to-slate-900/30" />

                    <div
                        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-radial from-slate-700/20 via-transparent to-transparent opacity-40" />

                    <div className="relative h-full flex flex-col items-center justify-center gap-8 px-8">
                        <motion.div
                            animate={{
                                y: [0, -12, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-7xl filter drop-shadow-2xl"
                        >
                            👆
                        </motion.div>

                        <div className="text-center space-y-3">
                            <motion.h3
                                className="text-2xl font-bold text-white tracking-tight"
                                animate={{ opacity: [0.9, 1, 0.9] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            >
                                {language === 'es' ? 'Desliza hacia arriba' : 'Swipe up'}
                            </motion.h3>
                            <p className="text-sm text-slate-400 font-medium">
                                {language === 'es' ? 'Arrastra para revelar tu rol' : 'Drag to reveal your role'}
                            </p>
                        </div>

                        <div className="w-64 space-y-3">
                            <div className="relative h-1.5 bg-slate-700/30 rounded-full overflow-hidden backdrop-blur-sm">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-full relative"
                                    style={{
                                        width: useTransform(progress, (v) => `${v}%`)
                                    }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                        animate={{
                                            x: ['-100%', '200%']
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                </motion.div>
                            </div>
                            <motion.p
                                className="text-xs text-center text-slate-500 font-semibold"
                                style={{
                                    opacity: useTransform(sliderY, [0, 5], [0, 1])
                                }}
                            >
                                {progressPercent}%
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                drag="y"
                dragDirectionLock
                dragElastic={0}
                dragMomentum={false}
                dragConstraints={containerRef}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                style={{
                    top: useTransform(handleTopPercent, (v) => `${v}%`),
                    y: dragY,
                    touchAction: 'none'
                }}
                className="absolute left-0 right-0 -translate-y-1/2 cursor-grab active:cursor-grabbing z-30"
            >
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        style={{
                            opacity: badgeOpacity,
                            scale: badgeScale
                        }}
                        className="pointer-events-none mt-2"
                    >
                        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-slate-600">
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-base"
                            >
                                ✓
                            </motion.span>
                            <span className="text-sm font-bold whitespace-nowrap">
                                {language === 'es' ? 'Revelado' : 'Revealed'}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-2.5 px-5 py-2 bg-slate-900/95 backdrop-blur-xl rounded-full border border-slate-700 shadow-2xl"
                        style={{
                            opacity: useTransform(sliderY, [0, 25], [1, 0])
                        }}
                    >
                        <span className="text-xl">👆</span>
                        <span className="text-xs text-white font-bold tracking-wide">
                            {language === 'es' ? 'Arrastra' : 'Drag'}
                        </span>
                    </motion.div>

                    <div className="w-28 h-1.5 bg-white rounded-full shadow-2xl" />
                </div>
            </motion.div>
        </div>
    );
}
