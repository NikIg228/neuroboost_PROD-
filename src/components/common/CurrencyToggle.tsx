import React from 'react';
import { motion } from 'framer-motion';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';

const CurrencyToggle: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies: { code: Currency; label: string; flag: string }[] = [
    { code: 'KZT', label: 'Тенге', flag: '🇰🇿' },
    { code: 'RUB', label: 'Рубль', flag: '🇷🇺' },
    { code: 'USD', label: 'Доллар', flag: '🇺🇸' }
  ];

  return (
    <div className="inline-flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
      {currencies.map((curr) => (
        <motion.button
          key={curr.code}
          onClick={() => setCurrency(curr.code)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            currency === curr.code
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-pressed={currency === curr.code}
        >
          <span className="text-xs">{curr.flag}</span>
          <span className="hidden sm:inline">{curr.label}</span>
          <span className="sm:hidden">{curr.code}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CurrencyToggle;
