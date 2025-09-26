import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GeometricBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || shapesRef.current.length === 0) return;

    // Создаем плавную анимацию для геометрических фигур
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    shapesRef.current.forEach((shape, index) => {
      // Анимация вращения и движения
      tl.to(shape, {
        rotation: 360,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        scale: 1.2,
        duration: 8 + Math.random() * 4,
        ease: "power2.inOut",
      }, index * 0.5);

      // Анимация прозрачности
      gsap.to(shape, {
        opacity: 0.3 + Math.random() * 0.4,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    });

    // Анимация градиента
    gsap.to(containerRef.current, {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el) shapesRef.current.push(el);
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
      }}
    >
      {/* Геометрические фигуры */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          ref={addToRefs}
          className="absolute opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 80}px`,
            height: `${20 + Math.random() * 80}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          {i % 4 === 0 && (
            <div className="w-full h-full bg-white rounded-full blur-sm" />
          )}
          {i % 4 === 1 && (
            <div className="w-full h-full bg-white transform rotate-45 blur-sm" />
          )}
          {i % 4 === 2 && (
            <div className="w-full h-full bg-white rounded-lg blur-sm" />
          )}
          {i % 4 === 3 && (
            <div className="w-full h-full bg-white transform rotate-12 rounded-full blur-sm" />
          )}
        </div>
      ))}

      {/* Дополнительные декоративные элементы */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-white/20 transform rotate-45 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-white/20 rounded-lg animate-pulse" />
      
      {/* Градиентные оверлеи для глубины */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent" />
    </div>
  );
};

export default GeometricBackground;
