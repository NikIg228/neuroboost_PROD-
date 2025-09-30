# Roadmap: Внедрение мультиязычности (ru/en/kz)

## Обзор
Цель: Полная локализация сайта на русский, английский и казахский языки с переключателем в Header.

## Этап 1: Базовая инфраструктура i18n
- [X] 1.1 Создать `src/i18n.ts` с конфигурацией i18next
- [X] 1.2 Подключить i18n в `src/main.tsx` перед App
- [X] 1.3 Создать базовую структуру папок `public/locales/{ru,en,kz}/`
- [X] 1.4 Создать `src/contexts/LanguageContext.tsx` для управления языком
- [X] 1.5 Добавить типы для переводов в `src/types/i18n.ts`

## Этап 2: Переключатель языка в Header
- [X] 2.1 Создать `src/components/common/LanguageSwitcher.tsx`
- [X] 2.2 Интегрировать LanguageSwitcher в десктопную версию Header
- [X] 2.3 Добавить LanguageSwitcher в мобильное меню Header
- [X] 2.4 Добавить сохранение выбранного языка в localStorage
- [X] 2.5 Добавить ARIA-атрибуты для доступности

## Этап 3: Базовые переводы (common, header, footer)
- [X] 3.1 Создать `public/locales/ru/common.json` с общими фразами
- [X] 3.2 Создать `public/locales/en/common.json` с переводами
- [X] 3.3 Создать `public/locales/kz/common.json` с переводами
- [X] 3.4 Создать `public/locales/ru/header.json` с навигацией
- [X] 3.5 Создать `public/locales/en/header.json` с переводами
- [X] 3.6 Создать `public/locales/kz/header.json` с переводами
- [X] 3.7 Создать `public/locales/ru/footer.json` с футером
- [X] 3.8 Создать `public/locales/en/footer.json` с переводами
- [X] 3.9 Создать `public/locales/kz/footer.json` с переводами

## Этап 4: Локализация Header компонента
- [X] 4.1 Заменить хардкод текстов в `src/components/Header.tsx` на useTranslation
- [X] 4.2 Обновить навигационные пункты с переводов
- [X] 4.3 Обновить кнопки авторизации с переводов
- [X] 4.4 Обновить мобильное меню с переводов
- [X] 4.5 Добавить динамическое обновление lang атрибута HTML

## Этап 5: Локализация Footer компонента
- [X] 5.1 Заменить хардкод текстов в `src/components/Footer.tsx` на useTranslation
- [X] 5.2 Обновить ссылки и копирайт с переводов
- [X] 5.3 Обновить социальные сети с переводов

## Этап 6: Локализация главной страницы (Home)
- [X] 6.1 Создать `public/locales/ru/home.json` с текстами главной
- [X] 6.2 Создать `public/locales/en/home.json` с переводами
- [X] 6.3 Создать `public/locales/kz/home.json` с переводами
- [X] 6.4 Заменить хардкод в `src/pages/Home.tsx` на useTranslation (hero/CTA)
- [X] 6.5 Обновить блок «О нас» с переводов
- [X] 6.6 Обновить остальные секции (виджеты, чат-бот, CTA-блоки)
- [X] 6.7 Обновить дополнительные подписи/лейблы и мелкие тексты

## Этап 7: Локализация каталога (Catalog)
- [X] 7.1 Создать `public/locales/ru/catalog.json` с каталогом
- [X] 7.2 Создать `public/locales/en/catalog.json` с переводами
- [X] 7.3 Создать `public/locales/kz/catalog.json` с переводами
- [X] 7.4 Заменить хардкод в `src/pages/Catalog.tsx` на useTranslation
- [X] 7.5 Обновить фильтры и поиск с переводов
- [X] 7.6 Обновить карточки услуг с переводов
- [X] 7.7 Обновить модальные окна с переводов

## Этап 8: Локализация данных услуг
- [X] 8.1 Создать `public/locales/ru/services.json` с описаниями услуг
- [X] 8.2 Создать `public/locales/en/services.json` с переводами
- [X] 8.3 Создать `public/locales/kz/services.json` с переводами
- [X] 8.4 Обновить `src/data/services.ts` для использования переводов (структура ключей)
- [X] 8.5 Обновить `src/components/ServiceCard.tsx` с переводов
- [X] 8.6 Обновить `src/components/ServiceModal.tsx` с переводов

## Этап 9: Локализация калькулятора токенов
- [X] 9.1 Создать `public/locales/ru/calculator.json` с калькулятором
- [X] 9.2 Создать `public/locales/en/calculator.json` с переводами
- [X] 9.3 Создать `public/locales/kz/calculator.json` с переводами
- [X] 9.4 Заменить хардкод в `src/pages/TokenCalculator.tsx` на useTranslation
- [X] 9.5 Обновить провайдеров ИИ с переводов
- [X] 9.6 Обновить сценарии использования с переводов
- [X] 9.7 Обновить результаты расчетов с переводов

## Этап 10: Локализация аутентификации
- [X] 10.1 Создать `public/locales/ru/auth.json` с формами
- [X] 10.2 Создать `public/locales/en/auth.json` с переводами
- [X] 10.3 Создать `public/locales/kz/auth.json` с переводами
- [X] 10.4 Заменить хардкод в `src/pages/Login.tsx` на useTranslation
- [X] 10.5 Заменить хардкод в `src/pages/Register.tsx` на useTranslation
- [X] 10.6 Обновить валидацию форм с переводов
- [X] 10.7 Обновить сообщения об ошибках с переводов

## Этап 11: Локализация профиля и личного кабинета
- [X] 11.1 Создать `public/locales/ru/profile.json` с профилем
- [X] 11.2 Создать `public/locales/en/profile.json` с переводами
- [X] 11.3 Создать `public/locales/kz/profile.json` с переводами
- [X] 11.4 Заменить хардкод в `src/pages/Profile.tsx` на useTranslation
- [X] 11.5 Обновить настройки аккаунта с переводов
- [X] 11.6 Обновить историю заказов с переводов

## Этап 12: Локализация юридических страниц
- [X] 12.1 Создать `public/locales/ru/legal.json` с правовыми текстами
- [X] 12.2 Создать `public/locales/en/legal.json` с переводами
- [X] 12.3 Создать `public/locales/kz/legal.json` с переводами
- [X] 12.4 Заменить хардкод в `src/pages/PrivacyPolicy.tsx` на useTranslation
- [X] 12.5 Заменить хардкод в `src/pages/PublicOffer.tsx` на useTranslation
- [X] 12.6 Заменить хардкод в `src/pages/Consent.tsx` на useTranslation
- [X] 12.7 Заменить хардкод в `src/pages/TelegramAgreement.tsx` на useTranslation

## Этап 13: Локализация дополнительных страниц
- [X] 13.1 Создать `public/locales/ru/pages.json` с остальными страницами
- [X] 13.2 Создать `public/locales/en/pages.json` с переводами
- [X] 13.3 Создать `public/locales/kz/pages.json` с переводами
- [X] 13.4 Заменить хардкод в `src/pages/About.tsx` на useTranslation
- [X] 13.5 Заменить хардкод в `src/pages/Contact.tsx` на useTranslation
- [X] 13.6 Заменить хардкод в `src/pages/Reviews.tsx` на useTranslation
- [X] 13.7 Заменить хардкод в `src/pages/Academy.tsx` на useTranslation

## Этап 14: Локализация компонентов
- [X] 14.1 Обновить `src/components/ChatbotWidget.tsx` с переводов
- [X] 14.2 Обновить `src/components/ConsultationModal.tsx` с переводов
- [X] 14.3 Обновить `src/components/PurchaseModal.tsx` с переводов
- [ ] 14.4 Обновить `src/components/common/LeadForm.tsx` с переводов
- [ ] 14.5 Обновить `src/components/catalog/TariffCard.tsx` с переводов
- [ ] 14.6 Обновить `src/components/catalog/TariffComparison.tsx` с переводов
- [ ] 14.7 Обновить `src/components/ReviewCard.tsx` с переводов

## Этап 15: Локализация тарифов и данных
- [ ] 15.1 Создать `public/locales/ru/tariffs.json` с тарифами
- [ ] 15.2 Создать `public/locales/en/tariffs.json` с переводами
- [ ] 15.3 Создать `public/locales/kz/tariffs.json` с переводами
- [ ] 15.4 Обновить `src/data/tariffs.json` для использования переводов
- [ ] 15.5 Обновить `public/data/tariffs.json` для использования переводов
- [ ] 15.6 Обновить компоненты тарифов с переводов

## Этап 16: Тестирование и оптимизация
- [ ] 16.1 Проверить все страницы на всех языках
- [ ] 16.2 Проверить переключатель языка в Header
- [ ] 16.3 Проверить мобильное меню на всех языках
- [ ] 16.4 Проверить сохранение выбранного языка
- [ ] 16.5 Проверить загрузку переводов без мигания
- [ ] 16.6 Проверить доступность (ARIA-атрибуты)
- [ ] 16.7 Проверить производительность загрузки переводов

## Этап 17: Финальная настройка
- [ ] 17.1 Добавить fallback для отсутствующих переводов
- [ ] 17.2 Настроить правильные языковые коды (ru-RU, en-US, kk-KZ)
- [ ] 17.3 Добавить мета-теги для SEO на разных языках
- [ ] 17.4 Настроить hreflang для многоязычности
- [ ] 17.5 Добавить индикатор загрузки переводов
- [ ] 17.6 Оптимизировать размеры файлов переводов

## Критерии готовности
- [ ] Все тексты на сайте переведены на 3 языка
- [ ] Переключатель языка работает корректно
- [ ] Выбранный язык сохраняется между сессиями
- [ ] Нет мигания при загрузке переводов
- [ ] Все компоненты адаптированы под разные длины текстов
- [ ] Мобильная версия полностью локализована
- [ ] Доступность соблюдена (ARIA, семантика)

## Примечания
- Каждый подпункт выполняется за один проход
- После выполнения подпункта ставится X в чекбоксе
- Приоритет: Header → Home → Catalog → Calculator → Auth → остальное
- Все переводы должны быть качественными и контекстными
- Рекомендуется тестировать на реальных пользователях