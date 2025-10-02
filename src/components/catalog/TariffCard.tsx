import React from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useTranslation } from 'react-i18next';

export interface TariffItem {
  id?: string;
  audience: 'business' | 'individual';
  title: string;
  price_kzt: number;
  badge?: string;
  features: string[];
  is_active: boolean;
  sort_order?: number;
}

interface TariffCardProps {
  item: TariffItem;
  onApply?: (item: TariffItem) => void;
}

const TariffCard: React.FC<TariffCardProps> = ({ item, onApply }) => {
  const { convertPrice, formatPrice } = useCurrency();
  const { t } = useTranslation('catalog');
  const { t: tTariffs } = useTranslation('tariffs');
  const convertedPrice = convertPrice(item.price_kzt);
  const formattedPrice = formatPrice(convertedPrice);

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{tTariffs(`titles.${(item as any).title_key || ''}`, { defaultValue: item.title })}</h3>
        {item.badge && (
          <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            {tTariffs(`badges.${(item as any).badge_key || ''}`, { defaultValue: item.badge })}
          </span>
        )}
      </div>

      <div className="mb-4">
        <div className="text-3xl font-extrabold text-white">
          {item.price_kzt === 0 ? tTariffs('prices.by_request') : formattedPrice}
        </div>
        <div className="text-white/70 text-sm mt-1">{t('tariffs.one_time_setup')}</div>
        <div className="mt-2 p-2 bg-blue-500/10 rounded-lg border border-blue-400/20">
          <div className="text-blue-200 text-xs font-medium">{t('tariffs.monthly_note_title')}</div>
          <div className="text-blue-100 text-xs">{t('tariffs.monthly_note_value')}</div>
        </div>
      </div>

      <ul className="space-y-2 text-gray-200 flex-1">
        {item.features.slice(0, 8).map((f, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-sm">{tTariffs(f, { defaultValue: f })}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onApply?.(item)}
        className="mt-6 w-full px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200"
        aria-label={t('tariffs.apply_aria', { title: item.title })}
      >
        {t('tariffs.apply')}
      </button>
    </div>
  );
};

export default TariffCard;


