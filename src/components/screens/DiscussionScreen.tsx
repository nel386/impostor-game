import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { useGameStore } from '../../store/gameStore';

export default function DiscussionScreen() {
  const { language, players, round, startVoting } = useGameStore();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos
  
  const alivePlayers = players.filter(p => p.isAlive);
  const aliveImpostors = alivePlayers.filter(p => p.role === 'impostor');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-6xl">💬</div>
          <h2 className="text-3xl font-bold text-gray-900">
            {language === 'es' ? 'Fase de discusión' : 'Discussion phase'}
          </h2>
          <p className="text-gray-600">
            {language === 'es' 
              ? 'Hablad y encontrad al impostor' 
              : 'Talk and find the impostor'
            }
          </p>
        </div>
        
        {/* Timer */}
        <div className="bg-gray-100 rounded-lg p-6 text-center">
          <div className="text-sm text-gray-500 mb-2">
            {language === 'es' ? 'Tiempo restante:' : 'Time remaining:'}
          </div>
          <div className="text-5xl font-bold text-blue-600">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
        
        {/* Game Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">{alivePlayers.length}</div>
            <div className="text-sm text-gray-600">
              {language === 'es' ? 'Jugadores vivos' : 'Alive players'}
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-600">{aliveImpostors.length}</div>
            <div className="text-sm text-gray-600">
              {language === 'es' ? 'Impostores vivos' : 'Alive impostors'}
            </div>
          </div>
        </div>
        
        {/* Rules */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 space-y-2">
          <div className="font-medium text-yellow-900">
            {language === 'es' ? '📋 Reglas:' : '📋 Rules:'}
          </div>
          <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
            <li>
              {language === 'es' 
                ? 'Dad pistas sobre vuestra palabra sin decirla' 
                : 'Give clues about your word without saying it'
              }
            </li>
            <li>
              {language === 'es' 
                ? 'El impostor debe disimular y parecer creíble' 
                : 'The impostor must blend in and seem credible'
              }
            </li>
            <li>
              {language === 'es' 
                ? 'Observad quién parece sospechoso' 
                : 'Watch who seems suspicious'
              }
            </li>
          </ul>
        </div>
        
        {/* Round Info */}
        <div className="text-center text-sm text-gray-500">
          {language === 'es' ? `Ronda ${round}` : `Round ${round}`}
        </div>
        
        {/* Voting Button */}
        <Button size="lg" onClick={startVoting} className="w-full">
          {language === 'es' ? '🗳️ Ir a votación' : '🗳️ Go to voting'}
        </Button>
      </div>
    </div>
  );
}
