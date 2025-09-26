import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'galuza_nikita@mail.ru',
      description: 'Ответим в течение 30 минут'
    },
    {
      icon: Phone,
      title: 'Телефон',
      content: '+7 (707) 506 29 00',
      description: 'Звоните с 9:00 до 18:00'
    },
    {
      icon: MapPin,
      title: 'Офис',
      content: 'Алматы, ул. Дулатова 53',
      description: 'Турксибский район, 050003'
    },
    {
      icon: Clock,
      title: 'Режим работы',
      content: 'Пн-Пт: 9:00 - 18:00',
      description: 'Сб-Вс: по договоренности'
    }
  ];

  const services = [
    'AI-Аудит бизнеса',
    'ChatGPT-консультант',
    'Автоматизация заявок',
    'Генератор текстов',
    'Холодные рассылки ИИ',
    'Речевая аналитика',
    'Управление репутацией',
    'Прогнозирование продаж',
    'Контент для соцсетей',
    'Боты для мессенджеров',
    'ИИ-рекрутер',
    'Обработка документов',
    'CRM-помощник',
    'ИИ для бухгалтерии',
    'Генерация изображений',
    'Анализ конкурентов',
    'VoiceBot',
    'ИИ для курсов',
    'Custom GPT',
    'AI-трансформация'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Свяжитесь <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">с нами</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Готовы обсудить ваш проект? Оставьте заявку, и мы свяжемся с вами в течение 30 минут
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection direction="left">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Получить консультацию
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Заявка отправлена!
                  </h3>
                  <p className="text-gray-600">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Интересующая услуга
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Выберите услугу</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
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
          </AnimatedSection>

          {/* Contact Information */}
          <AnimatedSection direction="right">
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3 mr-4">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Почему выбирают нас</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">30 мин</div>
                    <div className="text-blue-100 text-sm">время отклика</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">95%</div>
                    <div className="text-blue-100 text-sm">довольных клиентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">100+</div>
                    <div className="text-blue-100 text-sm">успешных проектов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">24/7</div>
                    <div className="text-blue-100 text-sm">техподдержка</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* FAQ Section */}
        <AnimatedSection delay={400}>
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Часто задаваемые вопросы
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Сколько времени занимает внедрение?
                </h3>
                <p className="text-gray-600">
                  В зависимости от сложности проекта — от 5 дней до 2 месяцев. 
                  Простые решения можем запустить за неделю.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Предоставляете ли вы техподдержку?
                </h3>
                <p className="text-gray-600">
                  Да, все наши клиенты получают техподдержку 24/7 и регулярные 
                  обновления системы.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Можно ли попробовать решение перед покупкой?
                </h3>
                <p className="text-gray-600">
                  Мы предлагаем демо-версии и пилотные проекты, чтобы вы могли 
                  оценить эффективность решения.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Работаете ли с малым бизнесом?
                </h3>
                <p className="text-gray-600">
                  Да, у нас есть решения для компаний любого размера — от стартапов 
                  до крупных корпораций.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;