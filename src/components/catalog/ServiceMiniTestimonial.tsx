import React from 'react';

interface MiniTestimonialProps {
  client: string;
  quote: string;
}

const ServiceMiniTestimonial: React.FC<MiniTestimonialProps> = ({ client, quote }) => {
  return (
    <div className="mt-4 p-3 rounded-lg bg-white/10 border border-white/20 text-white/80 text-xs">
      <div className="font-semibold mb-1">✓ Уже используют: {client}</div>
      <div className="opacity-90">“{quote}”</div>
    </div>
  );
};

export default ServiceMiniTestimonial;


