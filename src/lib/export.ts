import { AppState } from './types';
import { scoreGeneralSurvey, scoreDailySurvey, CompositeScores } from './scoring';

function fmt(n: number): string {
  return n.toFixed(2);
}

function formatScores(label: string, scores: CompositeScores): string {
  let s = `${label}:\n`;
  s += `  Rejection expectation: ${fmt(scores.rejectionExpectation)}\n`;
  s += `  Conversational ability: ${fmt(scores.conversationalAbility)}\n`;
  s += `  Nervousness: ${fmt(scores.nervousness)}\n`;
  s += `  Enjoyment: ${fmt(scores.enjoyment)}\n`;
  s += `  Positive impression: ${fmt(scores.positiveImpression)}\n`;
  return s;
}

export function formatResultsText(state: AppState): string {
  let text = 'StrangerTalk Results\n====================\n\n';

  if (state.baselineSurvey) {
    text += formatScores('Baseline', scoreGeneralSurvey(state.baselineSurvey)) + '\n';
  }

  for (const day of state.days) {
    if (day.preSurvey) {
      text += formatScores(`Day ${day.dayNumber} (predicted)`, scoreDailySurvey(day.preSurvey)) + '\n';
    }
    if (day.postSurvey) {
      text += formatScores(`Day ${day.dayNumber} (actual)`, scoreDailySurvey(day.postSurvey)) + '\n';
    }
  }

  if (state.endSurvey) {
    text += formatScores('End of study', scoreGeneralSurvey(state.endSurvey)) + '\n';
  }

  if (state.followupSurvey) {
    text += formatScores('Follow-up (1 week later)', scoreGeneralSurvey(state.followupSurvey)) + '\n';
  }

  text += `\nTotal missions completed: ${state.completedMissionIds.length}/29\n`;
  text += `Total points: ${state.points}\n`;

  return text;
}

export function buildMailtoLink(state: AppState): string {
  const body = formatResultsText(state);
  return `mailto:henry@henrystanley.com?subject=${encodeURIComponent('StrangerTalk Results')}&body=${encodeURIComponent(body)}`;
}

export function exportJSON(state: AppState): string {
  return JSON.stringify(state, null, 2);
}
