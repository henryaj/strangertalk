'use client';

import { useRouter } from 'next/navigation';
import SurveyForm from '@/components/SurveyForm';
import { generalQuestions } from '@/lib/questions';
import { loadState, saveState } from '@/lib/storage';
import { GeneralSurvey } from '@/lib/types';

export default function FollowupPage() {
  const router = useRouter();

  const handleSubmit = (answers: Record<string, number>) => {
    const state = loadState();
    state.followupSurvey = {
      ...answers,
      completedAt: new Date().toISOString(),
    } as unknown as GeneralSurvey;
    state.points += 5;
    saveState(state);
    router.push('/results');
  };

  return (
    <SurveyForm
      title="One-week follow-up"
      description="It's been a week since the challenge ended. Let's see how your attitudes are holding up."
      questions={generalQuestions}
      onSubmit={handleSubmit}
      submitLabel="See my results"
    />
  );
}
