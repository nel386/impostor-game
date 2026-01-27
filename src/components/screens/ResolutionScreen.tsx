import { LuArrowRight, LuCircleCheck, LuCircleX } from 'react-icons/lu';
import { useTranslation } from '../../i18n/useTranslation';
import { useGameStore } from '../../store/gameStore';
import Button from '../ui/Button';
import { checkVictory } from '../../utils/gameLogic';

export default function ResolutionScreen() {
  const { t } = useTranslation();
  const {
    players,
    lastEliminatedPlayer,
    lastEliminatedWasImpostor,
    continueGame
  } = useGameStore();

  const alivePlayers = players.filter(p => p.isAlive);
  const aliveImpostors = alivePlayers.filter(p => p.role === 'impostor');
  const willGameEnd = checkVictory(alivePlayers.length, aliveImpostors.length) !== null;

  if (!lastEliminatedPlayer) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-slate-950 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-6 animate-scale-in border border-slate-200 dark:border-slate-700">
        
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce-in flex justify-center">
            {lastEliminatedWasImpostor ? (
              <LuCircleCheck className="text-green-500" />
            ) : (
              <LuCircleX className="text-red-500" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {lastEliminatedPlayer.name}
          </h2>
          <div className={`
            text-xl font-semibold
            ${lastEliminatedWasImpostor ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
          `}>
            {lastEliminatedWasImpostor ? t.resolution.wasImpostor : t.resolution.wasInnocent}
          </div>
        </div>

        
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
                t.resolution.foundTheImpostor
              ) : (
                `${t.resolution.foundAnImpostor} ${aliveImpostors.length} ${aliveImpostors.length > 1 ? t.resolution.impostorPlural : t.resolution.impostorSingular
                } ${aliveImpostors.length > 1 ? t.resolution.alivePlural : t.resolution.aliveSingular}.`
              )
            ) : (
              alivePlayers.length <= 4 ? (
                t.resolution.innocentImpostorsWin
              ) : (
                `${t.resolution.innocentGameContinues} ${alivePlayers.length} ${t.resolution.playersAlive}`
              )
            )}
          </p>
        </div>

        
        {!willGameEnd && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {alivePlayers.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {t.resolution.alivePlayers}
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {aliveImpostors.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {t.resolution.aliveImpostors}
              </div>
            </div>
          </div>
        )}

        
        <Button
          size="lg"
          onClick={continueGame}
          className="w-full flex items-center justify-center gap-2"
        >
          <LuArrowRight />
          {willGameEnd ? t.resolution.seeFinalResult : t.resolution.continueGame}
        </Button>
      </div>
    </div>
  );
}
