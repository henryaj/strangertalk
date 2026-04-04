'use client';

import { useState } from 'react';
import { QuestionDef } from '@/lib/types';
import LikertScale from './LikertScale';
import NumericInput from './NumericInput';

interface SurveyFormProps {
  title: string;
  description?: string;
  questions: QuestionDef[];
  onSubmit: (answers: Record<string, number>) => void;
  submitLabel?: string;
}

export default function SurveyForm({
  title,
  description,
  questions,
  onSubmit,
  submitLabel = 'Submit',
}: SurveyFormProps) {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});

  const allAnswered = questions.every((q) => {
    const val = answers[q.id];
    return val !== null && val !== undefined;
  });

  const handleSubmit = () => {
    if (!allAnswered) return;
    onSubmit(answers as Record<string, number>);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 animate-glitch">{title}</h1>
      {description && <p className="text-neon-green/80 mb-8 text-sm">{description}</p>}

      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={q.id} className="neon-box rounded-xl p-6 bg-void/60">
            <p className="font-bold mb-4 text-white">
              <span className="text-neon-pink mr-2">[{i + 1}]</span>
              {q.text}
            </p>
            {q.type === 'likert' ? (
              <LikertScale
                scale={q.scale ?? 7}
                value={answers[q.id] ?? null}
                onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
              />
            ) : (
              <NumericInput
                value={answers[q.id] ?? null}
                onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
                min={q.min ?? 0}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 mb-12">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`w-full py-3 px-6 rounded-xl font-bold text-lg ${
            allAnswered ? 'neon-btn' : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          {submitLabel}
        </button>
        {!allAnswered && (
          <p className="text-sm text-neon-yellow/60 mt-2 text-center animate-wiggle">
            ⚠️ answer all questions to continue ⚠️
          </p>
        )}
      </div>
    </div>
  );
}
