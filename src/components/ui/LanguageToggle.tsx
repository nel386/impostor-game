// src/components/ui/LanguageToggle.tsx
import { useGameStore } from '../../store/gameStore';

export default function LanguageToggle() {
  const { language, setLanguage } = useGameStore();

  return (
    <div className="flex gap-2 p-1 bg-gray-100 dark:bg-slate-700 rounded-lg transition-colors">
      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all
          ${language === 'es' 
            ? 'bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }
        `}
      >
        Español
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all
          ${language === 'en' 
            ? 'bg-white dark:bg-slate-900 text-gray-900 dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }
        `}
      >
        English
      </button>
    </div>
  );
}
