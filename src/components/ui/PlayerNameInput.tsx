import { useGameStore } from '../../store/gameStore';

export default function PlayerNameInput() {
  const { language, totalPlayers, customNames, setCustomName, useCustomNames, toggleCustomNames } = useGameStore();
  
  return (
    <div className="space-y-4">
      {/* Toggle para activar nombres personalizados */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <div className="font-medium text-gray-900">
            {language === 'es' ? 'Nombres personalizados' : 'Custom names'}
          </div>
          <div className="text-sm text-gray-500">
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
            relative w-14 h-8 rounded-full transition-colors
            ${useCustomNames ? 'bg-yellow-500' : 'bg-gray-300'}
          `}
        >
          <span
            className={`
              absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform
              ${useCustomNames ? 'translate-x-6' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
      
      {/* Inputs de nombres */}
      {useCustomNames && (
        <div className="space-y-2 max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-3">
            {language === 'es' 
              ? 'Introduce los nombres (opcional):' 
              : 'Enter names (optional):'
            }
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: totalPlayers }, (_, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                <input
                  type="text"
                  value={customNames[i] || ''}
                  onChange={(e) => setCustomName(i, e.target.value)}
                  placeholder={`${language === 'es' ? 'Jugador' : 'Player'} ${i + 1}`}
                  maxLength={15}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 mt-3">
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
