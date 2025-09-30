import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '@/components/AnimatedSection';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation('legal');
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('privacyPolicy.title')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('privacyPolicy.intro')}
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.general.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('privacyPolicy.sections.general.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.purposes.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.purposes.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('privacyPolicy.sections.purposes.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.dataTypes.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.dataTypes.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('privacyPolicy.sections.dataTypes.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.processingMethods.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('privacyPolicy.sections.processingMethods.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.legalBasis.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.legalBasis.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('privacyPolicy.sections.legalBasis.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.retentionPeriod.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('privacyPolicy.sections.retentionPeriod.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.thirdPartyTransfer.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('privacyPolicy.sections.thirdPartyTransfer.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.securityMeasures.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.securityMeasures.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('privacyPolicy.sections.securityMeasures.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.dataSubjectRights.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.dataSubjectRights.intro')}
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                {t('privacyPolicy.sections.dataSubjectRights.items', { returnObjects: true }).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.cookies.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('privacyPolicy.sections.cookies.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.policyChanges.title')}</h2>
              <p className="text-gray-700 mb-6">
                {t('privacyPolicy.sections.policyChanges.content')}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacyPolicy.sections.contactInfo.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.contactInfo.intro')}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700">
                  <strong>{t('privacyPolicy.sections.contactInfo.company')}</strong><br />
                  {t('privacyPolicy.sections.contactInfo.bin')}<br />
                  {t('privacyPolicy.sections.contactInfo.email')}<br />
                  {t('privacyPolicy.sections.contactInfo.phone')}<br />
                  {t('privacyPolicy.sections.contactInfo.address')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default PrivacyPolicy;