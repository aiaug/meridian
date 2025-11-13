'use client';

import { useState, useEffect } from 'react';
import Canvas from '@/components/Canvas';
import Controls from '@/components/Controls';
import { BrushType } from '@/lib/types';
import { palettes, getPaletteById } from '@/lib/palettes';

const STORAGE_KEYS = {
  BRUSH: 'particle-zen-brush',
  PALETTE: 'particle-zen-palette',
};

export default function Home() {
  const [brushType, setBrushType] = useState<BrushType>('trails');
  const [paletteId, setPaletteId] = useState('classic-neon');

  // Load preferences from localStorage
  useEffect(() => {
    const savedBrush = localStorage.getItem(STORAGE_KEYS.BRUSH);
    const savedPalette = localStorage.getItem(STORAGE_KEYS.PALETTE);

    if (savedBrush && ['trails', 'fireflies', 'streaks', 'petals'].includes(savedBrush)) {
      setBrushType(savedBrush as BrushType);
    }

    if (savedPalette) {
      setPaletteId(savedPalette);
    }
  }, []);

  // Save preferences to localStorage
  const handleBrushChange = (brush: BrushType) => {
    setBrushType(brush);
    localStorage.setItem(STORAGE_KEYS.BRUSH, brush);
  };

  const handlePaletteChange = (id: string) => {
    setPaletteId(id);
    localStorage.setItem(STORAGE_KEYS.PALETTE, id);
  };

  const handleClear = () => {
    const win = window as Window & { clearCanvas?: () => void };
    if (win.clearCanvas) {
      win.clearCanvas();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case '1':
          handleBrushChange('trails');
          break;
        case '2':
          handleBrushChange('fireflies');
          break;
        case '3':
          handleBrushChange('streaks');
          break;
        case '4':
          handleBrushChange('petals');
          break;
        case 'p':
          e.preventDefault();
          const currentIndex = palettes.findIndex((p) => p.id === paletteId);
          const nextIndex = (currentIndex + 1) % palettes.length;
          handlePaletteChange(palettes[nextIndex].id);
          break;
        case 'c':
          e.preventDefault();
          handleClear();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paletteId]);

  const palette = getPaletteById(paletteId);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-neo-bg">
      <Canvas brushType={brushType} palette={palette} />
      <Controls
        brushType={brushType}
        paletteId={paletteId}
        onBrushChange={handleBrushChange}
        onPaletteChange={handlePaletteChange}
        onClear={handleClear}
      />

      {/* Info badge */}
      <div className="fixed bottom-6 right-6 z-10 pointer-events-none">
        <div className="bg-neo-bg/80 backdrop-blur-sm border border-neon-cyan/20 rounded-lg px-4 py-2">
          <p className="text-[10px] font-mono text-gray-500">
            Click and drag to create particles
          </p>
        </div>
      </div>
    </main>
  );
}
