import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaForward, FaUserSecret, FaVoteYea } from 'react-icons/fa';
import { LuClipboardList } from 'react-icons/lu';
import { useTranslation } from '../../i18n/useTranslation';
import { useGameStore } from '../../store/gameStore';
import type { Player } from '../../types/game';
import Button from '../ui/Button';

export default function VotingScreen() {
  const { t } = useTranslation();
  const { players, castVote, resolveVoting, skipVoting } = useGameStore();
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);

  const alivePlayers = players.filter((p: Player) => p.isAlive);
  const currentVoter = alivePlayers[currentVoterIndex];

  const handleVote = () => {
    if (!currentVoter || selectedPlayer === null) return;

    castVote(currentVoter.id, selectedPlayer);
    setConfirmed(true);

    const isLastVoter = currentVoterIndex >= alivePlayers.length - 1;
    setTimeout(() => {
      setConfirmed(false);
      setSelectedPlayer(null);

      if (isLastVoter) {
        resolveVoting();
      } else {
        setCurrentVoterIndex((prev) => prev + 1);
      }
    }, 700);
  };

  const handleSkipVoting = () => {
    if (currentVoterIndex > 0) return;
    setSelectedPlayer(null);
    setShowSkipConfirm(true);
  };

  const confirmSkip = () => {
    if (selectedPlayer !== null) {
      skipVoting(selectedPlayer);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <FaVoteYea className="text-7xl text-purple-300 mx-auto mb-4" />
          <h2 className="text-4xl font-black text-white mb-2">
            {t.voting.title}
          </h2>
          <p className="text-purple-200">
            {showSkipConfirm ? t.voting.whoWasEliminated : t.voting.eachPlayerVotes}
          </p>
          {!showSkipConfirm && currentVoter && (
            <p className="text-sm text-purple-100 mt-2">
              {t.voting.currentVoter} <span className="font-bold">{currentVoter.name}</span>
            </p>
          )}
        </motion.div>

        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {alivePlayers.map((player: Player, index: number) => (
              <motion.button
                key={player.id}
                type="button"
                onClick={() => !confirmed && setSelectedPlayer(player.id)}
                disabled={confirmed}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!confirmed ? { scale: 1.05, y: -5 } : {}}
                whileTap={!confirmed ? { scale: 0.95 } : {}}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-300
                  ${selectedPlayer === player.id
                    ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/50'
                    : 'border-slate-700 bg-slate-800/50 hover:border-purple-400/50'
                  }
                  ${confirmed ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <AnimatePresence>
                  {selectedPlayer === player.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-2 right-2"
                    >
                      <FaCheckCircle className="text-2xl text-purple-400" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-5xl mb-3">
                  <FaUserSecret className="mx-auto text-slate-400" />
                </div>
                <div className="font-bold text-white text-lg truncate">
                  {player.name}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        
        <AnimatePresence>
          {confirmed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <FaCheckCircle className="text-9xl text-green-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-3xl font-black text-white">
                  {t.voting.voteConfirmed}
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        
        <div className="space-y-3">
          {!showSkipConfirm ? (
            <>
              
              <Button
                size="lg"
                onClick={handleVote}
                disabled={selectedPlayer === null || confirmed}
                className="w-full text-lg font-bold flex items-center justify-center gap-2"
              >
                <FaCheckCircle />
                <span className="whitespace-nowrap">
                  {t.voting.confirmVote}
                </span>
              </Button>

              
              {!confirmed && currentVoterIndex === 0 && (
                <button
                  type="button"
                  onClick={handleSkipVoting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all text-sm font-semibold border border-slate-600"
                >
                  <FaForward />
                  {t.voting.votedPhysically}
                </button>
              )}
            </>
          ) : (
            <>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 mb-4">
                <p className="text-yellow-200 text-sm text-center flex items-center justify-center gap-2">
                  <LuClipboardList className="text-lg" />
                  {t.voting.selectWhoEliminated}
                </p>
              </div>

              <Button
                size="lg"
                onClick={confirmSkip}
                disabled={selectedPlayer === null}
                className="w-full text-lg font-bold flex items-center justify-center gap-2"
              >
                <FaCheckCircle />
                <span className="whitespace-nowrap">
                  {t.voting.confirmEliminated}
                </span>
              </Button>

              <button
                type="button"
                onClick={() => setShowSkipConfirm(false)}
                className="w-full text-sm text-purple-300 hover:text-white transition-colors"
              >
                {t.voting.backToDigitalVoting}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
