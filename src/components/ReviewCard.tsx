import React from 'react';
import { Review } from '@/types';
import { User, Calendar } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  onServiceClick: (serviceId: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onServiceClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 mr-3">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.name}</h4>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-3 w-3 mr-1" />
              {review.date}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
      
      <div className="border-t pt-3">
        <button
          onClick={() => onServiceClick(review.serviceId)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          Услуга: {review.serviceName} →
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;