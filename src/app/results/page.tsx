'use client';

import React, { useEffect, useState } from 'react';
import { loadState } from '@/lib/storage';
import { AppState } from '@/lib/types';
import { scoreGeneralSurvey, scoreDailySurvey, CompositeScores } from '@/lib/scoring';
import { buildMailtoLink, formatResultsText, exportJSON } from '@/lib/export';

function ScoreRow({ label, baseline, end, followup }: {
  label: string;
  baseline: number | undefined;
  end: number | undefined;
  followup: number | undefined;
}) {
  const fmt = (n: number | undefined) => n !== undefined ? n.toFixed(2) : '—';
  const delta = (a: number | undefined, b: number | undefined) => {
    if (a === undefined || b === undefined) return null;
    const d = b - a;
    const sign = d > 0 ? '+' : '';
    return `${sign}${d.toFixed(2)}`;
  };

  return (
    <tr className="border-b border-gray-100">
      <td className="py-2 font-medium text-sm">{label}</td>
      <td className="py-2 text-center text-sm">{fmt(baseline)}</td>
      <td className="py-2 text-center text-sm">{fmt(end)}</td>
      <td className="py-2 text-center text-sm">{fmt(followup)}</td>
      <td className="py-2 text-center text-sm font-medium">
        {delta(baseline, end) && (
          <span className={Number(delta(baseline, end)) < 0 ? 'text-green-600' : Number(delta(baseline, end)) > 0 ? 'text-red-600' : ''}>
            {delta(baseline, end)}
          </span>
        )}
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
      <h1 className="text-2xl font-bold mb-2">Your Results</h1>
      <p className="text-gray-600 mb-8">Here&apos;s how your attitudes changed over the course of the challenge.</p>

      {/* General survey comparison */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 overflow-x-auto">
        <h2 className="font-bold mb-4">General survey scores</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 text-sm font-semibold">Measure</th>
              <th className="py-2 text-center text-sm font-semibold">Baseline</th>
              <th className="py-2 text-center text-sm font-semibold">End</th>
              <th className="py-2 text-center text-sm font-semibold">Follow-up</th>
              <th className="py-2 text-center text-sm font-semibold">Change</th>
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
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Daily predictions vs reality */}
      {dailyData.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-bold mb-4">Daily: Predictions vs. Reality</h2>
          <div className="space-y-4">
            {dailyData.map(({ day, predicted, actual }) => (
              <div key={day} className="border-b border-gray-100 pb-3 last:border-0">
                <h3 className="font-medium text-sm mb-2">Day {day}</h3>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="font-semibold">Measure</div>
                  <div className="font-semibold text-center">Predicted</div>
                  <div className="font-semibold text-center">Actual</div>
                  {measures.map((m) => (
                    <React.Fragment key={m.key}>
                      <div className="text-gray-600">{m.label}</div>
                      <div className="text-center">{((predicted as unknown as Record<string, number>)[m.key])?.toFixed(2) ?? '—'}</div>
                      <div className="text-center">{((actual as unknown as Record<string, number>)[m.key])?.toFixed(2) ?? '—'}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export options */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="font-bold mb-4">Export your data</h2>
        <div className="space-y-3">
          <a
            href={buildMailtoLink(state)}
            className="block w-full py-3 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors text-center"
          >
            Email results to henry@henrystanley.com
          </a>
          <button
            onClick={handleCopy}
            className="w-full py-3 px-6 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy results to clipboard'}
          </button>
          <button
            onClick={handleDownload}
            className="w-full py-3 px-6 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-colors"
          >
            Download as JSON
          </button>
        </div>
      </div>
    </div>
  );
}

