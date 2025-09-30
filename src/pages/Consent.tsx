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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.subject.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.subject.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.categories.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('consent.sections.categories.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('consent.sections.categories.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.purposes.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('consent.sections.purposes.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('consent.sections.purposes.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.methods.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('consent.sections.methods.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('consent.sections.methods.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.timeline.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.timeline.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.transfer.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.transfer.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.withoutConsent.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.withoutConsent.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.protection.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('consent.sections.protection.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('consent.sections.protection.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.rights.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('consent.sections.rights.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('consent.sections.rights.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.transborder.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.transborder.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.infoConsent.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.infoConsent.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('consent.sections.confirmation.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('consent.sections.confirmation.content')}
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  {t('consent.contact.title')}
                </h3>
                <div className="text-blue-800">
                  <p><strong>{t('consent.contact.company')}</strong></p>
                  <p>{t('consent.contact.bin')}</p>
                  <p>{t('consent.contact.email')}</p>
                  <p>{t('consent.contact.phone')}</p>
                  <p>{t('consent.contact.address')}</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
                <p className="text-yellow-800">
                  <strong>{t('consent.important.title')}:</strong> {t('consent.important.content')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Consent;