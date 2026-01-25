import { LuSkull } from 'react-icons/lu';
import { useTranslation } from '../../../i18n/useTranslation';
import { useGameStore } from '../../../store/gameStore';
import Counter from './Counter';
import { GAME_CONFIG } from '@/config/constants';

export default function ImpostorCounter() {
  const { t } = useTranslation();
  const { totalPlayers, impostorCount, setImpostorCount } = useGameStore();

  const minImpostors = GAME_CONFIG.MIN_IMPOSTORS;
  const maxImpostors = Math.max(1, Math.floor(totalPlayers / 2));

  return (
    <Counter
      label={t.impostorCounter.numberOfImpostors}
      value={impostorCount}
      min={minImpostors}
      max={maxImpostors}
      icon={LuSkull}
      color="danger"
      helperText={`${t.impostorCounter.maximumAllowed}: ${maxImpostors}`}
      onChange={setImpostorCount}
    />
  );
}
