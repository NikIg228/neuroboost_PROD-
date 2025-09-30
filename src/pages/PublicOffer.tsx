import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '@/components/AnimatedSection';

const PublicOffer: React.FC = () => {
  const { t } = useTranslation('legal');
  
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
              <p className="text-gray-700 mb-4">
                {t('publicOffer.sections.subject.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('publicOffer.sections.subject.services', { returnObjects: true }).map((service: string, index: number) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.conclusion.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.conclusion.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.payment.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('publicOffer.sections.payment.intro')}
              </p>
              <p className="text-gray-700 mb-4">
                {t('publicOffer.sections.payment.order')}:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('publicOffer.sections.payment.methods', { returnObjects: true }).map((method: string, index: number) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.timeline.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.timeline.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.obligations.title')}</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('publicOffer.sections.obligations.executor.title')}</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                {t('publicOffer.sections.obligations.executor.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('publicOffer.sections.obligations.client.title')}</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('publicOffer.sections.obligations.client.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.guarantees.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('publicOffer.sections.guarantees.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('publicOffer.sections.guarantees.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.liability.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.liability.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.confidentiality.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.confidentiality.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.intellectual.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.intellectual.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.forceMajeure.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.forceMajeure.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.disputes.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.disputes.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.final.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('publicOffer.sections.final.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('publicOffer.sections.details.title')}</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>{t('publicOffer.sections.details.company')}</strong><br />
                  {t('publicOffer.sections.details.bin')}<br />
                  {t('publicOffer.sections.details.address')}<br />
                  {t('publicOffer.sections.details.phone')}<br />
                  {t('publicOffer.sections.details.email')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default PublicOffer;