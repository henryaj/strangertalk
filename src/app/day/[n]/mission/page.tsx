'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { missions } from '@/lib/missions';
import { loadState, saveState } from '@/lib/storage';
import MissionCard from '@/components/MissionCard';

export default function MissionPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = use(params);
  const dayNum = parseInt(n, 10);
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const state = loadState();
    setCompletedIds(state.completedMissionIds);
    // If they already picked a mission for this day, pre-select it
    const dayMission = state.days[dayNum - 1].missionId;
    if (dayMission) {
      setSelectedId(dayMission);
      setAccepted(true);
    }
  }, [dayNum]);

  const selectedMission = missions.find((m) => m.id === selectedId);

  const handleAccept = () => {
    if (!selectedId) return;
    const state = loadState();
    state.days[dayNum - 1].missionId = selectedId;
    if (!state.completedMissionIds.includes(selectedId)) {
      state.completedMissionIds.push(selectedId);
      state.points += 10;
    }
    saveState(state);
    setAccepted(true);
  };

  const handleDone = () => {
    router.push(`/day/${dayNum}/post`);
  };

  if (accepted && selectedMission) {
    return (
      <div className="max-w-xl mx-auto text-center mt-12">
        <h1 className="text-2xl font-bold mb-2">Day {dayNum} Mission</h1>
        <div className="bg-indigo-50 rounded-xl p-8 mb-8 animate-slow-pulse">
          <h2 className="text-xl font-bold text-indigo-900 mb-3">{selectedMission.name}</h2>
          <p className="text-indigo-800 leading-relaxed">{selectedMission.instruction}</p>
        </div>
        <p className="text-gray-500 mb-8 text-sm">
          Go find this person and have a conversation. It doesn&apos;t need to be long &mdash;
          even a few minutes counts. When you&apos;re done, come back and tell us how it went.
        </p>
        <button
          onClick={handleDone}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          I did it! Log my experience
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Day {dayNum} — Pick a mission</h1>
      <p className="text-gray-600 mb-6">Choose a mission below. Find the person described, then talk to them for a few minutes.</p>

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
