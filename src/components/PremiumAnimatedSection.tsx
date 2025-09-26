import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface PremiumAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  stagger?: number;
}

const PremiumAnimatedSection: React.FC<PremiumAnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 1.2,
  stagger = 0.1
}) => {
  // Настройки анимации в зависимости от направления
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: 60, opacity: 0, scale: 0.95 };
      case 'down':
        return { y: -60, opacity: 0, scale: 0.95 };
      case 'left':
        return { x: 60, opacity: 0, scale: 0.95 };
      case 'right':
        return { x: -60, opacity: 0, scale: 0.95 };
      default:
        return { y: 60, opacity: 0, scale: 0.95 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialTransform()}
      whileInView={{ 
        x: 0, 
        y: 0, 
        opacity: 1, 
        scale: 1 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Кастомная кривая для премиум ощущения
      }}
    >
      {children}
    </motion.div>
  );
};

export default PremiumAnimatedSection;
