'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadState, resetState } from '@/lib/storage';
import { AppState } from '@/lib/types';
import DayCard from '@/components/DayCard';
import ProgressBar from '@/components/ProgressBar';

const encouragements = [
  "You've got this! Every conversation gets easier.",
  "Remember: 87% of people in the study talked to the very first person they approached.",
  "Strangers are friendlier than you think.",
  "The hardest part is starting. You've already done that.",
  "Each conversation is making your predictions more accurate.",
];

export default function DashboardPage() {
  const router = useRouter();
  const [state, setState] = useState<AppState | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const s = loadState();
    if (!s.baselineSurvey) {
      router.replace('/setup');
      return;
    }
    setState(s);
  }, [router]);

  if (!state) return null;

  const totalDays = state.days.length;
  const isOneDay = state.mode === 'one-day';
  const daysCompleted = state.days.filter((d) => d.postSurvey !== null).length;
  const allDaysDone = daysCompleted === totalDays;
  const endSurveyDone = state.endSurvey !== null;
  const followupDone = state.followupSurvey !== null;

  const daysSinceEnd = endSurveyDone && state.endSurvey
    ? Math.floor((Date.now() - new Date(state.endSurvey.completedAt).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">StrangerTalk</h1>
        <span className="text-sm font-medium text-indigo-600">{state.points} pts</span>
      </div>

      <div className="mb-6 space-y-3">
        <ProgressBar current={daysCompleted} total={totalDays} label={isOneDay ? 'Mission' : 'Days completed'} />
        <ProgressBar current={state.completedMissionIds.length} total={29} label="Missions tried" />
      </div>

      <div className="bg-indigo-50 rounded-xl p-4 mb-6 text-sm text-indigo-800">
        {encouragements[Math.min(daysCompleted, encouragements.length - 1)]}
      </div>

      <div className="space-y-3 mb-8">
        {state.days.map((day) => {
          const isDone = day.postSurvey !== null;
          const prevDone = day.dayNumber === 1 || state.days[day.dayNumber - 2].postSurvey !== null;
          const isActive = !isDone && prevDone;
          const isLocked = !isDone && !prevDone;

          return (
            <DayCard
              key={day.dayNumber}
              day={day}
              isActive={isActive}
              isLocked={isLocked}
              totalDays={totalDays}
              onStart={() => {
                if (day.preSurvey) {
                  if (day.missionId) {
                    router.push(`/day/${day.dayNumber}/post`);
                  } else {
                    router.push(`/day/${day.dayNumber}/mission`);
                  }
                } else {
                  router.push(`/day/${day.dayNumber}/pre`);
                }
              }}
              onBonusMission={isDone ? () => router.push(`/day/${day.dayNumber}/bonus`) : undefined}
            />
          );
        })}
      </div>

      {allDaysDone && !endSurveyDone && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <h2 className="font-bold mb-2">
            {isOneDay ? 'Mission complete!' : 'All 5 days complete!'}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {isOneDay
              ? "Let's see how your feelings compare to before."
              : 'Time for your end-of-study survey.'}
          </p>
          <button
            onClick={() => router.push('/final')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Take end survey
          </button>
        </div>
      )}

      {endSurveyDone && !followupDone && !isOneDay && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <h2 className="font-bold mb-2">Follow-up survey</h2>
          {daysSinceEnd >= 7 ? (
            <>
              <p className="text-sm text-gray-600 mb-4">It&apos;s been a week! Take your follow-up survey to see how your attitudes have held up.</p>
              <button
                onClick={() => router.push('/followup')}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Take follow-up survey
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              Come back in {7 - daysSinceEnd} day{7 - daysSinceEnd !== 1 ? 's' : ''} for your follow-up survey.
              The research shows waiting a week gives the best signal on lasting change.
            </p>
          )}
        </div>
      )}

      {(followupDone || (endSurveyDone && isOneDay)) && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <h2 className="font-bold mb-2">
            {isOneDay ? 'Done!' : 'Challenge complete!'}
          </h2>
          <p className="text-sm text-gray-600 mb-4">View your results and see how your attitudes changed.</p>
          <button
            onClick={() => router.push('/results')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            View results
          </button>
        </div>
      )}

      <div className="mt-12 text-center">
        <button
          onClick={() => setShowResetModal(true)}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          Reset all data
        </button>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h2 className="font-bold text-lg mb-2">Reset all data?</h2>
            <p className="text-sm text-gray-600 mb-6">
              This will permanently delete all your surveys, missions, and progress. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetState();
                  router.push('/');
                }}
                className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Delete everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
