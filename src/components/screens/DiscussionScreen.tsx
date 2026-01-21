import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaUsers, FaSkull } from 'react-icons/fa';
import Button from '../ui/Button';
import { useGameStore } from '../../store/gameStore';
import type { Player } from '../../types/game';

export default function DiscussionScreen() {
  const { language, players, round, startVoting } = useGameStore();
  
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos
  
  const alivePlayers = players.filter((p: Player) => p.isAlive);
  const aliveImpostors = alivePlayers.filter((p: Player) => p.role === 'impostor');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerPercentage = (timeLeft / 180) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Timer Circular */}
        <motion.div 
          className="relative mx-auto w-64 h-64"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* Círculo de fondo */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="112"
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="16"
              fill="none"
            />
            {/* Círculo de progreso */}
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
          
          {/* Contenido central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <FaClock className="text-4xl text-blue-400 mb-3" />
            <div className="text-6xl font-black text-white">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <p className="text-sm text-slate-400 mt-2">
              {language === 'es' ? 'Tiempo restante' : 'Time remaining'}
            </p>
          </div>
        </motion.div>
        
        {/* Card principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 space-y-6 border border-slate-700"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-black text-white mb-2">
              {language === 'es' ? '💬 Discusión' : '💬 Discussion'}
            </h2>
            <p className="text-slate-400">
              {language === 'es' ? 'Ronda' : 'Round'} {round}
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <FaUsers className="text-4xl text-white/80 mb-2 mx-auto" />
              <div className="text-4xl font-black text-white">{alivePlayers.length}</div>
              <div className="text-sm text-blue-200 font-semibold">
                {language === 'es' ? 'Vivos' : 'Alive'}
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <FaSkull className="text-4xl text-white/80 mb-2 mx-auto" />
              <div className="text-4xl font-black text-white">{aliveImpostors.length}</div>
              <div className="text-sm text-red-200 font-semibold">
                {language === 'es' ? 'Impostores' : 'Impostors'}
              </div>
            </motion.div>
          </div>
          
          {/* Players List */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              {language === 'es' ? 'Jugadores en juego' : 'Players in game'}
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
          
          {/* Rules */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">
            <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
              <span>💡</span>
              {language === 'es' ? 'Reglas' : 'Rules'}
            </h4>
            <ul className="text-sm text-yellow-200/80 space-y-2">
              <li>• {language === 'es' ? 'Dad pistas sin decir la palabra' : 'Give clues without saying the word'}</li>
              <li>• {language === 'es' ? 'El impostor debe disimular' : 'The impostor must blend in'}</li>
              <li>• {language === 'es' ? 'Observad comportamientos sospechosos' : 'Watch for suspicious behavior'}</li>
            </ul>
          </div>
          
          {/* Voting Button */}
          <Button 
            size="lg" 
            onClick={startVoting} 
            className="w-full text-lg font-bold py-5"
          >
            🗳️ {language === 'es' ? 'Ir a votación' : 'Go to voting'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
