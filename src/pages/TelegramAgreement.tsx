import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '@/components/AnimatedSection';

const TelegramAgreement: React.FC = () => {
  const { t } = useTranslation('legal');
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('telegramAgreement.title')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('telegramAgreement.date')}
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                {t('telegramAgreement.intro')}
              </p>
              
              <p className="text-gray-700 mb-8 font-semibold">
                {t('telegramAgreement.acceptance')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.general.title')}</h2>
              <p className="text-gray-700 mb-4">
                <strong>{t('telegramAgreement.sections.general.1.1.title')}</strong> {t('telegramAgreement.sections.general.1.1.content')}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>{t('telegramAgreement.sections.general.1.2.title')}</strong> {t('telegramAgreement.sections.general.1.2.content')}
              </p>
              <p className="text-gray-700 mb-6">
                <strong>{t('telegramAgreement.sections.general.1.3.title')}</strong> {t('telegramAgreement.sections.general.1.3.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.rights.title')}</h2>
              <p className="text-gray-700 mb-3">
                <strong>{t('telegramAgreement.sections.rights.userRights.title')}</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                {t('telegramAgreement.sections.rights.userRights.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-gray-700 mb-3">
                <strong>{t('telegramAgreement.sections.rights.userObligations.title')}</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                {t('telegramAgreement.sections.rights.userObligations.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-gray-700 mb-3">
                <strong>{t('telegramAgreement.sections.rights.ownerRights.title')}</strong>
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('telegramAgreement.sections.rights.ownerRights.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.dataProcessing.title')}</h2>
              <p className="text-gray-700 mb-3">
                <strong>{t('telegramAgreement.sections.dataProcessing.3.1.title')}</strong> {t('telegramAgreement.sections.dataProcessing.3.1.content')}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                {t('telegramAgreement.sections.dataProcessing.3.1.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-gray-700 mb-4">
                <strong>{t('telegramAgreement.sections.dataProcessing.3.2.title')}</strong> {t('telegramAgreement.sections.dataProcessing.3.2.content')}
              </p>

              <p className="text-gray-700 mb-3">
                <strong>{t('telegramAgreement.sections.dataProcessing.3.3.title')}</strong> {t('telegramAgreement.sections.dataProcessing.3.3.content')}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                {t('telegramAgreement.sections.dataProcessing.3.3.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-gray-700 mb-6">
                <strong>{t('telegramAgreement.sections.dataProcessing.3.4.title')}</strong> {t('telegramAgreement.sections.dataProcessing.3.4.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.liability.title')}</h2>
              <p className="text-gray-700 mb-3">
                <strong>{t('telegramAgreement.sections.liability.4.1.title')}</strong> {t('telegramAgreement.sections.liability.4.1.content')}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                {t('telegramAgreement.sections.liability.4.1.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-gray-700 mb-6">
                <strong>{t('telegramAgreement.sections.liability.4.2.title')}</strong> {t('telegramAgreement.sections.liability.4.2.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('telegramAgreement.sections.final.title')}</h2>
              <p className="text-gray-700 mb-4">
                <strong>{t('telegramAgreement.sections.final.5.1.title')}</strong> {t('telegramAgreement.sections.final.5.1.content')}
                <br />
                <a href="https://gorgeous-creponne-26d474.netlify.app/telegram-agreement" className="text-blue-600 hover:text-blue-800">
                 {t('telegramAgreement.sections.final.5.1.url')}
                </a>
              </p>

              <p className="text-gray-700 mb-4">
                <strong>{t('telegramAgreement.sections.final.5.2.title')}</strong> {t('telegramAgreement.sections.final.5.2.content')}
              </p>

              <p className="text-gray-700 mb-6">
                <strong>{t('telegramAgreement.sections.final.5.3.title')}</strong> {t('telegramAgreement.sections.final.5.3.content')}
                <br />
                <a href="https://t.me/neurboosthelpbot" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  {t('telegramAgreement.sections.final.5.3.url')}
                </a>
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                <p className="text-yellow-800 font-semibold">
                  {t('telegramAgreement.disclaimer')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TelegramAgreement;
