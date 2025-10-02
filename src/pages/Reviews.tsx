import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { reviews } from '@/data/reviews';
import { services } from '@/data/services';
import ReviewCard from '@/components/ReviewCard';
import ServiceModal from '@/components/ServiceModal';
import AnimatedSection from '@/components/AnimatedSection';
import { Service } from '@/types/index';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Reviews: React.FC = () => {
  const { t } = useTranslation('pages');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviewsPerPage = 10;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const handleServiceClick = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('reviews.title')} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('reviews.gradient')}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('reviews.subtitle')}
            </p>
            
            <div className="flex justify-center items-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900 ml-2">{t('reviews.rating')}</span>
              <span className="text-gray-600">({reviews.length} {t('reviews.reviewsCount')})</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {currentReviews.map((review, index) => (
            <AnimatedSection key={review.id} delay={index * 100}>
              <ReviewCard
                review={review}
                onServiceClick={handleServiceClick}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Pagination */}
        <AnimatedSection>
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t('reviews.pagination.back')}
            </button>

            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {t('reviews.pagination.forward')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection delay={200}>
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-16">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {t('reviews.results.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">{t('reviews.results.satisfiedClients')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">200%</div>
                <div className="text-gray-600">{t('reviews.results.efficiencyGrowth')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">3 мес</div>
                <div className="text-gray-600">{t('reviews.results.paybackPeriod')}</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Reviews;