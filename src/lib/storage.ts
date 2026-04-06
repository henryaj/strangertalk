import { AppState } from './types';

const STORAGE_KEY = 'strangertalk';

import { AppMode } from './types';

export function getDefaultState(mode: AppMode = 'five-day'): AppState {
  const numDays = mode === 'one-day' ? 1 : 5;
  return {
    mode,
    startedAt: null,
    currentDay: 0,
    baselineSurvey: null,
    endSurvey: null,
    followupSurvey: null,
    days: Array.from({ length: numDays }, (_, i) => ({
      dayNumber: i + 1,
      preSurvey: null,
      missionId: null,
      postSurvey: null,
      extraMissions: [],
    })),
    completedMissionIds: [],
    expressMissionIds: [],
    points: 0,
  };
}

export function loadState(): AppState {
  if (typeof window === 'undefined') return getDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    return JSON.parse(raw) as AppState;
  } catch {
    return getDefaultState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
