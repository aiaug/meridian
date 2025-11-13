import { Particle, BrushType, BrushConfig, ColorPalette } from './types';
import { getRandomPaletteColor } from './palettes';

export const brushConfigs: Record<BrushType, BrushConfig> = {
  trails: {
    id: 'trails',
    name: 'Flowing Trails',
    icon: '∼',
    particleCount: 3,
    baseSize: 4,
    spread: 15,
  },
  fireflies: {
    id: 'fireflies',
    name: 'Fireflies',
    icon: '✦',
    particleCount: 2,
    baseSize: 6,
    spread: 25,
  },
  streaks: {
    id: 'streaks',
    name: 'Neon Streaks',
    icon: '⟿',
    particleCount: 5,
    baseSize: 3,
    spread: 8,
  },
  petals: {
    id: 'petals',
    name: 'Sakura Petals',
    icon: '❀',
    particleCount: 1,
    baseSize: 8,
    spread: 20,
  },
};

export const createParticle = (
  x: number,
  y: number,
  brushType: BrushType,
  palette: ColorPalette,
  prevX?: number,
  prevY?: number
): Particle => {
  const config = brushConfigs[brushType];
  const color = getRandomPaletteColor(palette);
  const spread = config.spread;

  // Calculate velocity based on mouse movement if prev position available
  let vx = (Math.random() - 0.5) * 2;
  let vy = (Math.random() - 0.5) * 2;

  if (prevX !== undefined && prevY !== undefined) {
    const dx = x - prevX;
    const dy = y - prevY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 0.1) {
      vx = (dx / speed) * (Math.random() * 0.5 + 0.5);
      vy = (dy / speed) * (Math.random() * 0.5 + 0.5);
    }
  }

  switch (brushType) {
    case 'trails':
      return {
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: vx * 0.3,
        vy: vy * 0.3,
        life: 1,
        maxLife: 60 + Math.random() * 40,
        size: config.baseSize + Math.random() * 3,
        color,
      };

    case 'fireflies':
      return {
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.3,
        life: 1,
        maxLife: 120 + Math.random() * 80,
        size: config.baseSize + Math.random() * 4,
        color,
      };

    case 'streaks':
      const speed = Math.abs(vx) + Math.abs(vy);
      return {
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: vx * (1 + speed * 0.5),
        vy: vy * (1 + speed * 0.5),
        life: 1,
        maxLife: 30 + Math.random() * 20,
        size: config.baseSize + speed * 0.5,
        color,
      };

    case 'petals':
      return {
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * 0.8,
        vy: Math.random() * 0.5 + 0.2,
        life: 1,
        maxLife: 200 + Math.random() * 100,
        size: config.baseSize + Math.random() * 4,
        color,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
      };

    default:
      return {
        x,
        y,
        vx,
        vy,
        life: 1,
        maxLife: 60,
        size: config.baseSize,
        color,
      };
  }
};

export const updateParticle = (particle: Particle, brushType: BrushType): boolean => {
  // Update position
  particle.x += particle.vx;
  particle.y += particle.vy;

  // Apply brush-specific physics
  switch (brushType) {
    case 'trails':
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      break;

    case 'fireflies':
      // Random drift
      particle.vx += (Math.random() - 0.5) * 0.1;
      particle.vy += (Math.random() - 0.5) * 0.1;
      particle.vx *= 0.97;
      particle.vy *= 0.97;
      break;

    case 'streaks':
      particle.vx *= 0.96;
      particle.vy *= 0.96;
      break;

    case 'petals':
      // Gravity
      particle.vy += 0.02;
      // Slight horizontal sway
      particle.vx += Math.sin(particle.life / 10) * 0.01;
      particle.vx *= 0.99;
      if (particle.rotation !== undefined && particle.rotationSpeed !== undefined) {
        particle.rotation += particle.rotationSpeed;
      }
      break;
  }

  // Update life
  particle.life++;

  // Return false if particle should be removed
  return particle.life < particle.maxLife;
};

export const drawParticle = (
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  brushType: BrushType
): void => {
  const alpha = 1 - particle.life / particle.maxLife;

  ctx.save();
  ctx.globalAlpha = alpha;

  switch (brushType) {
    case 'trails':
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'fireflies':
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 25;
      ctx.shadowColor = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      // Inner glow
      ctx.globalAlpha = alpha * 0.5;
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'streaks':
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = particle.size;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 12;
      ctx.shadowColor = particle.color;
      ctx.beginPath();
      ctx.moveTo(particle.x - particle.vx * 3, particle.y - particle.vy * 3);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();
      break;

    case 'petals':
      ctx.translate(particle.x, particle.y);
      if (particle.rotation !== undefined) {
        ctx.rotate(particle.rotation);
      }
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = particle.color;
      // Draw petal shape
      ctx.beginPath();
      ctx.ellipse(0, 0, particle.size, particle.size * 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      break;

    default:
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
  }

  ctx.restore();
};
