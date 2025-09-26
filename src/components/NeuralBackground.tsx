import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulsePhase: number;
  connections: number[];
  energy: number;
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize points
    const initPoints = () => {
      const numPoints = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
      pointsRef.current = [];

      for (let i = 0; i < numPoints; i++) {
        pointsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 3 + 1,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
          energy: Math.random()
        });
      }
    };

    initPoints();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx || canvas.width === 0 || canvas.height === 0) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      // Update points
      pointsRef.current.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        point.pulsePhase += 0.02;
        point.energy = Math.sin(time + point.pulsePhase) * 0.5 + 0.5;

        // Bounce off edges with some randomness
        if (point.x < 0 || point.x > canvas.width) {
          point.vx *= -1;
          point.vx += (Math.random() - 0.5) * 0.2;
        }
        if (point.y < 0 || point.y > canvas.height) {
          point.vy *= -1;
          point.vy += (Math.random() - 0.5) * 0.2;
        }

        // Keep points in bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));
      });

      // Draw connections with gradient and pulsing effect
      for (let i = 0; i < pointsRef.current.length; i++) {
        for (let j = i + 1; j < pointsRef.current.length; j++) {
          const point1 = pointsRef.current[i];
          const point2 = pointsRef.current[j];
          const dx = point1.x - point2.x;
          const dy = point1.y - point2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (200 - distance) / 200 * 0.3;
            const pulse = (point1.energy + point2.energy) / 2;
            
            // Create gradient for connection
            const gradient = ctx.createLinearGradient(point1.x, point1.y, point2.x, point2.y);
            gradient.addColorStop(0, `rgba(99, 102, 241, ${opacity * pulse})`);
            gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * pulse * 0.8})`);
            gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity * pulse * 0.6})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1 + pulse * 2;
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections with enhanced effect
      pointsRef.current.forEach(point => {
        const dx = point.x - mouseRef.current.x;
        const dy = point.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const opacity = (150 - distance) / 150 * 0.4;
          const pulse = Math.sin(time * 3) * 0.3 + 0.7;
          
          const gradient = ctx.createRadialGradient(
            mouseRef.current.x, mouseRef.current.y, 0,
            point.x, point.y, distance
          );
          gradient.addColorStop(0, `rgba(147, 51, 234, ${opacity * pulse})`);
          gradient.addColorStop(1, `rgba(99, 102, 241, ${opacity * pulse * 0.3})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2 + pulse;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      });

      // Draw points with pulsing effect and glow
      pointsRef.current.forEach(point => {
        const pulseSize = Math.max(0.1, point.size + Math.sin(point.pulsePhase) * 1.5);
        const glowSize = Math.max(0.1, pulseSize + 3);
        
        // Draw glow
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, glowSize
        );
        gradient.addColorStop(0, `rgba(99, 102, 241, ${point.energy * 0.8})`);
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${point.energy * 0.4})`);
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + point.energy * 0.2})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default NeuralBackground;