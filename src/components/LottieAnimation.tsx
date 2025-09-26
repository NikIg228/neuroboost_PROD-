import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  style?: React.CSSProperties;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  style = {}
}) => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  return (
    <Lottie
      ref={lottieRef}
      animationData={animationData}
      className={className}
      loop={loop}
      autoplay={autoplay}
      style={style}
    />
  );
};

export default LottieAnimation;
