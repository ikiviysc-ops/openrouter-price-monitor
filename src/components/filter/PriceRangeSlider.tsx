import { useState, useEffect } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeSlider({ min, max, value, onChange }: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    const numValue = parseFloat(inputValue);
    
    if (name === 'min') {
      const newMin = Math.min(numValue, localValue[1]);
      setLocalValue([newMin, localValue[1]]);
    } else {
      const newMax = Math.max(numValue, localValue[0]);
      setLocalValue([localValue[0], newMax]);
    }
  };

  const handleSubmit = () => {
    onChange(localValue);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white">价格范围</label>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          name="min"
          value={localValue[0]}
          onChange={handleChange}
          onBlur={handleSubmit}
          min={min}
          max={max}
          className="w-24 px-3 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
          placeholder="最小值"
        />
        <span className="text-white">至</span>
        <input
          type="number"
          name="max"
          value={localValue[1]}
          onChange={handleChange}
          onBlur={handleSubmit}
          min={min}
          max={max}
          className="w-24 px-3 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
          placeholder="最大值"
        />
        <span className="text-sm text-white/70">美元/千 tokens</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={localValue[1]}
        onChange={(e) => {
          const newMax = parseFloat(e.target.value);
          const newMin = Math.min(localValue[0], newMax);
          setLocalValue([newMin, newMax]);
          onChange([newMin, newMax]);
        }}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white/70"
      />
    </div>
  );
}