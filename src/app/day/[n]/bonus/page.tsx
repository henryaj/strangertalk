'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { missions } from '@/lib/missions';
import { dailyPreQuestions, dailyPostQuestions } from '@/lib/questions';
import { loadState, saveState } from '@/lib/storage';
import { DailySurvey } from '@/lib/types';
import MissionCard from '@/components/MissionCard';
import SurveyForm from '@/components/SurveyForm';

type Step = 'pre' | 'pick' | 'go' | 'post';

export default function BonusMissionPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = use(params);
  const dayNum = parseInt(n, 10);
  const router = useRouter();
  const [step, setStep] = useState<Step>('pre');
  const [preSurvey, setPreSurvey] = useState<DailySurvey | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    const state = loadState();
    setCompletedIds(state.completedMissionIds);
  }, []);

  const selectedMission = missions.find((m) => m.id === selectedId);

  const handlePreSubmit = (answers: Record<string, number>) => {
    setPreSurvey({ ...answers, completedAt: new Date().toISOString() } as unknown as DailySurvey);
    setStep('pick');
  };

  const handleAccept = () => {
    if (!selectedId) return;
    const state = loadState();
    if (!state.completedMissionIds.includes(selectedId)) {
      state.completedMissionIds.push(selectedId);
      state.points += 10;
    }
    saveState(state);
    setCompletedIds((prev) => [...prev, selectedId]);
    setStep('go');
  };

  const handlePostSubmit = (answers: Record<string, number>) => {
    const postSurvey = { ...answers, completedAt: new Date().toISOString() } as unknown as DailySurvey;
    const state = loadState();
    state.days[dayNum - 1].extraMissions.push({
      missionId: selectedId!,
      preSurvey: preSurvey!,
      postSurvey,
    });
    state.points += 10;
    saveState(state);
    router.push('/dashboard');
  };

  if (step === 'pre') {
    return (
      <SurveyForm
        title={`Day ${dayNum} — Bonus mission`}
        description="Before your next conversation, how do you think it will go?"
        questions={dailyPreQuestions}
        onSubmit={handlePreSubmit}
        submitLabel="Pick a mission"
      />
    );
  }

  if (step === 'pick') {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Pick another mission</h1>
        <p className="text-gray-600 mb-6">Choose a mission for your bonus conversation.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {missions.map((m) => (
            <MissionCard
              key={m.id}
              mission={m}
              completed={completedIds.includes(m.id)}
              selected={selectedId === m.id}
              onSelect={() => setSelectedId(m.id)}
            />
          ))}
        </div>
        {selectedId && (
          <div className="sticky bottom-4">
            <button
              onClick={handleAccept}
              className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Accept this mission
            </button>
          </div>
        )}
      </div>
    );
  }

  if (step === 'go' && selectedMission) {
    return (
      <div className="max-w-xl mx-auto text-center mt-12">
        <h1 className="text-2xl font-bold mb-2">Bonus Mission</h1>
        <div className="bg-indigo-50 rounded-xl p-8 mb-8 animate-slow-pulse">
          <h2 className="text-xl font-bold text-indigo-900 mb-3">{selectedMission.name}</h2>
          <p className="text-indigo-800 leading-relaxed">{selectedMission.instruction}</p>
        </div>
        <p className="text-gray-500 mb-8 text-sm">
          Go find this person and have a conversation. Come back when you&apos;re done.
        </p>
        <button
          onClick={() => setStep('post')}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          I did it! Log my experience
        </button>
      </div>
    );
  }

  if (step === 'post') {
    return (
      <SurveyForm
        title="How did it go?"
        description="Think about the conversation you just had."
        questions={dailyPostQuestions}
        onSubmit={handlePostSubmit}
        submitLabel="Save and return to dashboard"
      />
    );
  }

  return null;
}
