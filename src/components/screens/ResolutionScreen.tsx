// src/components/screens/ResolutionScreen.tsx
import Button from '../ui/Button';
import { useGameStore } from '../../store/gameStore';

export default function ResolutionScreen() {
  const { 
    language, 
    players, 
    lastEliminatedPlayer, 
    lastEliminatedWasImpostor, 
    continueGame 
  } = useGameStore();
  
  const alivePlayers = players.filter(p => p.isAlive);
  const aliveImpostors = alivePlayers.filter(p => p.role === 'impostor');
  const willGameEnd = aliveImpostors.length === 0 || (alivePlayers.length <= 4 && aliveImpostors.length > 0);
  
  if (!lastEliminatedPlayer) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-slate-950 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-6 animate-scale-in border border-slate-200 dark:border-slate-700">
        {/* Result Icon */}
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce-in">
            {lastEliminatedWasImpostor ? '✅' : '❌'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {lastEliminatedPlayer.name}
          </h2>
          <div className={`
            text-xl font-semibold
            ${lastEliminatedWasImpostor ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
          `}>
            {lastEliminatedWasImpostor 
              ? (language === 'es' ? 'ERA IMPOSTOR' : 'WAS IMPOSTOR')
              : (language === 'es' ? 'ERA INOCENTE' : 'WAS INNOCENT')
            }
          </div>
        </div>

        {/* Message */}
        <div className={`
          p-4 rounded-lg
          ${lastEliminatedWasImpostor 
            ? 'bg-green-50 dark:bg-green-900/20' 
            : 'bg-red-50 dark:bg-red-900/20'
          }
        `}>
          <p className="text-center font-medium text-gray-900 dark:text-gray-100">
            {lastEliminatedWasImpostor ? (
              aliveImpostors.length === 0 ? (
                language === 'es' ? '¡Habéis encontrado al impostor!' : 'You found the impostor!'
              ) : (
                language === 'es' 
                  ? `¡Habéis encontrado a un impostor! ${aliveImpostors.length} impostor${aliveImpostors.length > 1 ? 'es' : ''} vivo${aliveImpostors.length > 1 ? 's' : ''}.`
                  : `You found an impostor! ${aliveImpostors.length} impostor${aliveImpostors.length > 1 ? 's' : ''} remaining.`
              )
            ) : (
              alivePlayers.length <= 4 ? (
                language === 'es' ? 'Era inocente... ¡impostores ganan!' : 'Was innocent... impostors win!'
              ) : (
                language === 'es' 
                  ? `Era inocente... juego continúa. ${alivePlayers.length} jugadores vivos.`
                  : `Was innocent... game continues. ${alivePlayers.length} players alive.`
              )
            )}
          </p>
        </div>

        {/* Stats */}
        {!willGameEnd && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {alivePlayers.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {language === 'es' ? 'Jugadores vivos' : 'Alive players'}
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {aliveImpostors.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {language === 'es' ? 'Impostores vivos' : 'Alive impostors'}
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <Button 
          size="lg" 
          onClick={continueGame} 
          className="w-full"
        >
          {willGameEnd 
            ? (language === 'es' ? 'Ver resultado final' : 'See final result')
            : (language === 'es' ? 'Continuar partida' : 'Continue game')
          }
        </Button>
      </div>
    </div>
  );
}
