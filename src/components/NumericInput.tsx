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
  placeholder = 'Enter a number',
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
      className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}
