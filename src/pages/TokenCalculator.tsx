import React, { useState } from 'react';
import { Calculator, DollarSign, Zap, TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CurrencyToggle from '@/components/common/CurrencyToggle';
import { useCurrency } from '@/contexts/CurrencyContext';

interface AIProvider {
  id: string;
  name: string;
  model: string;
  inputPricePerToken: number; // в USD за 1000 токенов
  outputPricePerToken: number;
  logo: string;
  description: string;
}

const providers: AIProvider[] = [
  {
    id: 'openai-gpt4',
    name: 'OpenAI GPT-4',
    model: 'gpt-4-turbo',
    inputPricePerToken: 0.01,
    outputPricePerToken: 0.03,
    logo: '/logo dlya nb/openai-logo.svg',
    description: 'Наиболее продвинутая модель для сложных задач'
  },
  {
    id: 'openai-gpt3.5',
    name: 'OpenAI GPT-3.5',
    model: 'gpt-3.5-turbo',
    inputPricePerToken: 0.0005,
    outputPricePerToken: 0.0015,
    logo: '/logo dlya nb/openai-logo.svg',
    description: 'Быстрая и экономичная модель для базовых задач'
  },
  {
    id: 'anthropic-claude',
    name: 'Anthropic Claude',
    model: 'claude-3-opus',
    inputPricePerToken: 0.015,
    outputPricePerToken: 0.075,
    logo: '/logo dlya nb/anthropic-logo.svg',
    description: 'Отличная модель для анализа и длинных текстов'
  },
  {
    id: 'google-gemini',
    name: 'Google Gemini Pro',
    model: 'gemini-pro',
    inputPricePerToken: 0.0005,
    outputPricePerToken: 0.0015,
    logo: '/logo dlya nb/google-gemini.svg',
    description: 'Мультимодальная модель с поддержкой изображений'
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    model: 'mistral-large',
    inputPricePerToken: 0.008,
    outputPricePerToken: 0.024,
    logo: '/logo dlya nb/mistral-ai.svg',
    description: 'Европейская модель с фокусом на точность'
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
                <span className="text-white font-medium">Калькулятор токенов</span>
              </div>
              <CurrencyToggle />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Расчёт потребления <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">токенов ИИ</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Рассчитайте стоимость использования различных ИИ-моделей для вашего проекта
            </p>
          </div>
        </AnimatedSection>

        {/* Сценарии использования */}
        <AnimatedSection delay={100}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Готовые сценарии использования</h2>
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
                  <h3 className="text-white font-medium mb-2">{scenario.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{scenario.description}</p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Запросов: {scenario.requestsPerMonth}/мес</div>
                    <div>Токены: {scenario.inputTokens} вх / {scenario.outputTokens} исх</div>
                    <div className="text-blue-300">Связано: {scenario.relatedService}</div>
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
                Выберите ИИ-модель
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
                      <img src={provider.logo} alt={provider.name} className="h-8 w-8 object-contain" />
                      <div className="text-left">
                        <div className="text-white font-medium">{provider.name}</div>
                        <div className="text-gray-300 text-sm">{provider.model}</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-2 text-left">{provider.description}</p>
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
                Параметры использования
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Входящие токены (промт)</label>
                  <input
                    type="number"
                    value={inputTokens}
                    onChange={(e) => setInputTokens(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    min="1"
                  />
                  <p className="text-gray-400 text-xs mt-1">Примерно {Math.round(inputTokens / 4)} слов</p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Исходящие токены (ответ)</label>
                  <input
                    type="number"
                    value={outputTokens}
                    onChange={(e) => setOutputTokens(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
                    min="1"
                  />
                  <p className="text-gray-400 text-xs mt-1">Примерно {Math.round(outputTokens / 4)} слов</p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Запросов в месяц</label>
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
                <div className="text-white font-medium mb-2">Текущие тарифы ({selectedProvider.name})</div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Входящие: ${selectedProvider.inputPricePerToken}/1K токенов</div>
                  <div>Исходящие: ${selectedProvider.outputPricePerToken}/1K токенов</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Результаты */}
          <AnimatedSection delay={400}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Расчёт стоимости
              </h2>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-white font-medium mb-2">Стоимость 1 запроса</div>
                  <div className="text-2xl font-bold text-green-400">
                    {formatPrice(costs.costPerRequestLocal)}
                  </div>
                  <div className="text-gray-300 text-xs">
                    ≈ ${costs.costPerRequestUSD.toFixed(4)} USD
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-400/30">
                  <div className="text-white font-medium mb-2">Ежемесячные расходы</div>
                  <div className="text-3xl font-bold text-blue-300">
                    {formatPrice(costs.monthlyRequestsCostLocal)}
                  </div>
                  <div className="text-gray-200 text-xs">
                    ≈ ${costs.monthlyRequestsCostUSD.toFixed(2)} USD
                  </div>
                </div>

                <div className="text-xs text-gray-400 space-y-1">
                  <div>Входящие токены: ${costs.inputCostUSD.toFixed(4)} USD</div>
                  <div>Исходящие токены: ${costs.outputCostUSD.toFixed(4)} USD</div>
                  <div>Курс USD/{currency}: {getUsdRate()}</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-400/30">
                <p className="text-yellow-200 text-sm">
                  💡 Цены могут изменяться. Указанные тарифы актуальны на момент создания калькулятора.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Дополнительная информация */}
        <AnimatedSection delay={500}>
          <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Как мы помогаем оптимизировать расходы</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Аналитика</h3>
                <p className="text-gray-300 text-sm">Отслеживаем расход токенов и предоставляем детальную аналитику</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Оптимизация</h3>
                <p className="text-gray-300 text-sm">Помогаем выбрать оптимальную модель для ваших задач</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Экономия</h3>
                <p className="text-gray-300 text-sm">Снижаем затраты до 40% благодаря умной маршрутизации запросов</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TokenCalculator;
