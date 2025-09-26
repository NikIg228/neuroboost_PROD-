import React from 'react';
import AnimatedSection from '@/components/AnimatedSection';

const TelegramAgreement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Пользовательское соглашение при взаимодействии с Telegram-ботом проекта «NeuroBoost»
            </h1>
            <p className="text-gray-600 mb-8">
              Редакция от 31 июля 2025 г.
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Настоящее Пользовательское соглашение (далее — «Соглашение») определяет условия использования 
                Telegram-бота проекта «NeuroBoost» (далее — «Бот») физическими и юридическими лицами (далее — «Пользователь»).
              </p>
              
              <p className="text-gray-700 mb-8 font-semibold">
                Факт начала взаимодействия с Ботом означает безоговорочное принятие Пользователем всех условий настоящего Соглашения.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Общие положения</h2>
              <p className="text-gray-700 mb-4">
                <strong>1.1.</strong> Бот является автоматизированным сервисом, созданным для информирования, 
                консультирования и (при необходимости) сбора заявок от Пользователей по услугам/продуктам, 
                предоставляемым NeuroBoost.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>1.2.</strong> Использование Бота осуществляется исключительно в информационных и 
                коммуникационных целях. Бот не заменяет официальную консультацию, договор или оферту.
              </p>
              <p className="text-gray-700 mb-6">
                <strong>1.3.</strong> Все материалы и ответы, предоставленные Ботом, не являются публичной 
                офертой или официальным предложением заключения сделки, если иное прямо не указано.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Права и обязанности сторон</h2>
              <p className="text-gray-700 mb-3">
                <strong>2.1. Пользователь имеет право:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>пользоваться функционалом Бота в пределах, предоставленных проектом;</li>
                <li>прекратить взаимодействие с Ботом в любое время.</li>
              </ul>

              <p className="text-gray-700 mb-3">
                <strong>2.2. Пользователь обязуется:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>не использовать Бота в противоправных или мошеннических целях;</li>
                <li>не осуществлять рассылку спама, вредоносных ссылок или иных действий, нарушающих права проекта или других пользователей.</li>
              </ul>

              <p className="text-gray-700 mb-3">
                <strong>2.3. Владелец Бота вправе:</strong>
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>приостановить или ограничить доступ Пользователя к Боту при выявлении нарушений;</li>
                <li>изменять функционал, содержание и условия взаимодействия с Ботом без предварительного уведомления.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Обработка персональных данных</h2>
              <p className="text-gray-700 mb-3">
                <strong>3.1.</strong> При взаимодействии с Ботом могут собираться следующие данные:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Telegram ID, username, имя и фамилия (если указаны);</li>
                <li>текстовые сообщения, отправленные Боту;</li>
                <li>иные данные, предоставленные Пользователем добровольно.</li>
              </ul>

              <p className="text-gray-700 mb-4">
                <strong>3.2.</strong> Обработка персональных данных осуществляется в соответствии с 
                законодательством Республики Казахстан (или иного применимого юрисдикции) и Политикой 
                конфиденциальности проекта.
              </p>

              <p className="text-gray-700 mb-3">
                <strong>3.3.</strong> Персональные данные используются исключительно для:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>предоставления консультаций и обратной связи;</li>
                <li>статистики и аналитики;</li>
                <li>улучшения качества обслуживания.</li>
              </ul>

              <p className="text-gray-700 mb-6">
                <strong>3.4.</strong> Передача персональных данных третьим лицам не осуществляется, 
                за исключением случаев, предусмотренных законом или при наличии явного согласия Пользователя.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Ограничение ответственности</h2>
              <p className="text-gray-700 mb-3">
                <strong>4.1.</strong> Проект «NeuroBoost» и его представители не несут ответственности:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>за любые убытки, понесённые Пользователем вследствие использования Бота;</li>
                <li>за действия третьих лиц, получивших доступ к данным Пользователя;</li>
                <li>за возможные ошибки или неточности в содержании ответов Бота.</li>
              </ul>

              <p className="text-gray-700 mb-6">
                <strong>4.2.</strong> Пользователь использует Бота на свой страх и риск.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Заключительные положения</h2>
              <p className="text-gray-700 mb-4">
                <strong>5.1.</strong> Настоящее Соглашение может быть изменено в одностороннем порядке 
                без предварительного уведомления. Актуальная редакция всегда доступна по адресу:
                <br />
                <a href="https://gorgeous-creponne-26d474.netlify.app/telegram-agreement" className="text-blue-600 hover:text-blue-800">
                 https://www.neuroboost.kz/telegram-agreement
                </a>
              </p>

              <p className="text-gray-700 mb-4">
                <strong>5.2.</strong> Все возникающие вопросы и споры, связанные с настоящим Соглашением, 
                регулируются действующим законодательством Республики Казахстан.
              </p>

              <p className="text-gray-700 mb-6">
                <strong>5.3.</strong> Для обратной связи и разрешения претензий обращайтесь в Telegram:
                <br />
                <a href="https://t.me/neurboosthelpbot" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                  https://t.me/neurboosthelpbot
                </a>
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                <p className="text-yellow-800 font-semibold">
                  Если вы не согласны с условиями настоящего Соглашения, пожалуйста, прекратите использование Telegram-бота.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TelegramAgreement;
