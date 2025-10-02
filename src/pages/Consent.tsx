import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '@/components/AnimatedSection';

const Consent: React.FC = () => {
  const { t } = useTranslation('legal');
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('consent.title')}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('consent.intro')}
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.dataProcessing.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.dataProcessing.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.purposes.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.purposes.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.dataTypes.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.dataTypes.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.consentWithdrawal.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.consentWithdrawal.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.dataRetention.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.dataRetention.content')}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Consent;