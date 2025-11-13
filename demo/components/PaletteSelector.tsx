'use client';

import { palettes } from '@/lib/palettes';

interface PaletteSelectorProps {
  selected: string;
  onSelect: (paletteId: string) => void;
}

export default function PaletteSelector({ selected, onSelect }: PaletteSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-orbitron text-neon-cyan uppercase tracking-wider">
        Color Palette
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {palettes.map((palette) => {
          const isSelected = selected === palette.id;

          return (
            <button
              key={palette.id}
              onClick={() => onSelect(palette.id)}
              className={`
                relative px-3 py-2 rounded border transition-all duration-200
                ${
                  isSelected
                    ? 'border-neon-cyan bg-neon-cyan/10 shadow-neon-cyan'
                    : 'border-neo-surface bg-neo-surface/50 hover:border-neon-cyan/50'
                }
              `}
              title={palette.name}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: palette.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: palette.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: palette.accent }}
                  />
                </div>
                <span className="text-xs font-orbitron text-gray-300">
                  {palette.name}
                </span>
              </div>
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
