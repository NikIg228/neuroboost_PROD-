import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Brain, Mail, Phone, MessageCircle, Shield } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

const Footer: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const handleConsultation = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setIsConsultationModalOpen(true);
  };

  const handleLinkClick = (path: string) => {
    // Прокручиваем к верху страницы
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Переходим по ссылке
    navigate(path);
  };

  const paymentSystems = [
    { name: <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width="60" height="auto" />
 },
    { name: <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" width="60" />
 },
  ];

  return (
    <>
      <motion.footer 
        className="bg-gray-900 text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <motion.div 
                className="flex items-center space-x-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                >
                  <Brain className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-xl font-bold">NeuroBoost</span>
              </motion.div>
              <p className="text-gray-400 mb-4 max-w-md">
                Мы помогаем бизнесам внедрять ИИ-решения для автоматизации процессов, 
                увеличения продаж и повышения эффективности работы.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>galuza_nikita@mail.ru</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+7 (707) 506 29 00</span>
                </div>
              </div>
              
              <button
                onClick={handleConsultation}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all mb-4"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Получить консультацию
              </button>
              
              <div className="text-gray-400 text-sm">
                <p className="font-semibold mb-1">ТОО "Ворлд Трейд"</p>
                <p>БИН: 240740019557</p>
                <p>Казахстан, г. Алматы, Турксибский район,</p>
                <p>ул. Дулатова 53, 050003</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleLinkClick('/catalog')} 
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    AI-Аудит бизнеса
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLinkClick('/catalog')} 
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    ChatGPT-консультант
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLinkClick('/catalog')} 
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Автоматизация заявок
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLinkClick('/catalog')} 
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Все услуги
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Юридическая информация</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleLinkClick('/privacy-policy')} 
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Политика конфиденциальности
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLinkClick('/public-offer')} 
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Публичная оферта
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLinkClick('/consent')} 
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Согласие на обработку данных
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleLinkClick('/telegram-agreement')} 
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Пользовательское соглашение Telegram-бота
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Systems Section */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <span className="text-gray-400 text-sm">Принимаем к оплате:</span>
                <div className="flex items-center space-x-4">
                  {paymentSystems.map((system, index) => (
                    <div key={index} className="flex items-center space-x-1 text-gray-400">
                      <span className="text-sm">{system.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">🔒 SSL Secured</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NeuroBoost. Все права защищены.</p>
          </div>
        </div>
      </motion.footer>

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </>
  );
};

export default Footer;