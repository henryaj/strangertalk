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
    <div className="max-w-xl mx-auto text-center mt-12">
      <h1 className="text-4xl font-bold mb-4">🗣️ StrangerTalk</h1>
      <p className="text-lg text-gray-600 mb-2">
        A challenge to talk to strangers.
      </p>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Research shows we&apos;re far too pessimistic about talking to strangers &mdash;
        they&apos;re more willing to chat than we think, and conversations go better
        than we predict. This app guides you through missions to
        prove it to yourself.
      </p>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 text-left">
        <h2 className="font-semibold mb-3">How it works</h2>
        <ol className="space-y-2 text-sm text-gray-600">
          <li><span className="font-medium text-gray-900">1.</span> Take a short survey about how you feel about talking to strangers</li>
          <li><span className="font-medium text-gray-900">2.</span> Pick a mission &mdash; find a stranger matching a description and talk to them</li>
          <li><span className="font-medium text-gray-900">3.</span> Before and after each conversation, log how you think it&apos;ll go vs. how it actually went</li>
          <li><span className="font-medium text-gray-900">4.</span> See how your attitudes shift over time</li>
        </ol>
      </div>

      {hasExisting ? (
        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Continue your challenge
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={() => router.push('/setup?mode=five-day')}
            className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Start 5-day challenge
          </button>
          <button
            onClick={() => router.push('/setup?mode=one-day')}
            className="w-full py-3 px-6 rounded-xl font-semibold border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Try it once (1 mission)
          </button>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-8">
        Based on <a href="https://www.sciencedirect.com/science/article/pii/S0022103122000750" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Sandstrom, Boothby &amp; Cooney (2022)</a>.
        Your data stays on this device.
      </p>
    </div>
  );
}
