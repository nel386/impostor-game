import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import {
  LuRotateCcw,
  LuShield,
  LuSkull,
  LuTrophy,
  LuUsers,
  LuVenetianMask
} from 'react-icons/lu';
import { useWindowSize } from 'react-use';
import { useTranslation } from '../../i18n/useTranslation';
import { useGameStore } from '../../store/gameStore';
import type { Player } from '../../types/game';
import Button from '../ui/Button';

export default function EndGameScreen() {
  const { t } = useTranslation();
  const { winner, players, resetGame } = useGameStore();
  const { width, height } = useWindowSize();

  const civils = players.filter((p: Player) => p.role === 'civil');
  const impostors = players.filter((p: Player) => p.role === 'impostor');
  const civilsWon = winner === 'civils';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 ${civilsWon
      ? 'bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600'
      : 'bg-gradient-to-br from-red-600 via-rose-600 to-pink-600'
      }`}>
      {civilsWon && <Confetti width={width} height={height} numberOfPieces={500} recycle={false} />}

      <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
        {/* Winner Announcement */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: civilsWon ? [0, -5, 5, -5, 0] : 0
            }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            {civilsWon ? (
              <LuTrophy className="text-7xl sm:text-8xl md:text-9xl text-yellow-300 mx-auto mb-4 sm:mb-6 drop-shadow-2xl" />
            ) : (
              <LuSkull className="text-7xl sm:text-8xl md:text-9xl text-white/90 mx-auto mb-4 sm:mb-6 drop-shadow-2xl" />
            )}
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 sm:mb-4 drop-shadow-lg px-4">
            {civilsWon ? t.endGame.civilsWin : t.endGame.impostorsWin}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 px-4">
            {civilsWon ? t.endGame.allImpostorsEliminated : t.endGame.impostorsSurvived}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 border border-white/20"
        >
          {/* Player Reveal */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
              <LuVenetianMask className="text-2xl sm:text-3xl" />
              <span className="whitespace-nowrap">
                {t.endGame.roleReveal}
              </span>
            </h3>

            <div className="space-y-2">
              {players.map((player: Player, index: number) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className={`
                    p-3 sm:p-4 rounded-xl border-2 flex items-center justify-between gap-2
                    ${player.role === 'impostor'
                      ? 'bg-red-500/20 border-red-400'
                      : 'bg-green-500/20 border-green-400'
                    }
                    ${!player.isAlive ? 'opacity-50' : ''}
                  `}
                >
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    {player.role === 'impostor' ? (
                      <LuVenetianMask className="text-2xl sm:text-3xl text-red-300 flex-shrink-0" />
                    ) : (
                      <LuShield className="text-2xl sm:text-3xl text-green-300 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-white text-sm sm:text-base md:text-lg truncate">
                        {player.name}
                      </div>
                      <div className="text-xs sm:text-sm text-white/70">
                        {player.role === 'impostor' ? t.endGame.impostor : t.endGame.civil}
                      </div>
                    </div>
                  </div>

                  <div className={`
                    px-2 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap flex-shrink-0
                    ${player.isAlive
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                    }
                  `}>
                    {player.isAlive ? t.endGame.alive : t.endGame.eliminated}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-white/20">
            <div className="text-center">
              <LuUsers className="text-3xl sm:text-4xl text-white/80 mx-auto mb-1 sm:mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-white">{players.length}</div>
              <div className="text-xs sm:text-sm text-white/60">
                {t.endGame.players}
              </div>
            </div>

            <div className="text-center">
              <LuShield className="text-3xl sm:text-4xl text-green-300 mx-auto mb-1 sm:mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-green-300">{civils.length}</div>
              <div className="text-xs sm:text-sm text-white/60">
                {t.endGame.civils}
              </div>
            </div>

            <div className="text-center">
              <LuVenetianMask className="text-3xl sm:text-4xl text-red-300 mx-auto mb-1 sm:mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-red-300">{impostors.length}</div>
              <div className="text-xs sm:text-sm text-white/60">
                {t.endGame.impostors}
              </div>
            </div>
          </div>

          {/* Actions */}
          <Button
            size="lg"
            onClick={resetGame}
            className="w-full text-base sm:text-lg font-bold flex items-center justify-center gap-2 py-3 sm:py-4"
          >
            <LuRotateCcw className="text-lg sm:text-xl" />
            <span className="whitespace-nowrap">
              {t.endGame.playAgain}
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
