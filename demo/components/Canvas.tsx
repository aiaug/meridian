'use client';

import { useEffect, useRef } from 'react';
import { Particle, BrushType, ColorPalette } from '@/lib/types';
import { createParticle, updateParticle, drawParticle, brushConfigs } from '@/lib/particles';

interface CanvasProps {
  brushType: BrushType;
  palette: ColorPalette;
  onClear?: () => void;
}

export default function Canvas({ brushType, palette }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isDrawingRef = useRef(false);
  const prevPositionRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        const alive = updateParticle(particle, brushType);
        if (alive) {
          drawParticle(ctx, particle, brushType);
        }
        return alive;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [brushType]);


  const spawnParticles = (x: number, y: number) => {
    const config = brushConfigs[brushType];
    const prevPos = prevPositionRef.current;

    for (let i = 0; i < config.particleCount; i++) {
      const particle = createParticle(
        x,
        y,
        brushType,
        palette,
        prevPos?.x,
        prevPos?.y
      );
      particlesRef.current.push(particle);
    }

    // Limit total particles for performance
    if (particlesRef.current.length > 5000) {
      particlesRef.current = particlesRef.current.slice(-5000);
    }

    prevPositionRef.current = { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDrawingRef.current = true;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      prevPositionRef.current = { x, y };
      spawnParticles(x, y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnParticles(x, y);
    }
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    prevPositionRef.current = null;
  };

  const clearCanvas = () => {
    particlesRef.current = [];
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Expose clear method
  useEffect(() => {
    const win = window as Window & { clearCanvas?: () => void };
    win.clearCanvas = clearCanvas;
    return () => {
      delete win.clearCanvas;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full cursor-crosshair touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    />
  );
}
