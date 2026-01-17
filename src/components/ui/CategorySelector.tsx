import { useGameStore } from '../../store/gameStore';
import { CATEGORIES } from '../../data/words';

export default function CategorySelector() {
  const { language, selectedCategories, toggleCategory } = useGameStore();
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {language === 'es' ? 'Categorías' : 'Categories'}
      </label>
      
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={`
                flex items-center gap-3 p-4 rounded-lg border-2 transition-all
                ${isSelected 
                  ? 'border-yellow-500 bg-yellow-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="font-medium text-sm">
                {category.label[language]}
              </span>
              
              {isSelected && (
                <span className="ml-auto text-yellow-500">✓</span>
              )}
            </button>
          );
        })}
      </div>
      
      <p className="text-xs text-gray-500">
        {language === 'es' 
          ? `${selectedCategories.length} categoría(s) seleccionada(s)` 
          : `${selectedCategories.length} category(ies) selected`
        }
      </p>
    </div>
  );
}
