'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { missions } from '@/lib/missions';
import { loadState, saveState } from '@/lib/storage';
import MissionCard from '@/components/MissionCard';

export default function ExpressPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const state = loadState();
    setCompletedIds([...state.completedMissionIds, ...(state.expressMissionIds ?? [])]);
  }, []);

  const selectedMission = missions.find((m) => m.id === selectedId);

  const handleAccept = () => {
    if (!selectedId) return;
    const state = loadState();
    if (!state.expressMissionIds) state.expressMissionIds = [];
    if (!state.expressMissionIds.includes(selectedId)) {
      state.expressMissionIds.push(selectedId);
      state.points += 10;
    }
    saveState(state);
    setAccepted(true);
  };

  const handleDone = () => {
    router.push('/dashboard');
  };

  if (accepted && selectedMission) {
    return (
      <div className="max-w-xl mx-auto text-center mt-12">
        <h1 className="text-2xl font-bold mb-4 animate-glitch text-neon-yellow">
          Your mission
        </h1>
        <div className="neon-box rounded-xl p-8 mb-8 animate-slow-pulse bg-neon-pink/10">
          <h2 className="text-xl font-bold text-neon-pink mb-3">{selectedMission.name}</h2>
          <p className="text-white/80 leading-relaxed">{selectedMission.instruction}</p>
        </div>

        <div className="neon-box-cyan rounded-xl p-6 mb-8 text-left bg-neon-cyan/5">
          <h3 className="text-sm font-bold text-neon-cyan mb-4">Not sure what to say? Try one of these:</h3>
          <div className="space-y-3 text-sm text-white/80">
            <p>
              <span className="text-neon-cyan font-bold">Comment on the moment</span> &mdash;
              &ldquo;Nice day, right?&rdquo; / &ldquo;This line is wild&rdquo; / &ldquo;Love this song&rdquo;
            </p>
            <p>
              <span className="text-neon-cyan font-bold">Pay a compliment</span> &mdash;
              &ldquo;Great shoes!&rdquo; / &ldquo;Cool tattoo&rdquo; / &ldquo;Your dog is adorable&rdquo;
            </p>
            <p>
              <span className="text-neon-cyan font-bold">Ask something genuine</span> &mdash;
              &ldquo;Know any good spots around here?&rdquo; / &ldquo;What are you reading?&rdquo;
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neon-cyan/20 text-xs text-white/50 space-y-1">
            <p>Most conversations go better than you&apos;d predict.</p>
            <p>You only need a few minutes &mdash; even 60 seconds counts.</p>
          </div>
        </div>

        <button
          onClick={handleDone}
          className="w-full py-3 px-6 rounded-xl font-bold neon-btn text-lg"
        >
          Done &mdash; back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-neon-cyan">Quick Mission</h1>
      <p className="text-white/60 mb-6 text-sm">
        No surveys, no tracking &mdash; just pick a mission and go talk to someone.
      </p>

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
            Let&apos;s go
          </button>
        </div>
      )}
    </div>
  );
}
