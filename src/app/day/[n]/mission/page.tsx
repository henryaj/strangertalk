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
        <h1 className="text-2xl font-bold mb-4 animate-glitch text-neon-yellow">
          🎯 Day {dayNum} Mission 🎯
        </h1>
        <div className="neon-box rounded-xl p-8 mb-8 animate-slow-pulse bg-neon-pink/10">
          <h2 className="text-xl font-bold text-neon-pink mb-3">{selectedMission.name}</h2>
          <p className="text-white/80 leading-relaxed">{selectedMission.instruction}</p>
        </div>
        <p className="text-white/50 mb-8 text-sm">
          Go find this person and have a conversation. It doesn&apos;t need to be long &mdash;
          even a few minutes counts. When you&apos;re done, come back and tell us how it went. 🗣️
        </p>
        <button
          onClick={handleDone}
          className="w-full py-3 px-6 rounded-xl font-bold neon-btn text-lg"
        >
          ✅ I did it! Log my experience
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-neon-cyan">Day {dayNum} &mdash; Pick a mission</h1>
      <p className="text-white/60 mb-6 text-sm">Choose a mission below. Find the person described, then talk to them for a few minutes. 🔍</p>

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
            className="w-full py-3 px-6 rounded-xl font-bold neon-btn text-lg shadow-[0_0_30px_rgba(255,0,255,0.5)]"
          >
            🚀 Accept this mission
          </button>
        </div>
      )}
    </div>
  );
}
