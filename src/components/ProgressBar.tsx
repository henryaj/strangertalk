interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div>
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-neon-cyan">{label}</span>
          <span className="font-bold text-neon-yellow">{current}/{total}</span>
        </div>
      )}
      <div className="w-full bg-white/10 rounded-full h-3 border border-white/20">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #ff00ff, #ff6600, #fff200, #39ff14, #00ffff)',
            backgroundSize: '300% 100%',
            animation: 'rainbow-bg 3s linear infinite',
            boxShadow: '0 0 10px rgba(255,0,255,0.5)',
          }}
        />
      </div>
    </div>
  );
}
