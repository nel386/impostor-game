import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LuClock, LuLightbulb, LuMessageCircle, LuSkull, LuUsers, LuVote } from 'react-icons/lu';
import { useGameStore } from '../../store/gameStore';
import type { Player } from '../../types/game';
import Button from '../ui/Button';
import { useTranslation } from '../../i18n/useTranslation';
import { GAME_CONFIG } from '../../config/constants';

export default function DiscussionScreen() {
  const { t } = useTranslation();
  const { players, round, startVoting } = useGameStore();

  const [timeLeft, setTimeLeft] = useState<number>(GAME_CONFIG.DISCUSSION_TIME_SECONDS);

  const alivePlayers = players.filter((p: Player) => p.isAlive);
  const aliveImpostors = alivePlayers.filter((p: Player) => p.role === 'impostor');

  useEffect(() => {
    setTimeLeft(GAME_CONFIG.DISCUSSION_TIME_SECONDS);
  }, [round]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [round]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerPercentage = (timeLeft / GAME_CONFIG.DISCUSSION_TIME_SECONDS) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        
        <motion.div
          className="relative mx-auto w-64 h-64"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="112"
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="16"
              fill="none"
            />
            
            <motion.circle
              cx="128"
              cy="128"
              r="112"
              stroke="url(#gradient)"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 704" }}
              animate={{
                strokeDasharray: `${(timerPercentage / 100) * 704} 704`
              }}
              transition={{ duration: 1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <LuClock className="text-4xl text-blue-400 mb-3" />
            <div className="text-6xl font-black text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <p className="text-sm text-slate-400 mt-2">
              {t.discussion.timeRemaining}
            </p>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 space-y-6 border border-slate-700"
        >
          
          <div className="text-center">
            <h2 className="text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
              <LuMessageCircle />
              {t.discussion.title}
            </h2>
            <p className="text-slate-400">
              {t.common.round} {round}
            </p>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <LuUsers className="text-4xl text-white/80 mb-2 mx-auto" />
              <div className="text-4xl font-black text-white">{alivePlayers.length}</div>
              <div className="text-sm text-blue-200 font-semibold">
                {t.discussion.alive}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <LuSkull className="text-4xl text-white/80 mb-2 mx-auto" />
              <div className="text-4xl font-black text-white">{aliveImpostors.length}</div>
              <div className="text-sm text-red-200 font-semibold">
                {t.discussion.impostors}
              </div>
            </motion.div>
          </div>

          
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              {t.discussion.playersInGame}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {alivePlayers.map((player: Player, index: number) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600"
                >
                  <div className="text-sm font-semibold text-white truncate">
                    {player.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">
            <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <LuLightbulb />
              {t.discussion.rules}
            </h4>
            <ul className="text-sm text-yellow-200/80 space-y-2">
              <li>• {t.discussion.giveClues}</li>
              <li>• {t.discussion.impostorMustBlend}</li>
              <li>• {t.discussion.watchSuspicious}</li>
            </ul>
          </div>

          
          <Button
            size="lg"
            onClick={startVoting}
            className="w-full text-lg font-bold py-5 flex items-center justify-center gap-2"
          >
            <LuVote className="text-xl" />
            {t.discussion.goToVoting}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
