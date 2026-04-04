'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadState } from '@/lib/storage';

export default function Home() {
  const router = useRouter();
  const [hasExisting, setHasExisting] = useState(false);

  useEffect(() => {
    const state = loadState();
    setHasExisting(state.baselineSurvey !== null);
  }, []);

  return (
    <div className="max-w-xl mx-auto text-center mt-8">
      <div className="animate-float">
        <h1 className="text-5xl font-bold mb-2 animate-glitch">
          <span className="rainbow-text">~*~ StrangerTalk ~*~</span>
        </h1>
        <p className="text-2xl mb-1">🗣️✨🌟💬</p>
      </div>

      <p className="text-lg text-neon-cyan mb-2 animate-wiggle inline-block">
        A challenge to talk to strangers!!!
      </p>
      <p className="text-neon-green text-sm mb-8 leading-relaxed">
        This app gives you missions to go talk to strangers
        and tracks how you feel about it. 🚀
      </p>

      <div className="neon-box rounded-xl p-6 mb-8 text-left bg-void/80">
        <h2 className="font-bold mb-3 text-neon-yellow text-lg">⚡ How it works ⚡</h2>
        <ol className="space-y-2 text-sm">
          <li><span className="text-neon-pink font-bold">1.</span> <span className="text-neon-green">Take a short survey about how you feel about talking to strangers</span></li>
          <li><span className="text-neon-pink font-bold">2.</span> <span className="text-neon-cyan">Pick a mission &mdash; find a stranger matching a description and talk to them</span></li>
          <li><span className="text-neon-pink font-bold">3.</span> <span className="text-neon-yellow">Before and after each conversation, log how you think it&apos;ll go vs. how it actually went</span></li>
          <li><span className="text-neon-pink font-bold">4.</span> <span className="text-neon-orange">See how your attitudes shift over time 📈</span></li>
        </ol>
      </div>

      {hasExisting ? (
        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 px-6 rounded-xl font-bold neon-btn text-lg"
          >
            ▶ Continue your challenge ▶
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={() => router.push('/setup?mode=five-day')}
            className="w-full py-3 px-6 rounded-xl font-bold neon-btn text-lg"
          >
            🔥 Start 5-day challenge 🔥
          </button>
          <button
            onClick={() => router.push('/setup?mode=one-day')}
            className="w-full py-3 px-6 rounded-xl font-bold neon-btn-secondary"
          >
            ⚡ Try it once (1 mission) ⚡
          </button>
        </div>
      )}

      <details className="text-left mt-8 neon-box rounded-xl p-4 bg-void/60">
        <summary className="text-xs text-neon-pink/80 cursor-pointer hover:text-neon-pink font-bold">
          🔬 About the research behind this (contains spoilers)
        </summary>
        <p className="text-xs text-white/60 mt-3 leading-relaxed">
          This app is based on <a href="https://www.sciencedirect.com/science/article/pii/S0022103122000750" target="_blank" rel="noopener noreferrer" className="underline text-neon-cyan hover:text-neon-cyan/80">Sandstrom, Boothby &amp; Cooney (2022)</a>,
          who found that people are remarkably pessimistic about talking to strangers &mdash;
          they overestimate rejection, underestimate their conversational ability, and
          expect conversations to go worse than they actually do.
          A week-long scavenger hunt intervention reduced these fears, and the benefits
          persisted for at least a week after the study ended.
        </p>
      </details>

      <p className="text-xs text-white/30 mt-4">Your data stays on this device. 🔒</p>

      <div className="mt-2 text-2xl animate-spin-slow inline-block">🌀</div>
    </div>
  );
}
