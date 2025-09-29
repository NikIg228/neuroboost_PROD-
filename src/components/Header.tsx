import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Brain, MessageCircle, Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useNavigateWithScroll } from '@/utils/navigation';
import ConsultationModal from './ConsultationModal';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigateWithScroll = useNavigateWithScroll(navigate);
  const { user, signOut } = useAuth();
  const { setIsOpen: setChatbotOpen } = useChatbot();

  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const lastScrollYRef = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/catalog', label: 'Каталог' },
    { path: '/token-calculator', label: 'Калькулятор' },
    { path: '/academy', label: 'Обучение' },
    { path: '/reviews', label: 'Отзывы' },
    { path: '/about', label: 'О нас' },
    { path: '/contact', label: 'Контакты' }
  ];

  const handleSignOut = async () => { await signOut(); };

  const handleConsultation = () => {
    if (!user) { window.location.href = '/login'; return; }
    setIsConsultationModalOpen(true);
  };

  // Аккуратное открытие чат-бота: сначала закрываем меню и снимаем lock, потом открываем чат
  const handleChatbotOpen = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    // даём браузеру «снять» стили фиксации body, потом открываем чат
    setTimeout(() => setChatbotOpen(true), 0);
  };

  const handleLinkClick = (path: string) => {
    navigateWithScroll(path);
    setIsMobileMenuOpen(false);
  };

  /** ====== Глобально поддерживаем корректную высоту для iOS (100dvh) ====== */
  useEffect(() => {
    const updateVVH = () => {
      if (window.visualViewport) {
        document.documentElement.style.setProperty('--vvh', `${window.visualViewport.height}px`);
      } else {
        // фолбэк
        document.documentElement.style.setProperty('--vvh', `${window.innerHeight}px`);
      }
    };
    updateVVH();
    window.visualViewport?.addEventListener('resize', updateVVH);
    window.addEventListener('orientationchange', updateVVH);
    return () => {
      window.visualViewport?.removeEventListener('resize', updateVVH);
      window.removeEventListener('orientationchange', updateVVH);
    };
  }, []);

  /** ====== Body scroll lock + защита от «ломающих fixed» transform'ов ====== */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isMobileMenuOpen) {
      // фиксируем body и запоминаем позицию
      lastScrollYRef.current = window.scrollY;
      body.style.position = 'fixed';
      body.style.top = `-${lastScrollYRef.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      html.classList.add('overflow-hidden');

      // **критично**: убираем transform у шапки и потенциальных корневых контейнеров
      if (headerRef.current) {
        (headerRef.current.style as any).transform = 'none';
        (headerRef.current.style as any).willChange = 'auto';
      }
      const root = document.getElementById('root') || document.querySelector('#__next') || document.body;
      if (root) (root as HTMLElement).style.transform = 'none';

      // Закрытие по Esc
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
      window.addEventListener('keydown', onKey);

      // Ловушка фокуса
      const focusables = () => {
        const rootMenu = menuRef.current;
        return rootMenu
          ? rootMenu.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
          : ([] as unknown as NodeListOf<HTMLElement>);
      };
      const trap = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        const list = focusables();
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { last.focus(); e.preventDefault(); }
        } else {
          if (document.activeElement === last) { first.focus(); e.preventDefault(); }
        }
      };
      document.addEventListener('keydown', trap);

      // первый фокус внутрь
      setTimeout(() => {
        const list = focusables();
        list[0]?.focus();
      }, 0);

      return () => {
        window.removeEventListener('keydown', onKey);
        document.removeEventListener('keydown', trap);
        html.classList.remove('overflow-hidden');
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        window.scrollTo(0, lastScrollYRef.current);
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        ref={headerRef}
        className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg sticky top-0 z-50 transition-all duration-300"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        // при открытом меню жёстко убираем любые transform от framer-motion
        style={isMobileMenuOpen ? { transform: 'none', willChange: 'auto' } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button
              onClick={() => navigateWithScroll('/')}
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 360, transition: { duration: 0.5 } }}
              >
                <Brain className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NeuroBoost
              </span>
            </motion.button>

            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`text-sm lg:text-base font-medium transition-colors duration-200 hover:text-blue-600 relative group ${
                    location.pathname === item.path ? 'text-blue-600' : 'text-gray-700'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 ${
                      location.pathname === item.path ? 'w-full' : 'w-0'
                    }`}
                    whileHover={{ width: '100%' }}
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
                    className="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-green-600 hover:text-green-800 transition-colors border border-green-600/50 rounded-lg hover:bg-green-500/20 "
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
                    onClick={handleConsultation}
                    className="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-green-600 hover:text-green-800 transition-colors border border-green-600/50 rounded-lg hover:bg-green-500/20 "
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
                    className="hidden md:inline px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all "
                  >
                    Регистрация
                  </button>
                </div>
              )}

              {/* Burger */}
              <div className="md:hidden">
                <button
                  className="text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Открыть меню"
                  onClick={() => setIsMobileMenuOpen(true)}
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

      {/* ===== Mobile Menu via Portal (mounts to body) ===== */}
      {isMobileMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px] overscroll-contain md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <aside
              ref={menuRef}
              className="
                absolute inset-y-0 right-0 w-80 max-w-[85vw]
                bg-white shadow-2xl border-l border-gray-200
                h-[100dvh] [height:var(--vvh,100dvh)]
                overflow-hidden touch-action:none
                will-change:transform
              "
              // плавно показываем меню без transform у предков
              style={{ transform: 'translateX(0)', transition: 'transform .28s ease-out' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between h-12 px-4 border-b border-white/30">
                <button
                  onClick={() => navigateWithScroll('/')}
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
                  className="p-2 text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Закрыть меню"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable content area only */}
              <div className="h-[calc(100%-3rem)] overflow-y-auto px-4 py-3">
                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Навигация
                </div>
                <div className="space-y-2 mb-4">
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

                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Помощь
                </div>
                <div className="space-y-3 mb-6">
                  <button
                    onClick={handleChatbotOpen}
                    className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    <Bot className="h-5 w-5 mr-2" /> Умный помощник
                  </button>
                  <button
                    onClick={handleConsultation}
                    className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-green-600 border border-green-600 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" /> Консультация
                  </button>
                </div>

                <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  Аккаунт
                </div>
                <div className="space-y-3 pb-4">
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
            </aside>
          </div>,
          document.body
        )
      }

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </>
  );
};

export default Header;
