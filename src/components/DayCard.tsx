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

  let status: string;
  let statusColor: string;
  if (isDone) {
    status = 'Complete';
    statusColor = 'text-green-600';
  } else if (inProgress) {
    status = 'In progress';
    statusColor = 'text-amber-600';
  } else if (isActive) {
    status = 'Ready';
    statusColor = 'text-indigo-600';
  } else if (isLocked) {
    status = 'Locked';
    statusColor = 'text-gray-400';
  } else {
    status = 'Up next';
    statusColor = 'text-gray-500';
  }

  return (
    <div
      className={`p-4 rounded-xl border-2 ${
        isActive ? 'border-indigo-600 bg-indigo-50' : isDone ? 'border-green-200 bg-green-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">{totalDays === 1 ? 'Your mission' : `Day ${day.dayNumber}`}</h3>
          <p className={`text-sm ${statusColor}`}>
            {status}
            {isDone && day.extraMissions.length > 0 && (
              <span className="text-gray-400 ml-1">
                + {day.extraMissions.length} bonus
              </span>
            )}
          </p>
        </div>
        {(isActive || inProgress) && !isDone && (
          <button
            onClick={onStart}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {inProgress ? 'Continue' : 'Start'}
          </button>
        )}
        {isDone && (
          <div className="flex items-center gap-2">
            {onBonusMission && (
              <button
                onClick={onBonusMission}
                className="px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                + Another
              </button>
            )}
            <span className="text-2xl">&#10003;</span>
          </div>
        )}
      </div>
    </div>
  );
}
