'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SurveyForm from '@/components/SurveyForm';
import { generalQuestions } from '@/lib/questions';
import { getDefaultState, saveState } from '@/lib/storage';
import { GeneralSurvey, AppMode } from '@/lib/types';

function SetupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') as AppMode) || 'five-day';

  const handleSubmit = (answers: Record<string, number>) => {
    const state = getDefaultState(mode);
    state.baselineSurvey = {
      ...answers,
      completedAt: new Date().toISOString(),
    } as unknown as GeneralSurvey;
    state.startedAt = new Date().toISOString();
    state.currentDay = 1;
    state.points += 5;
    saveState(state);
    router.push('/dashboard');
  };

  return (
    <SurveyForm
      title="Before we begin..."
      description="Answer these questions about how you currently feel about talking to strangers. There are no right or wrong answers."
      questions={generalQuestions}
      onSubmit={handleSubmit}
      submitLabel={mode === 'one-day' ? 'Start your mission' : 'Start the challenge'}
    />
  );
}

export default function SetupPage() {
  return (
    <Suspense>
      <SetupForm />
    </Suspense>
  );
}
