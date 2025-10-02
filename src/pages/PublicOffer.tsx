import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '@/components/AnimatedSection';

const PublicOffer: React.FC = () => {
  const { t } = useTranslation('legal');
  const toArray = (value: unknown): string[] => (Array.isArray(value) ? (value as string[]) : []);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('publicOffer.title')}
            </h1>
            <p className="text-gray-700 mb-6">
              {t('publicOffer.intro')}
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.general.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.general.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.subject.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.subject.content')}
              </p>

              {/* Блок "Заключение" отсутствует в переводах, удален */}

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.payment.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.payment.content')}
              </p>

              {/* Блок "Сроки" отсутствует в переводах, удален */}

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.rightsObligations.title')}</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('publicOffer.sections.rightsObligations.executorObligations.title')}</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                {toArray(t('publicOffer.sections.rightsObligations.executorObligations.items', { returnObjects: true })).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('publicOffer.sections.rightsObligations.clientObligations.title')}</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {toArray(t('publicOffer.sections.rightsObligations.clientObligations.items', { returnObjects: true })).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Блок "Гарантии" отсутствует в переводах, удален */}

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.liability.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.liability.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.confidentiality.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.confidentiality.content')}
              </p>

              {/* Блок "Интеллектуальная собственность" отсутствует в переводах, удален */}

              {/* Блок "Форс-мажор" отсутствует в переводах, удален */}

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.disputeResolution.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.disputeResolution.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.finalProvisions.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.finalProvisions.content')}
              </p>

              {/* Реквизиты не предусмотрены в переводе оферты; при необходимости можно вывести из privacyPolicy.sections.contactInfo */}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default PublicOffer;