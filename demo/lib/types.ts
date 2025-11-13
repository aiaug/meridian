export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  rotation?: number;
  rotationSpeed?: number;
}

export type BrushType = 'trails' | 'fireflies' | 'streaks' | 'petals';

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background?: string;
}

export interface BrushConfig {
  id: BrushType;
  name: string;
  icon: string;
  particleCount: number;
  baseSize: number;
  spread: number;
}
