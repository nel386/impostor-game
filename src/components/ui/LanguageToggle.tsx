import { useGameStore } from '../../store/gameStore';

export default function LanguageToggle() {
  const { language, setLanguage } = useGameStore();
  
  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all
          ${language === 'es' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        🇪🇸 Español
      </button>
      
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all
          ${language === 'en' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        🇬🇧 English
      </button>
    </div>
  );
}
