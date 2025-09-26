import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { supabase } from '@/lib/supabase.ts';
import { Service } from '@/types/index';
import { CheckCircle, Heart, MessageCircle } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  onPurchase: () => void;
  onConsultation: () => void;
  badge?: string;
  badgeColor?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onClick, 
  onPurchase, 
  onConsultation,
  badge, 
  badgeColor = 'bg-red-500',
  isFavorite = false,
  onFavoriteToggle
}) => {
  const { user } = useAuth();
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'Самый популярный':
        return '🔥';
      case 'Быстрее всего окупается':
        return '⚡';
      case 'Выбор малого бизнеса':
        return '💼';
      case 'Комплексное внедрение':
        return '🚀';
      default:
        return '⭐';
    }
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (favoriteLoading) return;
    setFavoriteLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', service.id);
      } else {
        // Add to favorites
        await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            product_id: service.id
          });
      }
      
      onFavoriteToggle?.();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden h-full flex flex-col"
      onClick={onClick}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top section with favorite button and badge */}
      <div className="relative p-4 pb-0">
        {/* Favorite Button - moved to top left */}
        <motion.button
          onClick={handleFavoriteClick}
          disabled={favoriteLoading}
          className={`absolute top-2 left-2 p-2 rounded-full transition-all duration-200 z-20 ${
            isFavorite 
              ? 'bg-red-500 text-white shadow-lg' 
              : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white shadow-md'
          } ${favoriteLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            scale: isFavorite ? [1, 1.2, 1] : 1,
            transition: { duration: 0.3 }
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Badge - moved higher and adjusted positioning */}
        {badge && (
          <motion.div 
            className={`absolute top-2 right-2 ${badgeColor} text-white px-2 py-1 rounded-full text-xs font-semibold z-10 shadow-lg`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="mr-1">{getBadgeIcon(badge)}</span>
            {badge}
          </motion.div>
        )}
      </div>

      <div className="px-6 pt-8 pb-6 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
          {service.title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
          {service.description}
        </p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            Что входит в услугу:
          </h4>
          <ul className="space-y-2">
            {service.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl font-bold text-blue-600">
              {service.price}
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button 
              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onPurchase();
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Купить
            </motion.button>
            <motion.button 
              className="px-3 py-2 border border-green-600 text-green-600 font-semibold rounded-lg text-sm flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                onConsultation();
              }}
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "#f0fdf4" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Консультация
            </motion.button>
          </div>
          <motion.button 
            className="w-full mt-2 px-3 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            whileHover={{ scale: 1.02, y: -1, backgroundColor: "#eff6ff" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Подробнее
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;