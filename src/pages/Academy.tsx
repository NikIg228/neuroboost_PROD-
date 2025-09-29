import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Clock, Award, Target, Brain, Code } from 'lucide-react';
import LeadForm from '@/components/common/LeadForm';
import AnimatedSection from '@/components/AnimatedSection';

const Academy: React.FC = () => {
  const [, setSubmitted] = useState(false);

  const program = [
    'Анализ задач и процессов бизнеса',
    'Выбор моделей: ChatGPT/Claude/Google AI/другое',
    'Промт-инжиниринг и дизайн диалогов',
    'Интеграции: CRM, Telegram, сайт',
    'Учёт расходов API и отчётность',
    'Безопасность, соответствие и юридические основы',
    'Коммерческие предложения и защита решения',
    'Запуск пилота и сопровождение',
  ];

  const modules = [
    {
      title: 'Модуль 1: Основы ИИ и анализ потребностей',
      duration: '1 неделя',
      topics: [
        'Что такое ИИ и как он работает',
        'Различия между моделями GPT, Claude, Gemini',
        'Методология анализа бизнес-процессов',
        'Выявление задач, подходящих для автоматизации',
        'ROI калькуляция внедрения ИИ'
      ]
    },
    {
      title: 'Модуль 2: Промт-инжиниринг и настройка моделей',
      duration: '1.5 недели',
      topics: [
        'Техники написания эффективных промтов',
        'Системные сообщения и контекст',
        'Fine-tuning и кастомизация моделей',
        'A/B тестирование промтов',
        'Оптимизация расхода токенов'
      ]
    },
    {
      title: 'Модуль 3: Техническая интеграция',
      duration: '2 недели',
      topics: [
        'API интеграции (OpenAI, Anthropic, Google)',
        'Подключение к CRM системам',
        'Создание Telegram и WhatsApp ботов',
        'Интеграция с сайтами и лендингами',
        'Мониторинг и логирование'
      ]
    },
    {
      title: 'Модуль 4: Бизнес и продажи',
      duration: '1 неделя',
      topics: [
        'Составление коммерческих предложений',
        'Ценообразование ИИ-услуг',
        'Презентация решений клиентам',
        'Работа с возражениями',
        'Юридические аспекты и договоры'
      ]
    }
  ];

  const outcomes = [
    {
      icon: Brain,
      title: 'Техническая экспертиза',
      description: 'Глубокое понимание работы ИИ-моделей и их применения'
    },
    {
      icon: Code,
      title: 'Практические навыки',
      description: 'Умение создавать и внедрять ИИ-решения с нуля'
    },
    {
      icon: Target,
      title: 'Бизнес-подход',
      description: 'Навыки продаж и позиционирования ИИ-услуг'
    },
    {
      icon: Users,
      title: 'Нетворкинг',
      description: 'Сообщество единомышленников и потенциальных партнёров'
    }
  ];

  const stats = [
    { number: '85%', label: 'выпускников начинают зарабатывать в первый месяц' },
    { number: '500 000₸+', label: 'средний доход через 3 месяца' },
    { number: '12', label: 'реальных проектов в портфолио' },
    { number: '24/7', label: 'поддержка после выпуска' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Award className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">Профессиональное обучение</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Академия интеграторов <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ИИ</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Освойте внедрение ChatGPT/Claude/Google AI/ElevenLabs в реальные бизнес-процессы и начните зарабатывать на проектах и обучении клиентов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#apply" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
                Подать заявку
              </a>
              <a href="#program" className="inline-block px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                Программа обучения
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Статистика */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-center border border-white/20"
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Результаты обучения */}
        <AnimatedSection delay={300}>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Что вы получите</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {outcomes.map((outcome, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 text-center"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <outcome.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{outcome.title}</h3>
                  <p className="text-gray-300 text-sm">{outcome.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Подробная программа */}
        <section id="program" className="mb-12">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white text-center mb-8">Программа обучения</h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map((module, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{module.title}</h3>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Clock className="h-4 w-4" />
                        {module.duration}
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIdx) => (
                      <li key={topicIdx} className="flex items-start gap-2 text-gray-200">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Форма заявки */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <AnimatedSection>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Краткая программа</h2>
              <ul className="space-y-2 text-gray-200">
                {program.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-white/70 text-sm">
                  <strong>Формат:</strong> онлайн-модули + практика на реальных кейсах<br/>
                  <strong>Длительность:</strong> 5-6 недель<br/>
                  <strong>Сертификат:</strong> NeuroBoost (не гос. образца)
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div id="apply" className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Заявка на обучение</h2>
              <LeadForm onSubmitted={() => setSubmitted(true)} source="Academy" />
            </div>
          </AnimatedSection>
        </section>

        {/* Расширенный FAQ */}
        <AnimatedSection>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Частые вопросы</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: 'Сколько длится программа?',
                  a: '5-6 недель интенсивного обучения с гибким графиком. Можете совмещать с основной работой.'
                },
                {
                  q: 'Нужны ли навыки программирования?',
                  a: 'Базовое понимание API желательно, но мы обучаем с нуля. Главное — мотивация и желание учиться.'
                },
                {
                  q: 'Будет ли поддержка после выпуска?',
                  a: 'Да! Доступ к сообществу выпускников, ежемесячные вебинары и приоритетная техподдержка.'
                },
                {
                  q: 'Сколько можно зарабатывать?',
                  a: 'Наши выпускники зарабатывают от ₸100k в первый месяц до ₸500k+ через полгода.'
                },
                {
                  q: 'Предоставляете ли трудоустройство?',
                  a: 'Помогаем с поиском первых клиентов и можем предложить сотрудничество с NeuroBoost.'
                },
                {
                  q: 'Можно ли оплатить в рассрочку?',
                  a: 'Да, доступна рассрочка на 3-6 месяцев без переплат для резидентов Казахстана.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="font-medium text-white mb-2">{faq.q}</p>
                  <p className="text-sm text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <p className="text-xs text-white/50 mt-8 text-center">
          Сертификат NeuroBoost не является документом государственного образца.
        </p>
      </div>
    </div>
  );
};

export default Academy;