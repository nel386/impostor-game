import { GAME_CONFIG } from '@/config/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { LuInfo, LuUser, LuUsers, LuX } from 'react-icons/lu';
import { useTranslation } from '../../../i18n/useTranslation';
import { useGameStore } from '../../../store/gameStore';
import './PlayerNameInput.css';

export default function PlayerNameInput() {
  const { t } = useTranslation();
  const { totalPlayers, customNames, setCustomName, useCustomNames, toggleCustomNames } = useGameStore();

  const clearName = (index: number) => {
    setCustomName(index, '');
  };

  const filledNames = customNames.filter(name => name.trim() !== '').length;

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-slate-700 rounded-lg gap-3 transition-colors">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <LuUsers className="text-xl text-gray-600 dark:text-gray-300 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
              {t.playerNameInput.customNames}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {t.playerNameInput.assignNames}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleCustomNames}
          role="switch"
          aria-checked={useCustomNames}
          aria-label={t.playerNameInput.customNames}
          className={`
            relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-all flex-shrink-0
            ${useCustomNames ? 'bg-yellow-500 dark:bg-yellow-600' : 'bg-gray-300 dark:bg-gray-600'}
            hover:opacity-90
          `}
        >
          <span
            className={`
              absolute top-1 left-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transition-transform shadow-sm
              ${useCustomNames ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}
            `}
          />
        </button>
      </div>

      
      <AnimatePresence>
        {useCustomNames && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 sm:p-4 space-y-3 border border-gray-200 dark:border-gray-600 transition-colors">
              
              <div className="flex items-center justify-between">
                <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t.playerNameInput.enterNames}
                </div>
                {filledNames > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-500 dark:bg-yellow-600 text-white"
                  >
                    {filledNames}/{totalPlayers}
                  </motion.div>
                )}
              </div>

              
              <div className="custom-scrollbar max-h-56 sm:max-h-64 overflow-y-auto pr-2 space-y-2 sm:space-y-2.5">
                {Array.from({ length: totalPlayers }, (_, i) => {
                  const hasValue = customNames[i]?.trim() !== '';

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 w-8 sm:w-9 flex-shrink-0">
                        <LuUser className="text-sm" />
                        <span>{i + 1}</span>
                      </div>

                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={customNames[i] || ''}
                          onChange={(e) => setCustomName(i, e.target.value)}
                          placeholder={`${t.playerNameInput.player} ${i + 1}`}
                          maxLength={GAME_CONFIG.MAX_PLAYER_NAME_LENGTH}
                          className={`
                            w-full px-3 py-2.5 sm:py-3 pr-10 border-2 rounded-lg text-sm sm:text-base 
                            transition-all
                            bg-white dark:bg-slate-800
                            text-gray-900 dark:text-white
                            placeholder:text-gray-400 dark:placeholder:text-gray-500
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:border-transparent
                            ${hasValue
                              ? 'border-yellow-500 dark:border-yellow-400'
                              : 'border-gray-300 dark:border-gray-600'
                            }
                            hover:border-gray-400 dark:hover:border-gray-500
                          `}
                        />

                        
                        {hasValue && (
                          <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            type="button"
                            onClick={() => clearName(i)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            <LuX className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              
              <div className="flex items-start gap-2 pt-1">
                <LuInfo className="text-yellow-500 dark:text-yellow-400 text-base flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t.playerNameInput.leaveBlankInfo}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
