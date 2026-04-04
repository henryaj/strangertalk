'use client';

import React, { useEffect, useState } from 'react';
import { loadState } from '@/lib/storage';
import { AppState } from '@/lib/types';
import { scoreGeneralSurvey, scoreDailySurvey, CompositeScores } from '@/lib/scoring';
import { buildMailtoLink, formatResultsText, exportJSON } from '@/lib/export';

function ScoreRow({ label, baseline, end, followup, lowerIsBetter }: {
  label: string;
  baseline: number | undefined;
  end: number | undefined;
  followup: number | undefined;
  lowerIsBetter: boolean;
}) {
  const fmt = (n: number | undefined) => n !== undefined ? n.toFixed(2) : '—';
  const deltaVal = (a: number | undefined, b: number | undefined) => {
    if (a === undefined || b === undefined) return null;
    return b - a;
  };
  const deltaStr = (d: number) => {
    const sign = d > 0 ? '+' : '';
    return `${sign}${d.toFixed(2)}`;
  };

  const d = deltaVal(baseline, end);
  let colorClass = 'text-white/50';
  if (d !== null && d !== 0) {
    const isGood = lowerIsBetter ? d < 0 : d > 0;
    colorClass = isGood ? 'text-neon-green' : 'text-neon-pink';
  }

  return (
    <tr className="border-b border-white/10">
      <td className="py-2 font-bold text-sm text-neon-cyan">{label}</td>
      <td className="py-2 text-center text-sm text-white/80">{fmt(baseline)}</td>
      <td className="py-2 text-center text-sm text-white/80">{fmt(end)}</td>
      <td className="py-2 text-center text-sm text-white/80">{fmt(followup)}</td>
      <td className="py-2 text-center text-sm font-bold">
        {d !== null && <span className={colorClass}>{deltaStr(d)}</span>}
      </td>
    </tr>
  );
}

export default function ResultsPage() {
  const [state, setState] = useState<AppState | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setState(loadState());
  }, []);

  if (!state) return null;

  const baseline = state.baselineSurvey ? scoreGeneralSurvey(state.baselineSurvey) : undefined;
  const end = state.endSurvey ? scoreGeneralSurvey(state.endSurvey) : undefined;
  const followup = state.followupSurvey ? scoreGeneralSurvey(state.followupSurvey) : undefined;

  const dailyData = state.days
    .filter((d) => d.preSurvey && d.postSurvey)
    .map((d) => ({
      day: d.dayNumber,
      predicted: scoreDailySurvey(d.preSurvey!),
      actual: scoreDailySurvey(d.postSurvey!),
    }));

  const measures: { key: keyof CompositeScores; label: string; lowerIsBetter: boolean }[] = [
    { key: 'rejectionExpectation', label: 'Expected rejections', lowerIsBetter: true },
    { key: 'conversationalAbility', label: 'Conversational ability', lowerIsBetter: false },
    { key: 'nervousness', label: 'Nervousness', lowerIsBetter: true },
    { key: 'enjoyment', label: 'Enjoyment', lowerIsBetter: false },
    { key: 'positiveImpression', label: 'Positive impression', lowerIsBetter: false },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatResultsText(state));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportJSON(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'strangertalk-results.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 animate-glitch">
        <span className="rainbow-text">📊 Your Results 📊</span>
      </h1>
      <p className="text-white/60 mb-8 text-sm">Here&apos;s how your attitudes changed over the course of the challenge. 🔬</p>

      {/* General survey comparison */}
      <div className="neon-box rounded-xl p-6 mb-6 overflow-x-auto bg-void/60">
        <h2 className="font-bold mb-4 text-neon-yellow">⚡ Survey scores</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neon-pink/30">
              <th className="py-2 text-sm font-bold text-neon-pink">Measure</th>
              <th className="py-2 text-center text-sm font-bold text-neon-pink">Baseline</th>
              <th className="py-2 text-center text-sm font-bold text-neon-pink">End</th>
              <th className="py-2 text-center text-sm font-bold text-neon-pink">Follow-up</th>
              <th className="py-2 text-center text-sm font-bold text-neon-pink">Change</th>
            </tr>
          </thead>
          <tbody>
            {measures.map((m) => (
              <ScoreRow
                key={m.key}
                label={m.label}
                baseline={baseline?.[m.key] as number | undefined}
                end={end?.[m.key] as number | undefined}
                followup={followup?.[m.key] as number | undefined}
                lowerIsBetter={m.lowerIsBetter}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Daily predictions vs reality */}
      {dailyData.length > 0 && (
        <div className="neon-box-cyan rounded-xl p-6 mb-6 bg-void/60">
          <h2 className="font-bold mb-4 text-neon-cyan">🔮 Predictions vs. Reality</h2>
          <div className="space-y-4">
            {dailyData.map(({ day, predicted, actual }) => (
              <div key={day} className="border-b border-white/10 pb-3 last:border-0">
                <h3 className="font-bold text-sm mb-2 text-neon-yellow">Day {day}</h3>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="font-bold text-neon-pink">Measure</div>
                  <div className="font-bold text-center text-neon-pink">Predicted</div>
                  <div className="font-bold text-center text-neon-pink">Actual</div>
                  {measures.map((m) => (
                    <React.Fragment key={m.key}>
                      <div className="text-white/60">{m.label}</div>
                      <div className="text-center text-white/80">{((predicted as unknown as Record<string, number>)[m.key])?.toFixed(2) ?? '—'}</div>
                      <div className="text-center text-neon-green">{((actual as unknown as Record<string, number>)[m.key])?.toFixed(2) ?? '—'}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export options */}
      <div className="neon-box-yellow rounded-xl p-6 mb-8 bg-void/60">
        <h2 className="font-bold mb-4 text-neon-yellow">💾 Export your data</h2>
        <div className="space-y-3">
          <a
            href={buildMailtoLink(state)}
            className="block w-full py-3 px-6 rounded-xl font-bold neon-btn text-center"
          >
            📧 Email results
          </a>
          <button
            onClick={handleCopy}
            className="w-full py-3 px-6 rounded-xl font-bold neon-btn-secondary"
          >
            {copied ? '✅ Copied!' : '📋 Copy to clipboard'}
          </button>
          <button
            onClick={handleDownload}
            className="w-full py-3 px-6 rounded-xl font-bold neon-btn-secondary"
          >
            ⬇️ Download JSON
          </button>
        </div>
      </div>
    </div>
  );
}
