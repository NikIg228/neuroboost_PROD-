import React, { useState } from 'react';

const PartnersSection: React.FC = () => {
  const [partners, setPartners] = useState([
    { name: 'Air Astana', logo: '/partners/air-astana-logo-brandlogos.net_r1iucuymj.svg' },
    { name: 'Beeline', logo: '/partners/beeline-logo-brandlogos.net_t37xqisxx.svg' },
    { name: 'Samruk-Kazyna', logo: '/partners/samruk-kazyna-logo-brandlogos.net_5x8tj711h.svg' },
    { name: 'Tele2', logo: '/partners/tele2-logo-brandlogos.net_zvtmj1gbg.svg' },
    { name: 'NBK', logo: '/partners/NBK_Logo.svg' },
    { name: 'Kaspi.kz', logo: '/partners/Kaspi.kz-Logo-Vector.svg-.png' },
    { name: 'abr+', logo: '/partners/Abr_idj4gFuaxU_1.svg' },
    { name: 'KFC', logo: '/partners/KFC_logo.svg' },
    { name: 'Starbucks', logo: '/partners/Starbucks_Corporation_Logo_2011.svg' },
    { name: 'Sulpak', logo: '/partners/Sulpak_Logo.svg' },
    { name: 'Xiaomi', logo: '/partners/Xiaomi_logo_(2021-).svg' }
  ]);

  const enlargedLogos = new Set(['KFC', 'Starbucks']);

  // Логотипы загружены, используем их напрямую

  // Создаем двойной массив для бесшовного зацикливания
  const doublePartners = [...partners, ...partners];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-6">
            Нам <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">доверяют</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Ведущие компании выбирают наши ИИ-решения
          </p>
        </div>

        {/* Бегущая строка с логотипами */}
        <div className="relative overflow-hidden">
          {/* Градиентные края для плавного исчезновения */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white via-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white via-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-scroll hover:pause-scroll">
            {doublePartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="group flex-shrink-0 flex items-center justify-center p-3 sm:p-4 lg:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-500 hover:scale-105 hover:shadow-lg mx-2 sm:mx-3 lg:mx-4"
                style={{ minWidth: '140px', maxWidth: '200px' }}
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className={`h-6 sm:h-8 lg:h-12 w-auto object-contain opacity-100 transition-all duration-300 ${enlargedLogos.has(partner.name) ? 'scale-[1.3]' : ''}`}
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const textElement = document.createElement('div');
                    textElement.className = 'text-gray-600 font-semibold text-xs sm:text-sm lg:text-base text-center group-hover:text-gray-800 transition-colors duration-300';
                    textElement.textContent = partner.name;
                    target.parentNode?.appendChild(textElement);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Дополнительная бегущая строка с разной скоростью */}
        <div className="relative overflow-hidden mt-6 sm:mt-8">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white via-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white via-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-scroll-reverse hover:pause-scroll">
            {doublePartners.map((partner, index) => (
              <div
                key={`reverse-${partner.name}-${index}`}
                className="group flex-shrink-0 flex items-center justify-center p-2 sm:p-3 lg:p-4 bg-white/40 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/30 hover:bg-white/60 transition-all duration-500 hover:scale-105 hover:shadow-md mx-1 sm:mx-2 lg:mx-3"
                style={{ minWidth: '120px', maxWidth: '150px' }}
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className={`h-5 sm:h-6 lg:h-8 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 ${enlargedLogos.has(partner.name) ? 'scale-[1.3]' : ''}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const textElement = document.createElement('div');
                    textElement.className = 'text-gray-500 font-medium text-xs sm:text-sm text-center group-hover:text-gray-700 transition-colors duration-300';
                    textElement.textContent = partner.name;
                    target.parentNode?.appendChild(textElement);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/50 shadow-xl">
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-4 px-2">
              Присоединяйтесь к <span className="font-bold text-blue-600 text-lg sm:text-xl lg:text-2xl">100+</span> компаниям, 
              которые уже используют наши ИИ-решения
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs sm:text-sm lg:text-base text-gray-500">
              <div className="text-center">
                <div className="font-bold text-blue-600 text-lg sm:text-xl">20+</div>
                <div>стран</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-600 text-lg sm:text-xl">95%</div>
                <div>довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-600 text-lg sm:text-xl">24/7</div>
                <div>поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;