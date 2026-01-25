import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { IconType } from 'react-icons';
import { HiMinus, HiPlus } from 'react-icons/hi2';
import './Counter.css';

interface CounterProps {
    label: string;
    value: number;
    min: number;
    max: number;
    icon: IconType;
    color: 'primary' | 'danger' | 'success' | 'warning';
    helperText?: string;
    onChange: (value: number) => void;
}

const colorSchemes = {
    primary: {
        gradient: 'from-blue-500 to-cyan-500',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800',
        button: 'counter-button-primary',
        buttonText: 'text-blue-600 dark:text-blue-400',
        ring: 'focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400'
    },
    danger: {
        gradient: 'from-red-500 to-rose-500',
        bg: 'bg-red-50 dark:bg-red-950/30',
        text: 'text-red-600 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        button: 'counter-button-danger',
        buttonText: 'text-red-600 dark:text-red-400',
        ring: 'focus-visible:ring-red-500 dark:focus-visible:ring-red-400'
    },
    success: {
        gradient: 'from-green-500 to-emerald-500',
        bg: 'bg-green-50 dark:bg-green-950/30',
        text: 'text-green-600 dark:text-green-400',
        border: 'border-green-200 dark:border-green-800',
        button: 'counter-button-success',
        buttonText: 'text-green-600 dark:text-green-400',
        ring: 'focus-visible:ring-green-500 dark:focus-visible:ring-green-400'
    },
    warning: {
        gradient: 'from-yellow-500 to-orange-500',
        bg: 'bg-yellow-50 dark:bg-yellow-950/30',
        text: 'text-yellow-600 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800',
        button: 'counter-button-warning',
        buttonText: 'text-yellow-600 dark:text-yellow-400',
        ring: 'focus-visible:ring-yellow-500 dark:focus-visible:ring-yellow-400'
    }
};

export default function Counter({
    label,
    value,
    min,
    max,
    icon: Icon,
    color,
    helperText,
    onChange
}: CounterProps) {
    const [isHovering, setIsHovering] = useState(false);
    const scheme = colorSchemes[color];

    const handleDecrement = () => {
        if (value > min) onChange(value - 1);
    };

    const handleIncrement = () => {
        if (value < max) onChange(value + 1);
    };

    return (
        <div className="space-y-2.5">
            {/* Label */}
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors">
                <Icon className="text-lg" />
                <span>{label}</span>
            </label>

            {/* Counter Card - Más compacto */}
            <div
                className={`
          relative overflow-hidden rounded-xl border-2 ${scheme.border} ${scheme.bg}
          transition-all duration-300 shadow-sm hover:shadow-md
        `}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Gradient decorativo */}
                <motion.div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${scheme.gradient}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovering ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                <div className="px-4 py-2.5">
                    <div className="flex items-center justify-center gap-3">
                        {/* Botón Decrementar - Más pequeño */}
                        <motion.button
                            type="button"
                            onClick={handleDecrement}
                            disabled={value <= min}
                            whileHover={{ scale: value > min ? 1.05 : 1 }}
                            whileTap={{ scale: value > min ? 0.95 : 1 }}
                            className={`
                counter-button-compact
                ${scheme.button}
                ${scheme.buttonText}
                ${scheme.ring}
              `}
                        >
                            <HiMinus className="w-4 h-4" />
                        </motion.button>

                        {/* Display - Más compacto */}
                        <div className="flex-1 flex items-center justify-center">
                            <div className="space-y-1.5 w-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={value}
                                        initial={{ scale: 1.2, opacity: 0, y: -8 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        exit={{ scale: 0.9, opacity: 0, y: 8 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className={`text-3xl font-bold ${scheme.text} leading-none text-center`}
                                    >
                                        {value}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Progress Bar - Más delgada */}
                                <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto max-w-[180px]">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${scheme.gradient}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((value - min) / (max - min)) * 100}%` }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botón Incrementar - Más pequeño */}
                        <motion.button
                            type="button"
                            onClick={handleIncrement}
                            disabled={value >= max}
                            whileHover={{ scale: value < max ? 1.05 : 1 }}
                            whileTap={{ scale: value < max ? 0.95 : 1 }}
                            className={`
                counter-button-compact
                ${scheme.button}
                ${scheme.buttonText}
                ${scheme.ring}
              `}
                        >
                            <HiPlus className="w-4 h-4" />
                        </motion.button>
                    </div>

                    {/* Helper Text */}
                    {helperText && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2 font-medium"
                        >
                            {helperText}
                        </motion.p>
                    )}
                </div>
            </div>
        </div>
    );
}