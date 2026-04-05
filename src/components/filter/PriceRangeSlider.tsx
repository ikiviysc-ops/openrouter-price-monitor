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
    <div className="space-y-2">
      <label className="text-sm font-medium">价格范围</label>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          name="min"
          value={localValue[0]}
          onChange={handleChange}
          onBlur={handleSubmit}
          min={min}
          max={max}
          className="w-20 px-3 py-1 border rounded-md text-sm"
          placeholder="最小值"
        />
        <span>至</span>
        <input
          type="number"
          name="max"
          value={localValue[1]}
          onChange={handleChange}
          onBlur={handleSubmit}
          min={min}
          max={max}
          className="w-20 px-3 py-1 border rounded-md text-sm"
          placeholder="最大值"
        />
        <span className="text-sm text-gray-500">美元/千 tokens</span>
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
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}