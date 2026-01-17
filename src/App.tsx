import GameLayout from './components/layout/GameLayout';
import GameSetupScreen from './components/screens/GameSetupScreen';
import RoleRevealScreen from './components/screens/RoleRevealScreen';
import DiscussionScreen from './components/screens/DiscussionScreen';
import VotingScreen from './components/screens/VotingScreen';
import ResolutionScreen from './components/screens/ResolutionScreen';
import EndGameScreen from './components/screens/EndGameScreen';
import { useGameStore } from './store/gameStore';

export default function App() {
  const { gameStatus } = useGameStore();
  
  return (
    <GameLayout>
      {gameStatus === 'setup' && <GameSetupScreen />}
      {gameStatus === 'reveal' && <RoleRevealScreen />}
      {gameStatus === 'discussion' && <DiscussionScreen />}
      {gameStatus === 'voting' && <VotingScreen />}
      {gameStatus === 'resolution' && <ResolutionScreen />}
      {gameStatus === 'ended' && <EndGameScreen />}
    </GameLayout>
  );
}
