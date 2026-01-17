import { useGameStore } from '../../store/gameStore';

export default function PlayerNameInput() {
  const { language, totalPlayers, customNames, setCustomName, useCustomNames, toggleCustomNames } = useGameStore();
  
  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base font-medium text-gray-900">
            {language === 'es' ? 'Nombres personalizados' : 'Custom names'}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            {language === 'es' 
              ? 'Asigna nombres a los jugadores' 
              : 'Assign names to players'
            }
          </div>
        </div>
        
        <button
          type="button"
          onClick={toggleCustomNames}
          className={`
            relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors flex-shrink-0
            ${useCustomNames ? 'bg-yellow-500' : 'bg-gray-300'}
          `}
        >
          <span
            className={`
              absolute top-1 left-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transition-transform
              ${useCustomNames ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
      
      {/* Inputs */}
      {useCustomNames && (
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-3">
          <div className="text-xs sm:text-sm font-medium text-gray-700">
            {language === 'es' 
              ? 'Introduce los nombres (opcional):' 
              : 'Enter names (optional):'
            }
          </div>
          
          {/* Scroll container */}
          <div className="max-h-56 sm:max-h-64 overflow-y-auto pr-2 -mr-2 space-y-2.5 sm:space-y-3">
            {Array.from({ length: totalPlayers }, (_, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-medium text-gray-600 w-6 sm:w-7 flex-shrink-0">
                  {i + 1}.
                </span>
                <input
                  type="text"
                  value={customNames[i] || ''}
                  onChange={(e) => setCustomName(i, e.target.value)}
                  placeholder={`${language === 'es' ? 'Jugador' : 'Player'} ${i + 1}`}
                  maxLength={15}
                  className="flex-1 px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                />
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 pt-1">
            {language === 'es' 
              ? 'Deja en blanco para usar nombres por defecto' 
              : 'Leave blank to use default names'
            }
          </p>
        </div>
      )}
    </div>
  );
}
