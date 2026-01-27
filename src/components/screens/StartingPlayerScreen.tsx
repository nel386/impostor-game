import { motion } from 'framer-motion';
import { LuPlay, LuUser } from 'react-icons/lu';
import { useTranslation } from '../../i18n/useTranslation';
import { useGameStore } from '../../store/gameStore';
import Button from '../ui/Button';

export default function StartingPlayerScreen() {
  const { t } = useTranslation();
  const { players, startingPlayerId, startDiscussion } = useGameStore();

  const startingPlayer = players.find((player) => player.id === startingPlayerId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 space-y-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          className="mx-auto w-20 h-20 rounded-full bg-white/10 flex items-center justify-center"
        >
          <LuUser className="text-4xl text-white/80" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white">
            {startingPlayer?.name ?? t.startingPlayer.fallback}
          </h2>
          <p className="text-sm text-white/70">
            {t.startingPlayer.subtitle}
          </p>
        </div>

        <Button
          size="lg"
          onClick={startDiscussion}
          className="w-full text-base font-bold flex items-center justify-center gap-2"
        >
          <LuPlay />
          {t.startingPlayer.cta}
        </Button>
      </motion.div>
    </div>
  );
} 
