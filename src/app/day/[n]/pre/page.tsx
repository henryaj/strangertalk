'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import SurveyForm from '@/components/SurveyForm';
import { dailyPreQuestions } from '@/lib/questions';
import { loadState, saveState } from '@/lib/storage';
import { DailySurvey } from '@/lib/types';

export default function PreSurveyPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = use(params);
  const dayNum = parseInt(n, 10);
  const router = useRouter();

  const handleSubmit = (answers: Record<string, number>) => {
    const state = loadState();
    const day = state.days[dayNum - 1];
    day.preSurvey = {
      ...answers,
      completedAt: new Date().toISOString(),
    } as unknown as DailySurvey;
    state.points += 5;
    saveState(state);
    router.push(`/day/${dayNum}/mission`);
  };

  return (
    <SurveyForm
      title={`Day ${dayNum} — Before your conversation`}
      description="How do you think today's conversation will go? Answer honestly — there are no right or wrong answers."
      questions={dailyPreQuestions}
      onSubmit={handleSubmit}
      submitLabel="Pick a mission"
    />
  );
}
