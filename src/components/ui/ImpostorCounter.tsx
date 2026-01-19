import { useGameStore } from '../../store/gameStore';

export default function ImpostorCounter() {
  const { totalPlayers, impostorCount, setImpostorCount, language } = useGameStore();
  
  const minImpostors = 1;
  const maxImpostors = Math.max(1, Math.floor(totalPlayers / 2));
  
  const handleDecrement = () => {
    if (impostorCount > minImpostors) {
      setImpostorCount(impostorCount - 1);
    }
  };
  
  const handleIncrement = () => {
    if (impostorCount < maxImpostors) {
      setImpostorCount(impostorCount + 1);
    }
  };
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {language === 'es' ? 'Número de impostores' : 'Number of impostors'}
      </label>
      
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={impostorCount <= minImpostors}
          className="w-12 h-12 rounded-full bg-red-200 hover:bg-red-300 disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold transition-colors"
        >
          −
        </button>
        
        <div className="flex-1 text-center">
          <div className="text-4xl font-bold text-red-600">{impostorCount}</div>
          <div className="text-xs text-gray-500 mt-1">
            {language === 'es' ? 'impostor' : 'impostor'}{impostorCount > 1 ? 'es' : ''}
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleIncrement}
          disabled={impostorCount >= maxImpostors}
          className="w-12 h-12 rounded-full bg-red-200 hover:bg-red-300 disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold transition-colors"
        >
          +
        </button>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        {language === 'es' 
          ? `Máximo permitido: ${maxImpostors} impostor${maxImpostors > 1 ? 'es' : ''}` 
          : `Maximum allowed: ${maxImpostors} impostor${maxImpostors > 1 ? 's' : ''}`
        }
      </p>
    </div>
  );
}
