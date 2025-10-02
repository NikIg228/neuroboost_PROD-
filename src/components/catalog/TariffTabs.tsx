import React from 'react';
import { useTranslation } from 'react-i18next';

interface TariffTabsProps {
  value: 'business' | 'individual';
  onChange: (v: 'business' | 'individual') => void;
}

const TariffTabs: React.FC<TariffTabsProps> = ({ value, onChange }) => {
  const { t } = useTranslation('catalog');
  
  return (
    <div className="inline-flex p-1 rounded-xl bg-white/10 border border-white/20">
      {(['business', 'individual'] as const).map((v) => {
        const active = value === v;
        return (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                : 'text-white/80 hover:text-white'
            }`}
            aria-pressed={active}
          >
            {v === 'business' ? t('tabs.business') : t('tabs.individual')}
          </button>
        );
      })}
    </div>
  );
};

export default TariffTabs;


