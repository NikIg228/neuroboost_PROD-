import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'KZT' | 'RUB' | 'USD';

interface CurrencyRates {
  KZT: number;
  RUB: number;
  USD: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceKZT: number) => number;
  formatPrice: (price: number) => string;
  getCurrencySymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Курсы валют относительно тенге (1 KZT = X)
const CURRENCY_RATES: CurrencyRates = {
  KZT: 1,
  RUB: 0.154, // 1 KZT ≈ 0.154 RUB
  USD: 0.00211 // 1 KZT ≈ 0.00211 USD
};

// Функция для "красивого" округления
const roundPrice = (price: number, currency: Currency): number => {
  if (currency === 'KZT') {
    // Округляем до ближайшей тысячи или сотни
    if (price >= 100000) {
      return Math.round(price / 1000) * 1000;
    } else if (price >= 10000) {
      return Math.round(price / 500) * 500;
    } else {
      return Math.round(price / 100) * 100;
    }
  } else if (currency === 'RUB') {
    // Округляем до 99 или красивых чисел
    if (price >= 50000) {
      return Math.round(price / 1000) * 1000 - 1; // 38999, 49999
    } else if (price >= 10000) {
      return Math.round(price / 500) * 500 - 1; // 14999, 19499
    } else if (price >= 1000) {
      return Math.round(price / 100) * 100 - 1; // 1999, 2499
    } else {
      return Math.round(price / 10) * 10 - 1; // 199, 299
    }
  } else { // USD
    // Психологическое округление к значениям с окончанием .99
    if (price >= 100) {
      // До ближайшего большего десятка и "-0.01" → 319.99, 459.99
      const upToTen = Math.ceil(price / 10) * 10;
      return parseFloat((upToTen - 0.01).toFixed(2));
    } else if (price >= 20) {
      // До ближайшего большего шага 5 и "-0.01" → 24.99, 29.99
      const upToFive = Math.ceil(price / 5) * 5;
      return parseFloat((upToFive - 0.01).toFixed(2));
    } else {
      // Небольшие суммы: к следующему целому и "-0.01" плюс шаг вверх
      const upToOne = Math.ceil(price) + 1;
      return parseFloat((upToOne - 0.01).toFixed(2));
    }
  }
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('KZT');

  const convertPrice = (priceKZT: number): number => {
    if (priceKZT === 0) return 0; // Для тарифов "по запросу"
    
    const convertedPrice = priceKZT * CURRENCY_RATES[currency];
    return roundPrice(convertedPrice, currency);
  };

  const formatPrice = (price: number): string => {
    if (price === 0) return 'По запросу';
    
    const formatted = new Intl.NumberFormat('ru-RU').format(price);

    switch (currency) {
      case 'KZT':
        return `${formatted} ₸`;
      case 'RUB':
        return `${formatted} ₽`;
      case 'USD':
        // Для USD показываем две цифры после запятой и знак доллара в конце
        const usd = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
        return `${usd}$`;
      default:
        return `${formatted} ₸`;
    }
  };

  const getCurrencySymbol = (): string => {
    switch (currency) {
      case 'KZT':
        return '₸';
      case 'RUB':
        return '₽';
      case 'USD':
        return '$';
      default:
        return '₸';
    }
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      convertPrice,
      formatPrice,
      getCurrencySymbol
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
