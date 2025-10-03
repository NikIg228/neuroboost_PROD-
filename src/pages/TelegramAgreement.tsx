import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '@/components/AnimatedSection';

const TelegramAgreement: React.FC = () => {
  const { t } = useTranslation('legal');
  const toArray = (value: unknown): string[] => (Array.isArray(value) ? (value as string[]) : []);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('telegramAgreement.title')}
            </h1>
            {/* Дата отсутствует в переводах */}

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                {t('telegramAgreement.intro')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.general.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('telegramAgreement.sections.general.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.acceptance.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('telegramAgreement.sections.acceptance.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.functionality.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('telegramAgreement.sections.functionality.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.userObligations.title')}</h2>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {toArray(t('telegramAgreement.sections.userObligations.items', { returnObjects: true })).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.liability.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('telegramAgreement.sections.liability.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.dataProcessing.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('telegramAgreement.sections.dataProcessing.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.changes.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('telegramAgreement.sections.changes.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.contactInfo.title')}</h2>
              <p className="text-gray-700">
                {t('telegramAgreement.sections.contactInfo.content')}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TelegramAgreement;
