import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import Button from '../ui/Button';

export default function VotingScreen() {
  const { language, players, skipVoting } = useGameStore(); // Eliminado resolveVoting
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [voteMode, setVoteMode] = useState<'digital' | 'physical' | null>(null);
  
  const alivePlayers = players.filter(p => p.isAlive);
  
  const handleDigitalVote = () => {
    if (selectedPlayer !== null) {
      skipVoting(selectedPlayer);
    }
  };
  
  const handlePhysicalVote = () => {
    if (selectedPlayer !== null) {
      skipVoting(selectedPlayer);
    }
  };
  
  if (voteMode === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="text-6xl">🗳️</div>
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'es' ? 'Modo de votación' : 'Voting mode'}
            </h2>
            <p className="text-gray-600">
              {language === 'es' 
                ? '¿Cómo queréis votar?' 
                : 'How do you want to vote?'
              }
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              size="lg"
              onClick={() => setVoteMode('physical')}
              className="w-full"
            >
              {language === 'es' ? '👉 Votación física (señalando)' : '👉 Physical voting (pointing)'}
            </Button>
            
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setVoteMode('digital')}
              className="w-full"
            >
              {language === 'es' ? '📱 Votación digital' : '📱 Digital voting'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-6xl">🗳️</div>
          <h2 className="text-3xl font-bold text-gray-900">
            {language === 'es' ? 'Votación' : 'Voting'}
          </h2>
          <p className="text-gray-600">
            {voteMode === 'physical'
              ? (language === 'es' 
                  ? 'Selecciona al jugador que fue eliminado' 
                  : 'Select the player who was eliminated'
                )
              : (language === 'es' 
                  ? 'Selecciona a quién quieres eliminar' 
                  : 'Select who you want to eliminate'
                )
            }
          </p>
        </div>
        
        {/* Player List */}
        <div className="grid grid-cols-2 gap-3">
          {alivePlayers.map((player) => (
            <button
              key={player.id}
              type="button"
              onClick={() => setSelectedPlayer(player.id)}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${selectedPlayer === player.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="font-medium text-sm">{player.name}</div>
            </button>
          ))}
        </div>
        
        {/* Confirm Button */}
        <Button
          size="lg"
          onClick={voteMode === 'physical' ? handlePhysicalVote : handleDigitalVote}
          disabled={selectedPlayer === null}
          className="w-full"
        >
          {language === 'es' ? '✅ Confirmar eliminación' : '✅ Confirm elimination'}
        </Button>
        
        <button
          type="button"
          onClick={() => setVoteMode(null)}
          className="w-full text-sm text-gray-500 hover:text-gray-700"
        >
          {language === 'es' ? '← Cambiar modo de votación' : '← Change voting mode'}
        </button>
      </div>
    </div>
  );
}
