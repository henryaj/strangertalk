'use client';

import { Mission } from '@/lib/missions';

interface MissionCardProps {
  mission: Mission;
  completed: boolean;
  selected: boolean;
  onSelect: () => void;
}

export default function MissionCard({ mission, completed, selected, onSelect }: MissionCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={completed}
      className={`text-left p-4 rounded-xl transition-all ${
        completed
          ? 'neon-box-green opacity-30 cursor-not-allowed'
          : selected
          ? 'neon-box bg-neon-pink/10 scale-105'
          : 'border-2 border-white/20 bg-white/5 hover:border-neon-cyan hover:bg-neon-cyan/5'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={`font-bold text-sm ${selected ? 'text-neon-pink' : completed ? 'text-neon-green' : 'text-neon-yellow'}`}>
          {mission.name}
        </span>
        {completed && <span className="text-xs text-neon-green">✅</span>}
      </div>
      <p className="text-xs text-white/60 leading-relaxed">{mission.instruction}</p>
    </button>
  );
}
