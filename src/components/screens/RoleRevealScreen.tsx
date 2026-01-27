import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  LuArrowRight,
  LuBrain,
  LuBriefcase,
  LuCheck,
  LuCircleUser,
  LuEye,
  LuFilm,
  LuGoal,
  LuLock,
  LuMapPin,
  LuPackage,
  LuPawPrint,
  LuTarget,
  LuTrophy,
  LuUsers,
  LuUtensils,
  LuVenetianMask,
} from 'react-icons/lu';

import { useTranslation } from '../../i18n/useTranslation';
import { useGameStore } from '../../store/gameStore';
import Button from '../ui/Button';
import CardReveal from '../ui/CardReveal';

export default function RoleRevealScreen() {
  const { t } = useTranslation();
  const {
    players,
    currentRevealIndex,
    word,
    hint,
    showHint,
    nextReveal,
    category,
    startingPlayerId
  } = useGameStore();

  const [showCard, setShowCard] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);

  const currentPlayer = players[currentRevealIndex];
  const isLastPlayer = currentRevealIndex === players.length - 1;

  const handleStartReveal = () => {
    setShowCard(true);
    setCardRevealed(false);
  };

  const handleCardRevealed = () => {
    setCardRevealed(true);
  };

  const handleNext = () => {
    setShowCard(false);
    setCardRevealed(false);
    nextReveal();
  };

  if (!currentPlayer) return null;

  const isImpostor = currentPlayer.role === 'impostor';

  const getRoleIcon = () => {
    if (isImpostor) {
      return <LuVenetianMask className="w-32 h-32" />;
    }

    const categoryIcons: Record<string, JSX.Element> = {
      'animals': <LuPawPrint className="w-32 h-32" />,
      'places': <LuMapPin className="w-32 h-32" />,
      'professions': <LuBriefcase className="w-32 h-32" />,
      'movies': <LuFilm className="w-32 h-32" />,
      'food': <LuUtensils className="w-32 h-32" />,
      'sports': <LuTrophy className="w-32 h-32" />,
      'objects': <LuPackage className="w-32 h-32" />,
      'football': <LuGoal className="w-32 h-32" />,
    };

    return categoryIcons[category] || <LuTarget className="w-32 h-32" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-black dark:via-slate-950 dark:to-black flex items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6">
        <AnimatePresence mode="wait">
          {!showCard && (
            <motion.div
              key="instruction"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-3xl shadow-2xl p-10 text-center space-y-7 border border-slate-200 dark:border-slate-600"
            >
              <motion.div
                className="inline-flex items-center justify-center"
                animate={{
                  rotate: [0, -8, 8, -8, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: "easeOut"
                }}
              >
                <LuCircleUser className="w-24 h-24 text-purple-500 dark:text-purple-400 drop-shadow-lg" />
              </motion.div>

              <div className="space-y-4">
                <motion.h2
                  className="text-3xl font-black text-slate-900 dark:text-white tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentPlayer.name}
                </motion.h2>

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-full">
                    <LuLock className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-bold text-red-700 dark:text-red-300">
                      {t.roleReveal.privacyRequired}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                    {t.roleReveal.makeSureNobody}
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  size="lg"
                  onClick={handleStartReveal}
                  className="w-full shadow-xl hover:shadow-2xl transition-all duration-300 text-base font-bold py-4 flex items-center justify-center gap-2"
                >
                  <LuEye className="w-5 h-5" />
                  {t.roleReveal.revealMyRole}
                </Button>
              </motion.div>

              <motion.div
                className="pt-4 border-t border-slate-200 dark:border-slate-600 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  <LuUsers className="w-4 h-4" />
                  <span>
                    {t.roleReveal.player} {currentRevealIndex + 1} {t.roleReveal.of} {players.length}
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentRevealIndex + 1) / players.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}

          {showCard && (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-6"
            >
              <div className="h-[550px] sm:h-[600px]">
                <CardReveal
                  onFullyRevealed={handleCardRevealed}
                >
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-center space-y-8 max-w-sm w-full px-4">
                      
                      <motion.div
                        className="flex items-center justify-center text-slate-700 dark:text-slate-300"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 12,
                          delay: 0.1
                        }}
                      >
                        {getRoleIcon()}
                      </motion.div>

                      
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                          {isImpostor ? t.roleReveal.youAreThe : t.roleReveal.yourWord}
                        </h3>

                      <motion.div
                        className={`text-4xl sm:text-5xl font-extrabold tracking-tight break-words ${
                          isImpostor
                            ? 'text-indigo-700 dark:text-fuchsia-300'
                            : 'text-sky-700 dark:text-cyan-300'
                        }`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                            stiffness: 200,
                            delay: 0.4
                          }}
                        >
                          {isImpostor ? t.roleReveal.impostor : word?.toUpperCase()}
                        </motion.div>
                      </motion.div>

                      
                      {isImpostor && showHint && hint && (
                        <motion.div
                          className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-5 rounded-2xl shadow-inner border border-slate-300 dark:border-slate-600"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <div className="text-xs text-slate-600 dark:text-slate-300 font-bold mb-2 uppercase tracking-wider flex items-center justify-center gap-1.5">
                            <span>💡</span>
                            <span>{t.roleReveal.hint}</span>
                          </div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                            {hint}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardReveal>
              </div>

              
              <AnimatePresence>
                {cardRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="space-y-4"
                  >
                    <motion.div
                      className="flex items-center justify-center gap-2 text-sm text-slate-400 dark:text-slate-500 text-center font-medium px-4"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <LuBrain className="w-5 h-5" />
                      <span>{t.roleReveal.memorizeRole}</span>
                    </motion.div>

                    <Button
                      size="lg"
                      onClick={handleNext}
                      className="w-full shadow-xl hover:shadow-2xl transition-all duration-300 text-base font-bold py-4 flex items-center justify-center gap-2"
                    >
                      {isLastPlayer ? (
                        <>
                          <LuCheck className="w-5 h-5" />
                          {t.roleReveal.goToStarting}
                        </>
                      ) : (
                        <>
                          <LuArrowRight className="w-5 h-5" />
                          {t.roleReveal.nextPlayer}
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
