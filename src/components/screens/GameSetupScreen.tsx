import { LuGamepad, LuLightbulb, LuPlay } from 'react-icons/lu';
import { useTranslation } from '../../i18n/useTranslation';
import { useGameStore } from '../../store/gameStore';
import Button from '../ui/Button';
import CategorySelector from '../ui/CategorySelector';
import ImpostorCounter from '../ui/Counter/ImpostorCounter';
import LanguageToggle from '../ui/LanguageToggle';
import PlayerCounter from '../ui/Counter/PlayerCounter';
import PlayerNameInput from '../ui/PlayerNameInput/PlayerNameInput';
import ThemeToggle from '../ui/ThemeToggle';
import './GameSetupScreen.css';

export default function GameSetupScreen() {
  const { t } = useTranslation();
  const { showHint, setShowHint, startGame, selectedCategories } = useGameStore();
  const canStart = selectedCategories.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 flex items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 sm:p-8 space-y-4 sm:space-y-6 max-h-screen overflow-y-auto custom-scrollbar border border-slate-200 dark:border-slate-700">
        {/* Header con ThemeToggle */}
        <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4">
          {/* Spacer invisible (mismo ancho que ThemeToggle) */}
          <div className="w-10 sm:w-12" />

          {/* Header centrado */}
          <div className="text-center space-y-2">
            <LuGamepad className="text-5xl sm:text-6xl text-yellow-500 dark:text-yellow-400 mx-auto" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {t.setup.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
              {t.setup.subtitle}
            </p>
          </div>

          {/* ThemeToggle a la derecha */}
          <ThemeToggle />
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center">
          <LanguageToggle />
        </div>

        {/* Player Counter */}
        <PlayerCounter />

        {/* Impostor Counter */}
        <ImpostorCounter />

        {/* Player Names */}
        <PlayerNameInput />

        {/* Category Selector */}
        <CategorySelector />

        {/* Hint Toggle */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-slate-700 rounded-lg transition-colors">
          <div>
            <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <LuLightbulb className="text-yellow-500 dark:text-yellow-400" />
              {t.setup.hintForImpostor}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t.setup.hintDescription}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className={`
              relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors flex-shrink-0
              ${showHint ? 'bg-yellow-500 dark:bg-yellow-600' : 'bg-gray-300 dark:bg-gray-600'}
            `}
          >
            <span className={`
              absolute top-1 left-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transition-transform
              ${showHint ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}
            `} />
          </button>
        </div>

        {/* Start Button */}
        <Button
          size="lg"
          onClick={startGame}
          disabled={!canStart}
          className="w-full flex items-center justify-center gap-2"
        >
          <LuPlay />
          {t.setup.startGame}
        </Button>

        {!canStart && (
          <p className="text-center text-sm text-red-500 dark:text-red-400">
            {t.setup.selectCategory}
          </p>
        )}
      </div>
    </div>
  );
}
