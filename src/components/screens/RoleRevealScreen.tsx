import { useState } from 'react';
import Button from '../ui/Button';
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
  
  const [isRevealed, setIsRevealed] = useState(false);
  
  const currentPlayer = players[currentRevealIndex];
  const isLastPlayer = currentRevealIndex === players.length - 1;
  
  const handleReveal = () => {
    setIsRevealed(true);
  };
  
  const handleNext = () => {
    setIsRevealed(false);
    nextReveal();
  };
  
  if (!currentPlayer) return null;
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Instruction Card */}
        {!isRevealed && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
            <div className="text-5xl sm:text-6xl">🎴</div>
            
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {currentPlayer.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {language === 'es' 
                  ? 'Toma el móvil y pulsa el botón' 
                  : 'Take the phone and tap the button'
                }
              </p>
            </div>
            
            <Button size="lg" onClick={handleReveal} className="w-full">
              {language === 'es' ? '👁️ Ver mi carta' : '👁️ See my card'}
            </Button>
            
            <div className="text-xs text-gray-400">
              {language === 'es' 
                ? `Jugador ${currentRevealIndex + 1} de ${players.length}` 
                : `Player ${currentRevealIndex + 1} of ${players.length}`
              }
            </div>
          </div>
        )}
        
        {/* Role Card */}
        {isRevealed && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-center space-y-4 sm:space-y-6 animate-fade-in">
            {currentPlayer.role === 'civil' ? (
              <>
                <div className="text-5xl sm:text-6xl">✅</div>
                
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-600">
                    {language === 'es' ? 'Tu palabra es:' : 'Your word is:'}
                  </h3>
                  <div className="text-3xl sm:text-5xl font-bold text-yellow-600 break-words">
                    {word}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-5xl sm:text-6xl">🎭</div>
                
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-600">
                    {language === 'es' ? 'Eres el' : 'You are the'}
                  </h3>
                  <div className="text-3xl sm:text-5xl font-bold text-red-600">
                    {language === 'es' ? 'IMPOSTOR' : 'IMPOSTOR'}
                  </div>
                </div>
                
                {showHint && hint && (
                  <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">
                      {language === 'es' ? 'Pista:' : 'Hint:'}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700">
                      {hint}
                    </div>
                  </div>
                )}
              </>
            )}
            
            <div className="pt-4 space-y-3">
              <p className="text-xs sm:text-sm text-gray-500">
                {language === 'es' 
                  ? 'Memoriza tu carta y pasa el móvil' 
                  : 'Memorize your card and pass the phone'
                }
              </p>
              
              <Button size="lg" onClick={handleNext} className="w-full">
                {isLastPlayer 
                  ? (language === 'es' ? '✅ Empezar discusión' : '✅ Start discussion')
                  : (language === 'es' ? '➡️ Siguiente jugador' : '➡️ Next player')
                }
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
