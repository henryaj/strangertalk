'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import SurveyForm from '@/components/SurveyForm';
import { dailyPostQuestions } from '@/lib/questions';
import { loadState, saveState } from '@/lib/storage';
import { DailySurvey } from '@/lib/types';

const postMessages = [
  "Great job! You did it. That's one conversation down.",
  "Two days in! You're building momentum.",
  "Halfway there. Notice how your predictions compare to reality?",
  "Four days done. You're practically a pro at this.",
  "Five for five! You've completed the challenge. Amazing work.",
];

function getMessage(dayNum: number, totalDays: number): string {
  if (totalDays === 1) return "Nice work! You talked to a stranger. Let's see how it compared to your expectations.";
  return postMessages[Math.min(dayNum - 1, postMessages.length - 1)];
}

export default function PostSurveyPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = use(params);
  const dayNum = parseInt(n, 10);
  const router = useRouter();

  const state0 = loadState();
  const totalDays = state0.days.length;

  const handleSubmit = (answers: Record<string, number>) => {
    const state = loadState();
    const day = state.days[dayNum - 1];
    day.postSurvey = {
      ...answers,
      completedAt: new Date().toISOString(),
    } as unknown as DailySurvey;
    state.points += 5;
    const totalDays = state.days.length;
    if (dayNum < totalDays) {
      state.currentDay = dayNum + 1;
    } else {
      state.currentDay = totalDays + 1; // done
    }
    saveState(state);
    router.push('/dashboard');
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto mb-6 bg-green-50 rounded-xl p-4 text-sm text-green-800">
        {getMessage(dayNum, totalDays)}
      </div>
      <SurveyForm
        title={totalDays === 1 ? 'After your conversation' : `Day ${dayNum} — After your conversation`}
        description="How did it actually go? Think about the conversation you just had."
        questions={dailyPostQuestions}
        onSubmit={handleSubmit}
        submitLabel="Save and continue"
      />
    </div>
  );
}
