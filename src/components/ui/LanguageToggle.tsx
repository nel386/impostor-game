import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n/useTranslation';
import { useGameStore } from '../../store/gameStore';

export default function LanguageToggle() {
  const { t } = useTranslation();
  const { language, setLanguage } = useGameStore();

  return (
    <div className="relative inline-flex items-center gap-1 p-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
      <motion.div
        className="absolute h-[calc(100%-6px)] bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-lg shadow-md"
        animate={{
          left: language === 'es' ? '6px' : 'calc(50% + 0px)',
          width: 'calc(50% - 6px)'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />

      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={`
          relative z-10 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2
          ${language === 'es' ? 'text-white' : 'text-gray-600 dark:text-gray-400'}
        `}
      >
        {/* Bandera España SVG */}
        <svg className="w-6 h-4 rounded shadow-sm" viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#c60b1e" />
          <rect width="3" height="0.5" y="0.75" fill="#ffc400" />
        </svg>
        <span className="font-black">{t.languageToggle.spanish}</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`
          relative z-10 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2
          ${language === 'en' ? 'text-white' : 'text-gray-600 dark:text-gray-400'}
        `}
      >
        {/* Bandera UK SVG */}
        <svg className="w-6 h-4 rounded shadow-sm" viewBox="0 0 60 30">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#t)" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          <defs>
            <clipPath id="t">
              <path d="M30,15 h-30 v-15 z v30 h30 z h30 v-15 z v-30 h-30 z" />
            </clipPath>
          </defs>
        </svg>
        <span className="font-black">{t.languageToggle.english}</span>
      </button>
    </div>
  );
}
