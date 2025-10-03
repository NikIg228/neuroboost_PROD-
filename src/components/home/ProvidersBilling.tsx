import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wallet, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const providers = [
  { name: 'OpenAI (ChatGPT)', logoAlt: 'OpenAI', src: '/logo dlya nb/openai-logo.svg' },
  { name: 'Anthropic (Claude)', logoAlt: 'Anthropic', src: '/logo dlya nb/anthropic-logo.svg' },
  { name: 'Google Gemini', logoAlt: 'Google Gemini', src: '/logo dlya nb/google-gemini.svg' },
  { name: 'Mistral AI', logoAlt: 'Mistral AI', src: '/logo dlya nb/mistral-ai.svg' },
  { name: 'ElevenLabs', logoAlt: 'ElevenLabs', src: '/logo dlya nb/elevenlabs-logo.svg' },
  { name: 'Perplexity AI', logoAlt: 'Perplexity AI', src: '/logo dlya nb/perplexity-ai.svg' },
  { name: 'Jasper AI', logoAlt: 'Jasper AI', src: '/logo dlya nb/jasper-ai.svg' },
  { name: 'Manus AI', logoAlt: 'Manus AI', src: '/logo dlya nb/manus-ai.svg' },
];

const ProvidersBilling: React.FC = () => {
  const { t } = useTranslation('home');
  
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-pink-400/10 to-orange-400/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent py-2 overflow-visible">
                {t('integrations.title')}
              </h2>
              <p className="text-lg sm:text-xl text-blue-200">
                {t('integrations.subtitle')}
              </p>
            </motion.div>

			{/* Бегущая дорожка логотипов (marquee) — одна лента */}
			<div className="relative mt-4 bg-white rounded-xl overflow-hidden py-4">
              {/* Градиентные маски по краям */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

				{/* Лента - движется влево */}
				<div className="overflow-hidden py-2">
					<div className="flex items-center gap-12 sm:gap-16 whitespace-nowrap animate-marquee-left">
						{[...providers, ...providers, ...providers].map((p, idx) => (
							<div key={`row-${p.name}-${idx}`} className="flex items-center shrink-0">
								<img
									src={p.src}
									alt={p.logoAlt}
									className="h-8 sm:h-10 md:h-12 w-auto max-w-[160px] object-contain filter drop-shadow-sm"
									loading="lazy"
								/>
							</div>
						))}
					</div>
				</div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              {t('integrations.note')}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
                aria-label={t('integrations.buttons.integrations')}
              >
                {t('integrations.buttons.integrations')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/token-calculator"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                aria-label={t('integrations.buttons.calculator')}
              >
                {t('integrations.buttons.calculator')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">{t('transparency.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{t('transparency.sections.payment_from_you.title')}</p>
                  <p className="text-gray-300 text-sm">{t('transparency.sections.payment_from_you.description')}</p>
                  <p className="text-green-200 text-xs mt-1">{t('transparency.sections.payment_from_you.note')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{t('transparency.sections.payment_to_providers.title')}</p>
                  <p className="text-gray-300 text-sm">{t('transparency.sections.payment_to_providers.description')}</p>
                  <p className="text-blue-200 text-xs mt-1">{t('transparency.sections.payment_to_providers.note')}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-4 border border-yellow-400/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <p className="text-yellow-100 font-medium text-sm">{t('transparency.sections.how_it_works.title')}</p>
                </div>
                <ul className="text-gray-200 text-xs space-y-1">
                  <li>• {t('transparency.sections.how_it_works.points.0', 'Вы оплачиваете фактическое использование API провайдеров')}</li>
                  <li>• {t('transparency.sections.how_it_works.points.1', 'Мы оптимизируем запросы и следим за расходами')}</li>
                  <li>• {t('transparency.sections.how_it_works.points.2', 'Прозрачная передача стоимости без наценок на API')}</li>
                  <li>• {t('transparency.sections.how_it_works.points.3', 'Детальная отчётность по каждому запросу и расходу')}</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-gray-200 text-sm">
                  <strong>{t('transparency.sections.accounting.title')}:</strong> {t('transparency.sections.accounting.description')}
                </p>
              </div>
            </div>

                  <div className="mt-6">
                    <div className="grid grid-cols-3 items-center text-center mb-4">
                      <div className="text-white text-sm font-medium">{t('transparency.sections.flow.you')}</div>
                      <div className="text-white/70 text-xs">⇄ NeuroBoost ⇄</div>
                      <div className="text-white text-sm font-medium">{t('transparency.sections.flow.api_providers')}</div>
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-3 py-1 text-xs text-green-200">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        {t('transparency.sections.flow.full_transparency')}
                      </span>
                    </div>
                  </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProvidersBilling;


