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
      className={`text-left p-4 rounded-xl border-2 transition-all ${
        completed
          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
          : selected
          ? 'border-indigo-600 bg-indigo-50'
          : 'border-gray-200 bg-white hover:border-indigo-300'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-sm">{mission.name}</span>
        {completed && <span className="text-xs text-green-600">Done</span>}
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">{mission.instruction}</p>
    </button>
  );
}
