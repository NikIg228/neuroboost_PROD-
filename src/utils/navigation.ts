import { NavigateFunction } from 'react-router-dom';

/**
 * Универсальная функция навигации с прокруткой к началу страницы
 * @param navigate - функция навигации из useNavigate
 * @param path - путь для перехода
 * @param options - дополнительные опции
 */
export const navigateWithScroll = (
  navigate: NavigateFunction,
  path: string,
  options?: {
    replace?: boolean;
    state?: any;
    scrollBehavior?: ScrollBehavior;
  }
) => {
  // Прокручиваем к верху страницы
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: options?.scrollBehavior || 'smooth'
  });
  
  // Переходим по ссылке
  navigate(path, options);
};

/**
 * Хук для навигации с автоматической прокруткой
 * @param navigate - функция навигации из useNavigate
 */
export const useNavigateWithScroll = (navigate: NavigateFunction) => {
  return (path: string, options?: Parameters<NavigateFunction>[1]) => {
    navigateWithScroll(navigate, path, options);
  };
};
