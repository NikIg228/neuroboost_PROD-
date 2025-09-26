import React from 'react';
import { CheckCircle, TrendingUp, Users, DollarSign } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  result: string;
  clientLogo: string;
  icon: React.ComponentType<any>;
  metrics: string;
}

const CasesSection: React.FC = () => {
  const cases: CaseStudy[] = [
    {
      id: '1',
      title: 'Автоматизация интернет-магазина "SharkStore"',
      description: 'Внедрили ChatGPT-консультанта и автоматизацию обработки заявок для крупного интернет-магазина электроники.',
      result: 'Увеличение конверсии на 45% и сокращение времени обработки заявок в 3 раза',
      clientLogo: 'TS',
      icon: TrendingUp,
      metrics: '+45%'
    },
    {
      id: '2',
      title: 'ИИ-рекрутер для компании "QazTech Ventures"',
      description: 'Разработали систему автоматического отбора кандидатов с анализом резюме и предсказанием успешности.',
      result: 'Ускорение процесса найма в 5 раз, точность отбора 92%',
      clientLogo: 'DC',
      icon: Users,
      metrics: '5x'
    },
    {
      id: '3',
      title: 'Прогнозирование продаж для сети "abr+"',
      description: 'Внедрили ИИ-аналитику для прогнозирования спроса и оптимизации закупок в сети ресторанов.',
      result: 'Сокращение излишков товара на 60%, рост прибыли на 35%',
      clientLogo: 'FC',
      icon: DollarSign,
      metrics: '+35%'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 sm:mb-6">
            Наши <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">кейсы</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Реальные результаты наших клиентов после внедрения ИИ-решений
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cases.map((caseStudy) => (
            <div key={caseStudy.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 h-full flex flex-col">
              {/* Header with logo and icon */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  {caseStudy.clientLogo}
                </div>
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <span className="text-xs sm:text-sm font-semibold text-green-600">Успешно</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-900 transition-colors duration-300">
                {caseStudy.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 flex-grow leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {caseStudy.description}
              </p>

              {/* Result */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 border border-blue-100 group-hover:border-blue-200 transition-colors duration-300">
                <div className="flex items-center mb-2 sm:mb-3">
                  <caseStudy.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                  <span className="text-sm sm:text-base font-semibold text-blue-600">Результат:</span>
                </div>
                <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">
                  {caseStudy.result}
                </p>
              </div>

              {/* Metrics highlight */}
              <div className="text-center">
                <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full text-base sm:text-lg shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                  📈 {caseStudy.metrics}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CasesSection;