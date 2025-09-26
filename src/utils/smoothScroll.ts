// Утилиты для плавного скролла

/**
 * Плавно прокручивает к элементу по ID
 * @param elementId - ID элемента для прокрутки
 * @param offset - Отступ от верха (по умолчанию 80px)
 */
export const scrollToElement = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Плавно прокручивает к началу страницы
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Плавно прокручивает к концу страницы
 */
export const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
};

/**
 * Плавно прокручивает к определенной позиции
 * @param position - Позиция для прокрутки
 */
export const scrollToPosition = (position: number) => {
  window.scrollTo({
    top: position,
    behavior: 'smooth'
  });
};

/**
 * Проверяет, поддерживает ли браузер плавный скролл
 */
export const supportsSmoothScroll = (): boolean => {
  return 'scrollBehavior' in document.documentElement.style;
};

/**
 * Полифилл для плавного скролла для старых браузеров
 */
export const smoothScrollPolyfill = () => {
  if (!supportsSmoothScroll()) {
    // Простая реализация плавного скролла
    const smoothScrollTo = (target: number, duration: number = 500) => {
      const start = window.pageYOffset;
      const distance = target - start;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      const ease = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    };

    // Переопределяем scrollTo для поддержки плавного скролла
    const originalScrollTo = window.scrollTo;
    window.scrollTo = (options: any) => {
      if (options && options.behavior === 'smooth') {
        smoothScrollTo(options.top || 0);
      } else {
        // Передаем корректное число аргументов в оригинальный scrollTo
        originalScrollTo.call(window, options.left || 0, options.top || 0);
      }
    };
  }
};

/**
 * Инициализация плавного скролла
 */
export const initSmoothScroll = () => {
  smoothScrollPolyfill();
  
  // Добавляем класс для плавного скролла
  document.documentElement.classList.add('smooth-scroll');
  
  // Обработчик для якорных ссылок
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const elementId = href.substring(1);
        scrollToElement(elementId);
      }
    }
  });
};
