import React, { useState } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { Users, Target, Award, Globe, TrendingUp, Shield, Clock, Lightbulb, X, Send, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    }, 3000);
  };

  const values = [
    {
      icon: Target,
      title: 'Результативность',
      description: 'Каждое решение направлено на достижение конкретных бизнес-целей'
    },
    {
      icon: Shield,
      title: 'Надежность',
      description: 'Гарантируем безопасность данных и стабильную работу систем'
    },
    {
      icon: Lightbulb,
      title: 'Инновации',
      description: 'Используем самые передовые технологии ИИ и машинного обучения'
    },
    {
      icon: Users,
      title: 'Партнерство',
      description: 'Мы не просто исполнители, а долгосрочные партнеры в развитии'
    }
  ];

  const team = [
    {
      name: 'Абылай Кенжебек', 
      position: 'CEO & AI Architect',
      experience: '8+ лет в ИИ',
      description: 'Эксперт по машинному обучению и нейросетям'
    },
    {
      name: 'Мария Шмидт',
      position: 'CTO',
      experience: '6+ лет в разработке',
      description: 'Специалист по внедрению корпоративных ИИ-решений'
    },
    {
      name: 'Никита Шевченко',
      position: 'Lead Data Scientist',
      experience: '7+ лет в Data Science',
      description: 'Эксперт по анализу данных и прогнозированию'
    },
    {
      name: 'Георгий Лобанов',
      position: 'Head of Business Development',
      experience: '5+ лет в консалтинге',
      description: 'Специалист по бизнес-процессам и автоматизации'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              О компании <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NeuroBoost</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Мы — команда экспертов по искусственному интеллекту, которая помогает бизнесам 
              использовать возможности ИИ для решения реальных задач и достижения конкретных результатов.
            </p>
          </div>
        </AnimatedSection>

        {/* Mission Section */}
        <AnimatedSection delay={200}>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша миссия</h2>
                <p className="text-gray-600 mb-6">
                  Сделать искусственный интеллект доступным и полезным для каждого бизнеса. 
                  Мы верим, что ИИ должен решать реальные проблемы и приносить измеримую пользу.
                </p>
                <p className="text-gray-600">
                  Наша цель — не просто внедрить технологии, а создать устойчивое конкурентное 
                  преимущество для наших клиентов через умную автоматизацию и оптимизацию процессов.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">20+</div>
                    <div className="text-gray-600">стран</div>
                  </div>
                  <div className="text-center">
                    <Award className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">100+</div>
                    <div className="text-gray-600">проектов</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">200%</div>
                    <div className="text-gray-600">рост эффективности</div>
                  </div>
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">от 5</div>
                    <div className="text-gray-600">дней внедрения</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Values Section */}
        <AnimatedSection delay={300}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Наши ценности
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection delay={400}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Наша команда
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <p className="text-sm text-gray-500 mb-3">{member.experience}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Approach Section */}
        <AnimatedSection delay={500}>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Наш подход
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Анализ и аудит</h3>
                <p className="text-gray-600">
                  Глубокое изучение ваших бизнес-процессов и выявление точек роста
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Разработка решения</h3>
                <p className="text-gray-600">
                  Создание индивидуального ИИ-решения под ваши специфические задачи
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Внедрение и поддержка</h3>
                <p className="text-gray-600">
                  Быстрое внедрение с обучением команды и долгосрочной поддержкой
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection delay={600}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Готовы работать с лучшими?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Присоединяйтесь к сотням компаний, которые уже используют силу ИИ для развития своего бизнеса
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Начать сотрудничество
            </button>
          </div>
        </AnimatedSection>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Начать сотрудничество</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Заявка отправлена!
                  </h4>
                  <p className="text-gray-600">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+7 (777) 123-45-67"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Компания
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Название компании"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Расскажите о вашем проекте или задачах..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;