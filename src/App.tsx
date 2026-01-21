import { AnimatePresence, motion } from 'framer-motion';
import GameLayout from './components/layout/GameLayout';
import DiscussionScreen from './components/screens/DiscussionScreen';
import EndGameScreen from './components/screens/EndGameScreen';
import GameSetupScreen from './components/screens/GameSetupScreen';
import ResolutionScreen from './components/screens/ResolutionScreen';
import RoleRevealScreen from './components/screens/RoleRevealScreen';
import VotingScreen from './components/screens/VotingScreen';
import { useGameStore } from './store/gameStore';

export default function App() {
  const { gameStatus } = useGameStore();


  return (
    <GameLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={gameStatus}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {gameStatus === 'setup' && <GameSetupScreen />}
          {gameStatus === 'reveal' && <RoleRevealScreen />}
          {gameStatus === 'discussion' && <DiscussionScreen />}
          {gameStatus === 'voting' && <VotingScreen />}
          {gameStatus === 'resolution' && <ResolutionScreen />}
          {gameStatus === 'ended' && <EndGameScreen />}
        </motion.div>
      </AnimatePresence>
    </GameLayout>
  );
}