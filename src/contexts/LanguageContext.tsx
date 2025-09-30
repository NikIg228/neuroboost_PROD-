import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'ru' | 'en' | 'kz';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  availableLanguages: { code: Language; label: string; flag: string }[];
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const availableLanguages = [
  { code: 'ru' as Language, label: 'Русский', flag: '🇷🇺' },
  { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
  { code: 'kz' as Language, label: 'Қазақша', flag: '🇰🇿' }
];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const currentLanguage = (i18n.language as Language) || 'ru';

  const setLanguage = async (language: Language) => {
    if (language === currentLanguage) return;
    
    setIsLoading(true);
    try {
      // Принудительно перезагружаем переводы
      await i18n.reloadResources(language);
      await i18n.changeLanguage(language);
      localStorage.setItem('i18nextLng', language);
      
      // Обновляем lang атрибут HTML
      document.documentElement.lang = language;
      
      // Принудительно обновляем компоненты
      i18n.emit('languageChanged', language);
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Устанавливаем lang атрибут при загрузке
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      availableLanguages,
      isLoading
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
