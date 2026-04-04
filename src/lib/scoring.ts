import { GeneralSurvey, DailySurvey } from './types';

function reverse(value: number, scale: number): number {
  return scale + 1 - value;
}

export interface CompositeScores {
  rejectionExpectation: number;
  conversationalAbility: number;
  nervousness: number;
  enjoyment: number;
  positiveImpression: number;
}

export function scoreGeneralSurvey(s: GeneralSurvey): CompositeScores {
  return {
    rejectionExpectation: s.rejectionExpectation - 1,
    conversationalAbility: reverse(s.hardToStart, 7),
    nervousness: s.nervous,
    enjoyment: s.enjoyTalking,
    positiveImpression: s.theyLikeMe,
  };
}

export function scoreDailySurvey(s: DailySurvey): CompositeScores {
  return {
    rejectionExpectation: s.rejectionExpectation - 1,
    conversationalAbility: reverse(s.hardToStart, 5),
    nervousness: s.nervous,
    enjoyment: s.enjoyTalking,
    positiveImpression: s.theyLikeMe,
  };
}
