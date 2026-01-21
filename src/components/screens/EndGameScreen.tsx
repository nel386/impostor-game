import { motion } from 'framer-motion';
import { FaTrophy, FaSkull, FaUsers, FaMask } from 'react-icons/fa';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Button from '../ui/Button';
import { useGameStore } from '../../store/gameStore';
import type { Player } from '../../types/game';

export default function EndGameScreen() {
  const { language, winner, players, resetGame } = useGameStore();
  const { width, height } = useWindowSize();
  
  const civils = players.filter((p: Player) => p.role === 'civil');
  const impostors = players.filter((p: Player) => p.role === 'impostor');
  const civilsWon = winner === 'civils';
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${
      civilsWon 
        ? 'bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600' 
        : 'bg-gradient-to-br from-red-600 via-rose-600 to-pink-600'
    }`}>
      {/* Confetti si ganan los civiles */}
      {civilsWon && <Confetti width={width} height={height} numberOfPieces={500} recycle={false} />}
      
      <div className="w-full max-w-3xl space-y-8">
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
              <FaTrophy className="text-9xl text-yellow-300 mx-auto mb-6 drop-shadow-2xl" />
            ) : (
              <FaSkull className="text-9xl text-white/90 mx-auto mb-6 drop-shadow-2xl" />
            )}
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
            {civilsWon 
              ? (language === 'es' ? '¡Civiles Ganan!' : 'Civils Win!')
              : (language === 'es' ? '¡Impostores Ganan!' : 'Impostors Win!')
            }
          </h1>
          <p className="text-xl text-white/80">
            {civilsWon 
              ? (language === 'es' ? 'Todos los impostores fueron eliminados' : 'All impostors were eliminated')
              : (language === 'es' ? 'Los impostores sobrevivieron' : 'The impostors survived')
            }
          </p>
        </motion.div>
        
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/20"
        >
          {/* Player Reveal */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FaMask />
              {language === 'es' ? 'Revelación de roles' : 'Role reveal'}
            </h3>
            
            <div className="space-y-2">
              {players.map((player: Player, index: number) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className={`
                    p-4 rounded-xl border-2 flex items-center justify-between
                    ${player.role === 'impostor' 
                      ? 'bg-red-500/20 border-red-400' 
                      : 'bg-green-500/20 border-green-400'
                    }
                    ${!player.isAlive ? 'opacity-50' : ''}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">
                      {player.role === 'impostor' ? '🎭' : '👤'}
                    </span>
                    <div>
                      <div className="font-bold text-white text-lg">{player.name}</div>
                      <div className="text-sm text-white/70">
                        {player.role === 'impostor' 
                          ? (language === 'es' ? 'Impostor' : 'Impostor')
                          : (language === 'es' ? 'Civil' : 'Civil')
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className={`
                    px-4 py-2 rounded-full font-semibold text-sm
                    ${player.isAlive 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                    }
                  `}>
                    {player.isAlive 
                      ? (language === 'es' ? '✓ Vivo' : '✓ Alive')
                      : (language === 'es' ? '✗ Eliminado' : '✗ Eliminated')
                    }
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
            <div className="text-center">
              <FaUsers className="text-4xl text-white/80 mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{players.length}</div>
              <div className="text-sm text-white/60">
                {language === 'es' ? 'Jugadores' : 'Players'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">👤</div>
              <div className="text-3xl font-black text-green-300">{civils.length}</div>
              <div className="text-sm text-white/60">
                {language === 'es' ? 'Civiles' : 'Civils'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-2">🎭</div>
              <div className="text-3xl font-black text-red-300">{impostors.length}</div>
              <div className="text-sm text-white/60">
                {language === 'es' ? 'Impostores' : 'Impostors'}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <Button 
            size="lg" 
            onClick={resetGame} 
            className="w-full text-lg font-bold"
          >
            🔄 {language === 'es' ? 'Jugar de nuevo' : 'Play again'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
