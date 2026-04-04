'use client';

import { DayData } from '@/lib/types';

interface DayCardProps {
  day: DayData;
  isActive: boolean;
  isLocked: boolean;
  totalDays: number;
  onStart: () => void;
  onBonusMission?: () => void;
}

export default function DayCard({ day, isActive, isLocked, totalDays, onStart, onBonusMission }: DayCardProps) {
  const isDone = day.postSurvey !== null;
  const inProgress = day.preSurvey !== null && !isDone;

  let boxClass: string;
  let statusText: string;
  let statusColor: string;
  let emoji: string;

  if (isDone) {
    boxClass = 'neon-box-green';
    statusText = 'COMPLETE';
    statusColor = 'text-neon-green';
    emoji = '🏆';
  } else if (inProgress) {
    boxClass = 'neon-box-yellow';
    statusText = 'IN PROGRESS';
    statusColor = 'text-neon-yellow';
    emoji = '⏳';
  } else if (isActive) {
    boxClass = 'neon-box animate-slow-pulse';
    statusText = 'READY';
    statusColor = 'text-neon-pink';
    emoji = '🎯';
  } else if (isLocked) {
    boxClass = 'border-2 border-white/10 opacity-40';
    statusText = 'LOCKED';
    statusColor = 'text-white/40';
    emoji = '🔒';
  } else {
    boxClass = 'border-2 border-white/20';
    statusText = 'UP NEXT';
    statusColor = 'text-white/50';
    emoji = '👀';
  }

  return (
    <div className={`p-4 rounded-xl bg-void/60 ${boxClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white">
            {emoji} {totalDays === 1 ? 'Your mission' : `Day ${day.dayNumber}`}
          </h3>
          <p className={`text-sm font-bold ${statusColor}`}>
            {statusText}
            {isDone && day.extraMissions.length > 0 && (
              <span className="text-neon-cyan ml-1">
                + {day.extraMissions.length} bonus 🌟
              </span>
            )}
          </p>
        </div>
        {(isActive || inProgress) && !isDone && (
          <button
            onClick={onStart}
            className="px-4 py-2 neon-btn text-sm font-bold rounded-lg"
          >
            {inProgress ? '▶ Continue' : '▶ Start'}
          </button>
        )}
        {isDone && (
          <div className="flex items-center gap-2">
            {onBonusMission && (
              <button
                onClick={onBonusMission}
                className="px-3 py-1.5 text-xs font-bold neon-btn-secondary rounded-lg"
              >
                + Another ⚡
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
