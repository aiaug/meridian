'use client';

import { BrushType } from '@/lib/types';
import BrushSelector from './BrushSelector';
import PaletteSelector from './PaletteSelector';

interface ControlsProps {
  brushType: BrushType;
  paletteId: string;
  onBrushChange: (brush: BrushType) => void;
  onPaletteChange: (paletteId: string) => void;
  onClear: () => void;
}

export default function Controls({
  brushType,
  paletteId,
  onBrushChange,
  onPaletteChange,
  onClear,
}: ControlsProps) {
  return (
    <div className="fixed top-6 left-6 z-10 pointer-events-auto">
      <div className="bg-neo-bg/90 backdrop-blur-md border border-neon-cyan/30 rounded-lg p-6 shadow-2xl max-w-md">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-orbitron font-bold text-neon-cyan neon-glow mb-1">
            Particle Zen Garden
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Neo-Tokyo Night Edition
          </p>
        </div>

        {/* Brush Selector */}
        <div className="mb-6">
          <BrushSelector selected={brushType} onSelect={onBrushChange} />
        </div>

        {/* Palette Selector */}
        <div className="mb-6">
          <PaletteSelector selected={paletteId} onSelect={onPaletteChange} />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="flex-1 px-4 py-2 rounded border border-neon-pink/50 bg-neon-pink/10
                     text-neon-pink font-orbitron text-sm uppercase tracking-wider
                     hover:bg-neon-pink/20 hover:border-neon-pink hover:shadow-neon-pink
                     transition-all duration-200"
          >
            Clear (C)
          </button>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-4 pt-4 border-t border-neo-surface">
          <h4 className="text-[10px] font-orbitron text-gray-500 uppercase tracking-wider mb-2">
            Keyboard Shortcuts
          </h4>
          <div className="text-[10px] text-gray-600 font-mono space-y-1">
            <div><span className="text-neon-cyan">1-4</span> Select brush</div>
            <div><span className="text-neon-cyan">P</span> Next palette</div>
            <div><span className="text-neon-cyan">C</span> Clear canvas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
