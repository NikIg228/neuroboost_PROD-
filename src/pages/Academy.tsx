import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Users, Clock, Award, Target, Brain, Code } from 'lucide-react';
import LeadForm from '@/components/common/LeadForm';
import AnimatedSection from '@/components/AnimatedSection';

const Academy: React.FC = () => {
  const { t } = useTranslation('pages');
  const [, setSubmitted] = useState(false);

  const program = t('academy.summary.items', { returnObjects: true }) as string[];

  const modules = t('academy.program.modules', { returnObjects: true }) as Array<{
    title: string;
    duration: string;
    topics: string[];
  }>;

  const outcomes = [
    {
      icon: Brain,
      title: t('academy.outcomes.expertise.title'),
      description: t('academy.outcomes.expertise.description')
    },
    {
      icon: Code,
      title: t('academy.outcomes.skills.title'),
      description: t('academy.outcomes.skills.description')
    },
    {
      icon: Target,
      title: t('academy.outcomes.business.title'),
      description: t('academy.outcomes.business.description')
    },
    {
      icon: Users,
      title: t('academy.outcomes.networking.title'),
      description: t('academy.outcomes.networking.description')
    }
  ];

  const stats = [
    { number: '85%', label: t('academy.stats.0') },
    { number: '500 000₸+', label: t('academy.stats.1') },
    { number: '12', label: t('academy.stats.2') },
    { number: '24/7', label: t('academy.stats.3') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Award className="h-5 w-5 text-yellow-400" />
              <span className='text-white font-medium'>{t('academy.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('academy.title')} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ИИ</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {t('academy.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#apply" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
                {t('academy.buttons.apply')}
              </a>
              <a href="#program" className="inline-block px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                {t('academy.buttons.program')}
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
            <h2 className="text-3xl font-bold text-white text-center mb-8">{t('academy.outcomes.title')}</h2>
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
            <h2 className="text-3xl font-bold text-white text-center mb-8">{t('academy.program.title')}</h2>
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
              <h2 className="text-2xl font-bold text-white mb-4">{t('academy.summary.title')}</h2>
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
                  <strong>{t('academy.summary.format')}</strong> {t('academy.summary.formatValue')}<br/>
                  <strong>{t('academy.summary.duration')}</strong> {t('academy.summary.durationValue')}<br/>
                  <strong>{t('academy.summary.certificate')}</strong> {t('academy.summary.certificateValue')}
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div id="apply" className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">{t('academy.application.title')}</h2>
              <LeadForm onSubmitted={() => setSubmitted(true)} source="Academy" />
            </div>
          </AnimatedSection>
        </section>

        {/* Расширенный FAQ */}
        <AnimatedSection>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('academy.faq.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t('academy.faq.questions', { returnObjects: true }).map((faq: {q: string, a: string}, idx: number) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="font-medium text-white mb-2">{faq.q}</p>
                  <p className="text-sm text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <p className="text-xs text-white/50 mt-8 text-center">
          {t('academy.disclaimer')}
        </p>
      </div>
    </div>
  );
};

export default Academy;