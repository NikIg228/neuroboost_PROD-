import React, { useState } from 'react';
import { Calculator, DollarSign, Zap, TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CurrencyToggle from '@/components/common/CurrencyToggle';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useTranslation } from 'react-i18next';

interface AIProvider {
  id: string;
  name: string;
  inputPricePerToken: number; // в USD за 1000 токенов
  outputPricePerToken: number;
  logo: string;
  description: string;
}

const providers: AIProvider[] = [
  {
    id: 'openai-gpt4',
    name: 'calculator:providers.openai-gpt4.name',
    inputPricePerToken: 0.01,
    outputPricePerToken: 0.03,
    logo: '/logo%20dlya%20nb/openai-logo.svg',
    description: 'calculator:providers.openai-gpt4.description'
  },
  {
    id: 'openai-gpt3.5',
    name: 'calculator:providers.openai-gpt3.5.name',
    inputPricePerToken: 0.0005,
    outputPricePerToken: 0.0015,
    logo: '/logo%20dlya%20nb/openai-logo.svg',
    description: 'calculator:providers.openai-gpt3.5.description'
  },
  {
    id: 'anthropic-claude',
    name: 'calculator:providers.anthropic-claude.name',
    inputPricePerToken: 0.015,
    outputPricePerToken: 0.075,
    logo: '/logo%20dlya%20nb/anthropic-logo.svg',
    description: 'calculator:providers.anthropic-claude.description'
  },
  {
    id: 'google-gemini',
    name: 'calculator:providers.google-gemini.name',
    inputPricePerToken: 0.0005,
    outputPricePerToken: 0.0015,
    logo: '/logo%20dlya%20nb/google-gemini.svg',
    description: 'calculator:providers.google-gemini.description'
  },
  {
    id: 'mistral-large',
    name: 'calculator:providers.mistral-large.name',
    inputPricePerToken: 0.008,
    outputPricePerToken: 0.024,
    logo: '/logo%20dlya%20nb/mistral-ai.svg',
    description: 'calculator:providers.mistral-large.description'
  }
];

interface UsageScenario {
  id: string;
  title: string;
  description: string;
  inputTokens: number;
  outputTokens: number;
  requestsPerMonth: number;
  relatedService: string;
}

const usageScenarios: UsageScenario[] = [
  {
    id: 'chatbot-consultant',
    title: 'ИИ-консультант для сайта',
    description: 'Автоматизация консультаций клиентов на сайте компании',
    inputTokens: 800,
    outputTokens: 400,
    requestsPerMonth: 500,
    relatedService: 'Консультант на базе ChatGPT'
  },
  {
    id: 'content-generation',
    title: 'Генерация контента',
    description: 'Создание постов для соцсетей, описаний товаров',
    inputTokens: 600,
    outputTokens: 1200,
    requestsPerMonth: 200,
    relatedService: 'Генератор контента'
  },
  {
    id: 'email-automation',
    title: 'Email-маркетинг автоматизация',
    description: 'Персонализированные письма и автоответчики',
    inputTokens: 500,
    outputTokens: 800,
    requestsPerMonth: 1000,
    relatedService: 'Email-маркетинг ИИ'
  },
  {
    id: 'document-analysis',
    title: 'Анализ документов',
    description: 'Обработка договоров, резюме, технических документов',
    inputTokens: 2000,
    outputTokens: 600,
    requestsPerMonth: 150,
    relatedService: 'Анализатор документов ИИ'
  },
  {
    id: 'voice-assistant',
    title: 'Голосовой помощник',
    description: 'Voice-to-text + ИИ ответы + Text-to-speech',
    inputTokens: 400,
    outputTokens: 300,
    requestsPerMonth: 800,
    relatedService: 'Голосовой помощник'
  },
  {
    id: 'crm-integration',
    title: 'CRM интеграция',
    description: 'Автоматическая обработка лидов и клиентской базы',
    inputTokens: 700,
    outputTokens: 500,
    requestsPerMonth: 300,
    relatedService: 'CRM интеграция с ИИ'
  }
];

const TokenCalculator: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(providers[0]);
  const [inputTokens, setInputTokens] = useState<number>(1000);
  const [outputTokens, setOutputTokens] = useState<number>(500);
  const [requestsPerMonth, setRequestsPerMonth] = useState<number>(100);
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const { formatPrice, currency } = useCurrency();
  const { t } = useTranslation('calculator');

  // Курсы валют для конвертации из USD
  const getUsdRate = () => {
    switch (currency) {
      case 'KZT': return 475;
      case 'RUB': return 73;
      case 'USD': return 1;
      default: return 475;
    }
  };

  const calculateCosts = () => {
    const inputCostUSD = (inputTokens / 1000) * selectedProvider.inputPricePerToken;
    const outputCostUSD = (outputTokens / 1000) * selectedProvider.outputPricePerToken;
    const costPerRequestUSD = inputCostUSD + outputCostUSD;
    const monthlyRequestsCostUSD = costPerRequestUSD * requestsPerMonth;
    
    const rate = getUsdRate();
    const costPerRequestLocal = costPerRequestUSD * rate;
    const monthlyRequestsCostLocal = monthlyRequestsCostUSD * rate;
    
    return {
      costPerRequestUSD,
      costPerRequestLocal,
      monthlyRequestsCostUSD,
      monthlyRequestsCostLocal,
      inputCostUSD,
      outputCostUSD
    };
  };

  const costs = calculateCosts();

  const applyScenario = (scenarioId: string) => {
    const scenario = usageScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setInputTokens(scenario.inputTokens);
      setOutputTokens(scenario.outputTokens);
      setRequestsPerMonth(scenario.requestsPerMonth);
      setSelectedScenario(scenarioId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <Calculator className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">{t('subtitle')}</span>
              </div>
              <CurrencyToggle />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{t('gradient')}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>
        </AnimatedSection>

        {/* Сценарии использования */}
        <AnimatedSection delay={100}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">{t('scenarios.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {usageScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => applyScenario(scenario.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedScenario === scenario.id
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <h3 className="text-white font-medium mb-2">{t(`scenarios.${scenario.id}.title`)}</h3>
                  <p className="text-gray-300 text-sm mb-3">{t(`scenarios.${scenario.id}.description`)}</p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>{t('scenarios.labels.requests', { count: scenario.requestsPerMonth })}</div>
                    <div>{t('scenarios.labels.tokens', { in: scenario.inputTokens, out: scenario.outputTokens })}</div>
                    <div className="text-blue-300">{t('scenarios.labels.related', { service: t(`scenarios.${scenario.id}.relatedService`) })}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Выбор провайдера */}
          <AnimatedSection delay={200}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                {t('providers.title')}
              </h2>
              <div className="space-y-3">
                {providers.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider)}
                    className={`w-full p-4 rounded-xl border transition-all ${
                      selectedProvider.id === provider.id
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={provider.logo} alt={t(provider.name)} className="h-8 w-8 object-contain" />
                      <div className="text-left">
                        <div className="text-white font-medium">{t(provider.name)}</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2 text-left">{t(provider.description)}</p>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Настройки */}
          <AnimatedSection delay={300}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                {t('parameters.title')}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">{t('parameters.inputTokens')}</label>
                  <input
                    type="number"
                    value={inputTokens}
                    onChange={(e) => setInputTokens(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    min="1"
                  />
                  <p className="text-gray-400 text-xs mt-1">{t('parameters.wordsHint', { count: Math.round(inputTokens / 4) })}</p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">{t('parameters.outputTokens')}</label>
                  <input
                    type="number"
                    value={outputTokens}
                    onChange={(e) => setOutputTokens(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    min="1"
                  />
                  <p className="text-gray-400 text-xs mt-1">{t('parameters.wordsHint', { count: Math.round(outputTokens / 4) })}</p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">{t('parameters.requestsPerMonth')}</label>
                  <input
                    type="number"
                    value={requestsPerMonth}
                    onChange={(e) => setRequestsPerMonth(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    min="1"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-white font-medium mb-2">{t('providerRates.title', { name: t(selectedProvider.name) })}</div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>{t('providerRates.input', { price: selectedProvider.inputPricePerToken })}</div>
                  <div>{t('providerRates.output', { price: selectedProvider.outputPricePerToken })}</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Результаты */}
          <AnimatedSection delay={400}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                {t('results.title')}
              </h2>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-medium mb-2">{t('results.costPerRequest')}</div>
                  <div className="text-2xl font-bold text-green-400">
                    {formatPrice(costs.costPerRequestLocal)}
                  </div>
                  <div className="text-gray-300 text-xs">
                    {t('results.approxUSD', { price: costs.costPerRequestUSD.toFixed(4) })}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-400/30">
                  <div className="text-white font-medium mb-2">{t('results.monthlyExpenses')}</div>
                  <div className="text-3xl font-bold text-blue-300">
                    {formatPrice(costs.monthlyRequestsCostLocal)}
                  </div>
                  <div className="text-gray-200 text-xs">
                    {t('results.approxUSD', { price: costs.monthlyRequestsCostUSD.toFixed(2) })}
                  </div>
                </div>

                <div className="text-xs text-gray-400 space-y-1">
                  <div>{t('results.inputTokensUSD', { price: costs.inputCostUSD.toFixed(4) })}</div>
                  <div>{t('results.outputTokensUSD', { price: costs.outputCostUSD.toFixed(4) })}</div>
                  <div>{t('results.usdRate', { currency, rate: getUsdRate() })}</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30">
                <p className="text-yellow-200 text-sm">
                  💡 {t('results.note')}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Скрин: OpenRouter пример работы и пояснение */}
        <AnimatedSection delay={450}>
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">{t('openRouter.title')}</h2>
            <p className="text-gray-300 text-sm max-w-4xl mx-auto mb-6 text-center">
              {t('openRouter.description')}
            </p>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
              <img
                src="/screen/OpenRouter.png"
                alt="Пример диалога и биллинга токенов в OpenRouter"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Дополнительная информация */}
        <AnimatedSection delay={500}>
          <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">{t('optimization.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{t('optimization.analytics.title')}</h3>
                <p className="text-gray-300 text-sm">{t('optimization.analytics.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{t('optimization.optimization.title')}</h3>
                <p className="text-gray-300 text-sm">{t('optimization.optimization.description')}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{t('optimization.economy.title')}</h3>
                <p className="text-gray-300 text-sm">{t('optimization.economy.description')}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TokenCalculator;


