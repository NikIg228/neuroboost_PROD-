import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage, availableLanguages, isLoading } = useLanguage();
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (languageCode: string) => {
    if (isLoading) return;
    setLanguage(languageCode as 'ru' | 'en' | 'kz');
    setIsOpen(false);
  };

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Кнопка выпадающего списка */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium transition-all hover:from-blue-700 hover:to-purple-700 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('select') + ' язык'}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang?.label}</span>
        <span className="sm:hidden">{currentLang?.code.toUpperCase()}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
        {isLoading && (
          <motion.div
            className="w-3 h-3 border border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
        )}
      </motion.button>

      {/* Выпадающий список */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
            role="listbox"
            aria-label="Выбор языка"
          >
            {availableLanguages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                disabled={isLoading}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-all hover:bg-gray-50 ${
                  currentLanguage === lang.code
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ x: 4 }}
                role="option"
                aria-selected={currentLanguage === lang.code}
                aria-label={`${t('select')} ${lang.label}`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{lang.label}</span>
                  <span className="text-xs text-gray-500">{lang.code.toUpperCase()}</span>
                </div>
                {currentLanguage === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
