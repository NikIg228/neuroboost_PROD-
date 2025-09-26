import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  trigger?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  trigger
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const isUp = direction === 'up';
    const isDown = direction === 'down';
    const isLeft = direction === 'left';
    const isRight = direction === 'right';

    const yOffset = (isUp || isDown) ? (isUp ? 100 : -100) : 0;
    const xOffset = (isLeft || isRight) ? (isLeft ? 100 : -100) : 0;

    gsap.fromTo(element, 
      {
        y: yOffset,
        x: xOffset,
        opacity: 0
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger ? trigger : element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax effect
    gsap.to(element, {
      y: isUp ? -50 * speed : isDown ? 50 * speed : 0,
      x: isLeft ? -50 * speed : isRight ? 50 * speed : 0,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed, direction, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ParallaxSection;
