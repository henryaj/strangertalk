'use client';

interface NumericInputProps {
  value: number | null;
  onChange: (value: number) => void;
  min?: number;
  placeholder?: string;
}

export default function NumericInput({
  value,
  onChange,
  min = 0,
  placeholder = '???',
}: NumericInputProps) {
  return (
    <input
      type="number"
      min={min}
      value={value ?? ''}
      onChange={(e) => {
        const v = parseInt(e.target.value, 10);
        if (!isNaN(v)) onChange(v);
      }}
      placeholder={placeholder}
      className="w-32 px-3 py-2 bg-transparent border-2 border-neon-cyan rounded-lg text-center text-lg text-neon-cyan font-bold focus:outline-none focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,0,255,0.5)] placeholder-white/30"
    />
  );
}
