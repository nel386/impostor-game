import { useGameStore } from '../../store/gameStore';
import Button from '../ui/Button';
import CategorySelector from '../ui/CategorySelector';
import LanguageToggle from '../ui/LanguageToggle';
import PlayerCounter from '../ui/PlayerCounter';
import PlayerNameInput from '../ui/PlayerNameInput';

export default function GameSetupScreen() {
  const { language, showHint, setShowHint, startGame, selectedCategories } = useGameStore();
  
  const canStart = selectedCategories.length > 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-4 sm:p-8 space-y-4 sm:space-y-6 max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            🎭 {language === 'es' ? 'Juego del Impostor' : 'Impostor Game'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {language === 'es' 
              ? 'Configura tu partida y encuentra al impostor' 
              : 'Set up your game and find the impostor'
            }
          </p>
        </div>
        
        {/* Language Toggle */}
        <div className="flex justify-center">
          <LanguageToggle />
        </div>
        
        {/* Player Counter */}
        <PlayerCounter />
        
        {/* Player Names */}
        <PlayerNameInput />
        
        {/* Category Selector */}
        <CategorySelector />
        
        {/* Hint Toggle */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="text-sm sm:text-base font-medium text-gray-900">
              {language === 'es' ? 'Pista para impostor' : 'Hint for impostor'}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {language === 'es' 
                ? 'El impostor verá una pista sobre la categoría' 
                : 'Impostor will see a hint about the category'
              }
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className={`
              relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors flex-shrink-0
              ${showHint ? 'bg-yellow-500' : 'bg-gray-300'}
            `}
          >
            <span
              className={`
                absolute top-1 left-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transition-transform
                ${showHint ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}
              `}
            />
          </button>
        </div>
        
        {/* Start Button */}
        <Button
          size="lg"
          onClick={startGame}
          disabled={!canStart}
          className="w-full"
        >
          {language === 'es' ? '🚀 Empezar partida' : '🚀 Start game'}
        </Button>
        
        {!canStart && (
          <p className="text-center text-sm text-red-500">
            {language === 'es' 
              ? 'Selecciona al menos una categoría' 
              : 'Select at least one category'
            }
          </p>
        )}
      </div>
    </div>
  );
}
