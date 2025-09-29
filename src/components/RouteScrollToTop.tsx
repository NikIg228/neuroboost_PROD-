import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls window to the top whenever the route (pathname or search) changes.
 * If there's a hash (#anchor), it tries to scroll to that element first.
 */
export default function RouteScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Allow new page content to paint first
    const id = window.requestAnimationFrame(() => {
      if (hash) {
        try {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        } catch (e) {
          // ignore invalid selectors
        }
      }
      // Прокручиваем к началу страницы с плавной анимацией
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname, search, hash]);

  return null;
}
