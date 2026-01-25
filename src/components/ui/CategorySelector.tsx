import { LuCheck } from 'react-icons/lu';
import { CATEGORIES } from '../../data/words';
import { useTranslation } from '../../i18n/useTranslation';
import { useGameStore } from '../../store/gameStore';

export default function CategorySelector() {
  const { t, language } = useTranslation();
  const { selectedCategories, toggleCategory } = useGameStore();

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t.categorySelector.categories}
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          const IconComponent = category.icon;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={`
                flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg border-2 transition-all
                ${isSelected
                  ? 'border-yellow-500 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-900/30'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-700 hover:border-gray-300 dark:hover:border-gray-500'
                }
              `}
            >
              <IconComponent className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200" />
              <span className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white">
                {category.label[language]}
              </span>

              {isSelected && (
                <LuCheck className="ml-auto text-yellow-500 dark:text-yellow-400 text-sm sm:text-base" />
              )}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {selectedCategories.length} {t.categorySelector.categoriesSelected}
      </p>
    </div>
  );
}
