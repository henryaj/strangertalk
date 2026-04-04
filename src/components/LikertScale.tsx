'use client';

interface LikertScaleProps {
  scale: number;
  value: number | null;
  onChange: (value: number) => void;
  lowLabel?: string;
  highLabel?: string;
}

const neonColors = [
  'bg-neon-pink',
  'bg-neon-orange',
  'bg-neon-yellow',
  'bg-neon-green',
  'bg-neon-cyan',
  'bg-electric-blue',
  'bg-hot-pink',
];

export default function LikertScale({
  scale,
  value,
  onChange,
  lowLabel = 'nah',
  highLabel = 'totally',
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
            className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
              value === point
                ? `${neonColors[point % neonColors.length]} text-black scale-125 shadow-[0_0_15px_rgba(255,0,255,0.6)]`
                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:scale-110'
            }`}
          >
            {point}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-neon-pink">{lowLabel}</span>
        <span className="text-neon-green">{highLabel}</span>
      </div>
    </div>
  );
}
