'use client';

interface LikertScaleProps {
  scale: number; // 5 or 7
  value: number | null;
  onChange: (value: number) => void;
  lowLabel?: string;
  highLabel?: string;
}

export default function LikertScale({
  scale,
  value,
  onChange,
  lowLabel = 'Strongly disagree',
  highLabel = 'Strongly agree',
}: LikertScaleProps) {
  const points = Array.from({ length: scale }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-1">
        {points.map((point) => (
          <button
            key={point}
            type="button"
            onClick={() => onChange(point)}
            className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
              value === point
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {point}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
