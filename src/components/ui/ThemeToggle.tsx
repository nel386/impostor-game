import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors shadow-inner"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-lg"
        animate={{
          x: theme === 'dark' ? 32 : 0
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <FaMoon className="text-yellow-400 text-xs" />
        ) : (
          <FaSun className="text-yellow-500 text-xs" />
        )}
      </motion.div>
    </motion.button>
  );
}
