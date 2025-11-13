import { ColorPalette } from './types';

export const palettes: ColorPalette[] = [
  {
    id: 'classic-neon',
    name: 'Classic Neon',
    primary: '#ff006e',
    secondary: '#00f5ff',
    accent: '#00ffff',
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    primary: '#b537f2',
    secondary: '#ff006e',
    accent: '#00f5ff',
  },
  {
    id: 'matrix',
    name: 'Matrix',
    primary: '#39ff14',
    secondary: '#00ff00',
    accent: '#7fff00',
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    primary: '#b537f2',
    secondary: '#ff006e',
    accent: '#ff9e00',
  },
  {
    id: 'ice',
    name: 'Ice',
    primary: '#00f5ff',
    secondary: '#ffffff',
    accent: '#b3f0ff',
  },
  {
    id: 'ember',
    name: 'Ember',
    primary: '#ff4500',
    secondary: '#ff9e00',
    accent: '#ffff00',
  },
];

export const getRandomPaletteColor = (palette: ColorPalette): string => {
  const colors = [palette.primary, palette.secondary, palette.accent];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getPaletteById = (id: string): ColorPalette => {
  return palettes.find((p) => p.id === id) || palettes[0];
};
