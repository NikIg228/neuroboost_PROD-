import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';
// Используем нативный smooth scroll, чтобы избежать задержек

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen } = useChatbot();
  // Без внешних зависимостей, максимально отзывчиво

  useEffect(() => {
    const toggleVisibility = () => {
      // На мобильных показываем кнопку раньше
      const threshold = window.innerWidth < 768 ? 200 : 300;
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    // Мгновенная реакция + нативная плавность
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && !isOpen && (
        <motion.button
          onClick={handleScrollToTop}
          className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 z-[60] p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:rounded-2xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 backdrop-blur-sm border border-white/20"
          aria-label="Scroll to top"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          key="scroll-to-top"
          whileHover={{ 
            scale: 1.1,
            y: -5,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
            backgroundColor: "rgba(59, 130, 246, 0.9)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative"
          >
            <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
            {/* Блестящий эффект */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
              animate={{ x: [-100, 100] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 3
              }}
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;