'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SurveyForm from '@/components/SurveyForm';
import { generalQuestions } from '@/lib/questions';
import { loadState, saveState } from '@/lib/storage';
import { GeneralSurvey } from '@/lib/types';

export default function FinalPage() {
  const router = useRouter();
  const [isOneDay, setIsOneDay] = useState(false);

  useEffect(() => {
    setIsOneDay(loadState().mode === 'one-day');
  }, []);

  const handleSubmit = (answers: Record<string, number>) => {
    const state = loadState();
    state.endSurvey = {
      ...answers,
      completedAt: new Date().toISOString(),
    } as unknown as GeneralSurvey;
    state.points += 5;
    saveState(state);
    router.push('/dashboard');
  };

  return (
    <SurveyForm
      title={isOneDay ? 'After your mission' : 'End of challenge survey'}
      description={
        isOneDay
          ? "You talked to a stranger! Answer these same questions again and see if anything shifted."
          : "You've completed 5 days of talking to strangers! Answer these questions about how you feel now."
      }
      questions={generalQuestions}
      onSubmit={handleSubmit}
      submitLabel="Submit"
    />
  );
}
