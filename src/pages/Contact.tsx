import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '@/components/AnimatedSection';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation('pages');
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

  const contactInfo = t('contact.info', { returnObjects: true }) as Array<{
    title: string;
    content: string;
    description: string;
    icon?: string; // icon name from translations
  }>;

  const services = t('contact.services', { returnObjects: true }) as string[];
  const faqQuestions = t('contact.faq.questions', { returnObjects: true }) as Array<{ q: string; a: string }>;

  const iconMap: Record<string, React.ElementType> = {
    mail: Mail,
    email: Mail,
    phone: Phone,
    telephone: Phone,
    map: MapPin,
    address: MapPin,
    location: MapPin,
    clock: Clock,
    time: Clock
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('contact.title')} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('contact.gradient')}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection direction="left">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('contact.form.title')}
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('contact.form.success.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('contact.form.success.message')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.fields.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={t('contact.form.placeholders.name')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.fields.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={t('contact.form.placeholders.email')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.fields.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={t('contact.form.placeholders.phone')}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.fields.company')}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={t('contact.form.placeholders.company')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.service')}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">{t('contact.form.placeholders.service')}</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder={t('contact.form.placeholders.message')}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {t('contact.form.submit')}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Contact Information */}
          <AnimatedSection direction="right">
            <div className="space-y-8">
              {contactInfo
                // Показываем только Email (скрываем Телефон, Офис и Режим работы для всех языков)
                .filter((info) => {
                  const title = (info.title || '').toLowerCase();
                  return title.includes('email');
                })
                .map((info, index) => {
                const Icon = iconMap[info.icon || ''] || Mail;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3 mr-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h3>
                        <p className="text-blue-600 font-medium mb-1">
                          {String(info.title).toLowerCase().includes('email') ? (
                            <a href={`mailto:${info.content}`} className="hover:underline">{info.content}</a>
                          ) : (
                            info.content
                          )}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Социальные сети: оформлены как карточки, аналогично Email/Телефон */}
              <div className="space-y-6">
                {/* Telegram */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-white fill-current"><path d="M9.964 15.568l-.383 4.03c.547 0 .784-.235 1.067-.517l2.561-2.464 5.306 3.883c.972.536 1.665.254 1.926-.9l3.49-16.36c.308-1.43-.548-1.99-1.486-1.64L1.64 9.31c-1.41.546-1.389 1.33-.24 1.69l4.93 1.54 11.45-7.21c.539-.326 1.03-.146.626.18"/></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('contact.social.telegram.title')}</h3>
                      <p className="font-medium mb-1">
                        <a href="https://t.me/neurboosthelpbot" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700">{t('contact.social.telegram.linkText')}</a>
                      </p>
                      <p className="text-gray-600 text-sm">{t('contact.social.telegram.subtitle')}</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-white fill-current"><path d="M20.52 3.48A11.89 11.89 0 0012.06 0C5.46 0 .1 5.36.1 11.96c0 2.11.56 4.16 1.62 5.98L0 24l6.22-1.63a12 12 0 005.84 1.48h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.21-3.51-8.41zM12.07 22a9.93 9.93 0 01-5.06-1.39l-.36-.21-3.69.97.99-3.6-.24-.37a9.95 9.95 0 01-1.56-5.44c0-5.5 4.47-9.97 9.98-9.97 2.66 0 5.17 1.04 7.06 2.94a9.93 9.93 0 012.93 7.05C21.12 17.53 16.64 22 12.07 22zm5.64-7.47c-.31-.16-1.83-.9-2.11-1.01-.28-.1-.48-.16-.67.17-.2.31-.76 1-.93 1.21-.17.2-.34.22-.65.06-.31-.15-1.29-.48-2.45-1.53-.9-.8-1.5-1.79-1.68-2.09-.17-.31-.02-.47.13-.63.13-.13.31-.34.45-.51.14-.17.19-.29.29-.48.1-.2.05-.37-.02-.52-.06-.16-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.08-.79.37-.27.29-1.04 1.01-1.04 2.46 0 1.45 1.07 2.85 1.22 3.04.15.2 2.11 3.23 5.11 4.52.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.83-.74 2.09-1.47.26-.73.26-1.35.18-1.48-.08-.14-.28-.22-.59-.38z"/></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('contact.social.whatsapp.title')}</h3>
                      <p className="font-medium mb-1">
                        <a href="https://wa.me/77075062900?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9C%D0%BD%D0%B5%20%D0%BD%D1%83%D0%B6%D0%BD%D0%B0%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F!" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">{t('contact.social.whatsapp.linkText')}</a>
                      </p>
                      <p className="text-gray-600 text-sm">{t('contact.social.whatsapp.subtitle')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Блок прямых контактов удалён во избежание дубликатов; используйте переводные данные выше */}

              {/* Блок быстрых метрик удалён по запросу */}
            </div>
          </AnimatedSection>
        </div>

        {/* FAQ Section */}
        <AnimatedSection delay={400}>
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {t('contact.faq.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqQuestions.map((faq: {q: string, a: string}, idx: number) => (
                <div key={idx}>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;