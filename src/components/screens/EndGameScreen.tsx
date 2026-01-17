import Button from '../ui/Button';
import { useGameStore } from '../../store/gameStore';

export default function EndGameScreen() {
  const { language, winner, players, resetGame } = useGameStore();
  
  const civils = players.filter(p => p.role === 'civil');
  const impostors = players.filter(p => p.role === 'impostor');
  // Eliminada la variable alivePlayers que no se usaba
  
  const civilsWon = winner === 'civils';
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${
      civilsWon 
        ? 'bg-gradient-to-br from-green-400 to-blue-500' 
        : 'bg-gradient-to-br from-red-500 to-purple-600'
    }`}>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Winner Announcement */}
        <div className="text-center space-y-4">
          <div className="text-9xl animate-bounce-in">
            {civilsWon ? '🎉' : '🎭'}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900">
            {civilsWon
              ? (language === 'es' ? '¡Los civiles ganan!' : 'Civils win!')
              : (language === 'es' ? '¡Los impostores ganan!' : 'Impostors win!')
            }
          </h1>
          
          <p className="text-lg text-gray-600">
            {civilsWon
              ? (language === 'es' 
                  ? 'Habéis encontrado a todos los impostores' 
                  : 'You found all the impostors'
                )
              : (language === 'es' 
                  ? 'Los impostores han sobrevivido' 
                  : 'The impostors survived'
                )
            }
          </p>
        </div>
        
        {/* Player Reveal */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            {language === 'es' ? '🃏 Revelación de roles' : '🃏 Role reveal'}
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {players.map((player) => (
              <div
                key={player.id}
                className={`p-4 rounded-lg border-2 flex items-center justify-between ${
                  player.role === 'impostor'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-green-50 border-green-300'
                } ${!player.isAlive ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {player.role === 'impostor' ? '🎭' : '✅'}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {player.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {player.role === 'impostor'
                        ? (language === 'es' ? 'Impostor' : 'Impostor')
                        : (language === 'es' ? 'Civil' : 'Civil')
                      }
                    </div>
                  </div>
                </div>
                
                <div className="text-sm font-medium">
                  {player.isAlive
                    ? (language === 'es' ? '✅ Vivo' : '✅ Alive')
                    : (language === 'es' ? '💀 Eliminado' : '💀 Eliminated')
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-gray-900">{players.length}</div>
            <div className="text-xs text-gray-600">
              {language === 'es' ? 'Jugadores' : 'Players'}
            </div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">{civils.length}</div>
            <div className="text-xs text-gray-600">
              {language === 'es' ? 'Civiles' : 'Civils'}
            </div>
          </div>
          
          <div className="bg-red-100 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-600">{impostors.length}</div>
            <div className="text-xs text-gray-600">
              {language === 'es' ? 'Impostores' : 'Impostors'}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="space-y-3">
          <Button size="lg" onClick={resetGame} className="w-full">
            {language === 'es' ? '🔄 Jugar de nuevo' : '🔄 Play again'}
          </Button>
        </div>
      </div>
    </div>
  );
}
