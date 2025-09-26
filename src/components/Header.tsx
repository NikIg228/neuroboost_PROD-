import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useChatbot } from '@/contexts/ChatbotContext';
import { Brain, MessageCircle, Bot } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { setIsOpen: setChatbotOpen } = useChatbot();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/catalog', label: 'Каталог' },
    { path: '/reviews', label: 'Отзывы' },
    { path: '/about', label: 'О нас' },
    { path: '/contact', label: 'Контакты' }
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const handleConsultation = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setIsConsultationModalOpen(true);
  };

  const handleChatbotOpen = () => {
    setChatbotOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (path: string) => {
    // Прокручиваем к верху страницы
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Переходим по ссылке
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header 
        className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-all duration-300"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.button 
            onClick={() => window.location.href = '/'} 
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg"
              whileHover={{ 
                scale: 1.1,
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <Brain className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NeuroBoost
              </span>
            </div>
          </motion.button>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`text-sm lg:text-base font-medium transition-colors duration-200 hover:text-blue-600 relative group ${
                  location.pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 ${
                    location.pathname === item.path ? 'w-full' : 'w-0'
                  }`}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-3 md:space-x-4">
                <button
                  onClick={handleConsultation}
                  className="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-green-600 hover:text-green-800 transition-colors border border-green-600 rounded-lg hover:bg-green-50"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Консультация
                </button>
                <button
                  onClick={() => handleLinkClick('/lk')}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors hidden md:inline"
                >
                  Личный кабинет
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors hidden md:inline"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3 md:space-x-4">
                <button
                  onClick={() => window.location.href = '/login'}
                  className="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-green-600 hover:text-green-800 transition-colors border border-green-600 rounded-lg hover:bg-green-50"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Консультация
                </button>
                <button
                  onClick={() => handleLinkClick('/login')}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors hidden md:inline"
                >
                  Войти
                </button>
                <button
                  onClick={() => handleLinkClick('/register')}
                  className="hidden md:inline px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Регистрация
                </button>
              </div>
            )}
            
            <div className="md:hidden">
              <button 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Открыть меню"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </motion.header>

      {/* Мобильное меню - полноэкранный оверлей */}
      {isMobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Затемненный фон */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Меню панель - зафиксированная, не прокручивается */}
          <motion.div 
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Заголовок с кнопкой закрытия */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <button 
                onClick={() => window.location.href = '/'}
                className="flex items-center space-x-3 group"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NeuroBoost
                </span>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Закрыть меню"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Навигация */}
            <div className="p-4 space-y-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Навигация
              </div>
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Кнопки действий */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Помощь
              </div>
              <div className="space-y-3 mb-6">
                <button 
                  onClick={handleChatbotOpen} 
                  className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  <Bot className="h-5 w-5 mr-2" />
                  Умный помощник
                </button>
                <button 
                  onClick={handleConsultation} 
                  className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-green-600 border border-green-600 rounded-xl hover:bg-green-50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Консультация
                </button>
              </div>
              
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Аккаунт
              </div>
              <div className="space-y-3">
                {user ? (
                  <>
                    <button 
                      onClick={() => handleLinkClick('/lk')} 
                      className="w-full px-4 py-3 text-base font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Личный кабинет
                    </button>
                    <button 
                      onClick={handleSignOut} 
                      className="w-full px-4 py-3 text-base font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleLinkClick('/login')} 
                      className="w-full px-4 py-3 text-base font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Войти
                    </button>
                    <button 
                      onClick={() => handleLinkClick('/register')} 
                      className="w-full px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      Регистрация
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </>
  );
};

export default Header;