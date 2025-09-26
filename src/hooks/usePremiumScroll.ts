import { useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Регистрируем плагин
gsap.registerPlugin(ScrollToPlugin);

export const usePremiumScroll = () => {
  useEffect(() => {
    // Улучшенный плавный скролл для всех ссылок
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const elementId = href.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: {
              y: element,
              offsetY: 80 // Отступ для фиксированной шапки
            },
            ease: "power3.inOut"
          });
        }
      }
    };

    // Добавляем обработчики для всех ссылок
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  const scrollTo = useCallback((elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: element,
          offsetY: offset
        },
        ease: "power3.inOut"
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: 0
      },
      ease: "power3.inOut"
    });
  }, []);

  const scrollToBottom = useCallback(() => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: document.documentElement.scrollHeight
      },
      ease: "power3.inOut"
    });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: element,
          offsetY: 100
        },
        ease: "power3.inOut"
      });
    }
  }, []);

  return {
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToSection,
  };
};
