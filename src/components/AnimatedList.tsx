import React, { useEffect, useRef } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide' | 'scale';
}

const AnimatedList: React.FC<AnimatedListProps> = ({ 
  children, 
  className = '',
  animation = 'fade'
}) => {
  const [parent] = useAutoAnimate({
    duration: 300,
    easing: 'ease-in-out'
  });

  return (
    <div ref={parent} className={className}>
      {children}
    </div>
  );
};

export default AnimatedList;
