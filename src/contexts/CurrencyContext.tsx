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
    // Округляем до красивых чисел
    if (price >= 1000) {
      return Math.round(price / 10) * 10 - 1; // 459, 999
    } else if (price >= 100) {
      return Math.round(price / 5) * 5 - 1; // 199, 299, 459
    } else {
      return Math.round(price); // Как есть для малых сумм
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
        return `$${formatted}`;
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
