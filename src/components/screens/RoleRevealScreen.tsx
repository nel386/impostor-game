// src/components/screens/RoleRevealScreen.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import CardReveal from '../ui/CardReveal';
import { useGameStore } from '../../store/gameStore';

export default function RoleRevealScreen() {
  const { 
    language, 
    players, 
    currentRevealIndex, 
    word, 
    hint, 
    showHint,
    nextReveal 
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
                className="text-7xl"
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
                🎴
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
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                    {language === 'es' ? '🔒 Privacidad requerida' : '🔒 Privacy required'}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                    {language === 'es' 
                      ? 'Asegúrate de que nadie más pueda ver la pantalla' 
                      : 'Make sure nobody else can see the screen'
                    }
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
                  className="w-full shadow-xl hover:shadow-2xl transition-all duration-300 text-base font-bold py-4"
                >
                  {language === 'es' ? '👁️ Revelar mi rol' : '👁️ Reveal my role'}
                </Button>
              </motion.div>
              
              <motion.div 
                className="pt-4 border-t border-slate-200 dark:border-slate-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {language === 'es' 
                    ? `Jugador ${currentRevealIndex + 1} de ${players.length}` 
                    : `Player ${currentRevealIndex + 1} of ${players.length}`
                  }
                </p>
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
                  language={language}
                >
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-center space-y-8 max-w-sm w-full px-4">
                      <motion.div 
                        className="text-7xl"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 180, 
                          damping: 12,
                          delay: 0.1 
                        }}
                      >
                        {isImpostor ? '🎭' : '🎯'}
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                          {isImpostor 
                            ? (language === 'es' ? 'Eres el' : 'You are the')
                            : (language === 'es' ? 'Tu palabra' : 'Your word')
                          }
                        </h3>
                        
                        <motion.div 
                          className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white break-words"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 200,
                            delay: 0.4 
                          }}
                        >
                          {isImpostor 
                            ? (language === 'es' ? 'IMPOSTOR' : 'IMPOSTOR')
                            : word?.toUpperCase()
                          }
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
                            <span>{language === 'es' ? 'Pista' : 'Hint'}</span>
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
                    <motion.p 
                      className="text-sm text-slate-400 dark:text-slate-500 text-center font-medium px-4"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      {language === 'es' 
                        ? '🧠 Memoriza tu rol y pasa el dispositivo' 
                        : '🧠 Memorize your role and pass the device'
                      }
                    </motion.p>
                    
                    <Button 
                      size="lg" 
                      onClick={handleNext} 
                      className="w-full shadow-xl hover:shadow-2xl transition-all duration-300 text-base font-bold py-4"
                    >
                      {isLastPlayer 
                        ? (language === 'es' ? '✅ Empezar discusión' : '✅ Start discussion')
                        : (language === 'es' ? '➡️ Siguiente jugador' : '➡️ Next player')
                      }
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
