import React, { useState } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useTranslation } from 'react-i18next';

import type { TariffItem } from './TariffCard';

interface TariffComparisonProps {
  items: TariffItem[];
}

const TariffComparison: React.FC<TariffComparisonProps> = ({ items }) => {
  const { convertPrice, formatPrice } = useCurrency();
  const { t } = useTranslation('catalog');
  const { t: t_ } = useTranslation('tariffs');
  const [yearly, setYearly] = useState(false);

  const computePrice = (kzt: number) => {
    const monthly = convertPrice(kzt);
    if (!yearly) return formatPrice(monthly);
    const yearlyTotal = monthly * 12 * 0.8; // -20%
    return formatPrice(Math.round(yearlyTotal));
  };

  const visible = items.slice(0, 4);

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-white">{t('comparison.title')}</h3>
        <div className="inline-flex items-center gap-2 text-sm">
          <span className={`px-3 py-1 rounded-lg ${!yearly ? 'bg-white/20 text-white' : 'text-white/70'}`}>{t('comparison.monthly')}</span>
          <button
            onClick={() => setYearly(!yearly)}
            className="px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20"
            aria-pressed={yearly}
          >
            {t('comparison.toggle')}
          </button>
          <span className={`px-3 py-1 rounded-lg ${yearly ? 'bg-white/20 text-white' : 'text-white/70'}`}>{t('comparison.yearly')}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-white/90">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-3 pr-6">{t('comparison.columns.plan')}</th>
              <th className="py-3 pr-6">{t('comparison.columns.price')}</th>
              <th className="py-3 pr-6">{t('comparison.columns.active')}</th>
              <th className="py-3 pr-6">{t('comparison.columns.order')}</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => (
              <tr key={`${t.title}-${t.audience}`} className="border-b border-white/10">
                <td className="py-3 pr-6 font-semibold">{t_('titles.' + ((t as any).title_key || ''), { ns: 'tariffs', defaultValue: t.title })}</td>
                <td className="py-3 pr-6">{computePrice(t.price_kzt)}</td>
                <td className="py-3 pr-6">{t.is_active ? t('comparison.yes') : t('comparison.no')}</td>
                <td className="py-3 pr-6">{t.sort_order ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TariffComparison;


