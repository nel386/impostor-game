import { useGameStore } from '../../store/gameStore';

export default function PlayerCounter() {
  const { totalPlayers, setTotalPlayers, language } = useGameStore();
  
  const handleDecrement = () => {
    if (totalPlayers > 3) setTotalPlayers(totalPlayers - 1);
  };
  
  const handleIncrement = () => {
    if (totalPlayers < 16) setTotalPlayers(totalPlayers + 1);
  };
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {language === 'es' ? 'Número de jugadores' : 'Number of players'}
      </label>
      
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={totalPlayers <= 3}
          className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-xl font-bold"
        >
          −
        </button>
        
        <div className="flex-1 text-center">
          <div className="text-4xl font-bold text-yellow-600">{totalPlayers}</div>
          <div className="text-xs text-gray-500 mt-1">
            {language === 'es' ? 'jugadores' : 'players'}
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleIncrement}
          disabled={totalPlayers >= 16}
          className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-xl font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
}
