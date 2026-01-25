import { useGameStore } from '../store/gameStore';
import { translations } from './translations';

export function useTranslation() {
  const { language } = useGameStore();
  
  return {
    t: translations[language],
    language,
  };
}
