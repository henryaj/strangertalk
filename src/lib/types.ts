export interface GeneralSurvey {
  completedAt: string;
  rejectionExpectation: number;
  hardToStart: number;
  nervous: number;
  enjoyTalking: number;
  theyLikeMe: number;
}

export interface DailySurvey {
  completedAt: string;
  rejectionExpectation: number;
  hardToStart: number;
  nervous: number;
  enjoyTalking: number;
  theyLikeMe: number;
}

export interface MissionCompletion {
  missionId: string;
  preSurvey: DailySurvey;
  postSurvey: DailySurvey;
}

export interface DayData {
  dayNumber: number;
  preSurvey: DailySurvey | null;
  missionId: string | null;
  postSurvey: DailySurvey | null;
  extraMissions: MissionCompletion[];
}

export type AppMode = 'five-day' | 'one-day';

export interface AppState {
  mode: AppMode;
  startedAt: string | null;
  currentDay: number;
  baselineSurvey: GeneralSurvey | null;
  endSurvey: GeneralSurvey | null;
  followupSurvey: GeneralSurvey | null;
  days: DayData[];
  completedMissionIds: string[];
  expressMissionIds: string[];
  points: number;
}

export type SurveyPhase = 'baseline' | 'end' | 'followup';

export interface QuestionDef {
  id: string;
  text: string;
  type: 'likert' | 'numeric';
  scale?: number;
  min?: number;
  reverseScored?: boolean;
}
