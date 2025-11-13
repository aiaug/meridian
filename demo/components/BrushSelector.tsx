'use client';

import { BrushType } from '@/lib/types';
import { brushConfigs } from '@/lib/particles';

interface BrushSelectorProps {
  selected: BrushType;
  onSelect: (brush: BrushType) => void;
}

export default function BrushSelector({ selected, onSelect }: BrushSelectorProps) {
  const brushes: BrushType[] = ['trails', 'fireflies', 'streaks', 'petals'];

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-orbitron text-neon-cyan uppercase tracking-wider">
        Brush Type
      </h3>
      <div className="flex gap-2">
        {brushes.map((brush, index) => {
          const config = brushConfigs[brush];
          const isSelected = selected === brush;

          return (
            <button
              key={brush}
              onClick={() => onSelect(brush)}
              className={`
                relative px-4 py-3 rounded border transition-all duration-200
                font-orbitron text-sm
                ${
                  isSelected
                    ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-neon-cyan'
                    : 'border-neo-surface bg-neo-surface/50 text-gray-400 hover:border-neon-cyan/50 hover:text-neon-cyan/70'
                }
              `}
              title={`${config.name} (${index + 1})`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">{config.icon}</span>
                <span className="text-[10px] uppercase">{index + 1}</span>
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
