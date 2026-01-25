import { LuUsers } from 'react-icons/lu';
import { useTranslation } from '../../../i18n/useTranslation';
import { useGameStore } from '../../../store/gameStore';
import Counter from './Counter';
import { GAME_CONFIG } from '../../../config/constants';

export default function PlayerCounter() {
  const { t } = useTranslation();
  const { totalPlayers, setTotalPlayers } = useGameStore();

  return (
    <Counter
      label={t.playerCounter.numberOfPlayers}
      value={totalPlayers}
      min={GAME_CONFIG.MIN_PLAYERS}
      max={GAME_CONFIG.MAX_PLAYERS}
      icon={LuUsers}
      color="warning"
      helperText={`${t.playerCounter.min} ${GAME_CONFIG.MIN_PLAYERS} • ${t.playerCounter.max} ${GAME_CONFIG.MAX_PLAYERS}`}
      onChange={setTotalPlayers}
    />
  );
}
