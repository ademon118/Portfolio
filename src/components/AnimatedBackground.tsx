'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create gradient blobs with animated colors
    const blobs: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      baseColor: { r: number; g: number; b: number };
      opacity: number;
      colorShift: number;
      colorSpeed: number;
    }> = [];

    const baseColors = [
      { r: 147, g: 51, b: 234 },   // Magenta-purple (reddish)
      { r: 124, g: 58, b: 237 },   // Vibrant purple
      { r: 139, g: 92, b: 246 },   // Blue-purple
      { r: 167, g: 139, b: 250 },  // Lavender
      { r: 192, g: 132, b: 252 },  // Light lavender
    ];

    // Initialize blobs
    for (let i = 0; i < 6; i++) {
      const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 300 + Math.random() * 400,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseColor: baseColor,
        opacity: 0.15 + Math.random() * 0.15,
        colorShift: Math.random() * Math.PI * 2,
        colorSpeed: 0.002 + Math.random() * 0.003,
      });
    }

    // Function to calculate animated color
    const getAnimatedColor = (base: { r: number; g: number; b: number }, shift: number): { r: number; g: number; b: number } => {
      // Create a shifting hue effect
      const offset1 = Math.sin(shift) * 30;
      const offset2 = Math.sin(shift + Math.PI / 3) * 20;
      const offset3 = Math.cos(shift + Math.PI / 6) * 25;
      
      const r = Math.max(0, Math.min(255, base.r + offset1));
      const g = Math.max(0, Math.min(255, base.g + offset2));
      const b = Math.max(0, Math.min(255, base.b + offset3));
      
      return { r, g, b };
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.colorShift += blob.colorSpeed;

        // Bounce off edges
        if (blob.x - blob.radius < 0 || blob.x + blob.radius > canvas.width) {
          blob.vx = -blob.vx;
        }
        if (blob.y - blob.radius < 0 || blob.y + blob.radius > canvas.height) {
          blob.vy = -blob.vy;
        }

        // Get the current animated color
        const currentColor = getAnimatedColor(blob.baseColor, blob.colorShift);
        
        // Create gradient with multiple color stops for smoother blending
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        
        gradient.addColorStop(0, `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${blob.opacity})`);
        gradient.addColorStop(0.4, `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${blob.opacity * 0.4})`);
        gradient.addColorStop(0.7, `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.03)`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#0f0b21' }}
    />
  );
}

