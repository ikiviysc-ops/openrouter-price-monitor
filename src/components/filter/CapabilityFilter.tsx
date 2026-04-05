import { Capability } from '../../types';

interface CapabilityFilterProps {
  selectedCapabilities: string[];
  onToggleCapability: (capability: string) => void;
}

const capabilities: { value: Capability; label: string }[] = [
  { value: 'coding', label: '写代码' },
  { value: 'content-creation', label: '内容创作' },
  { value: 'image-generation', label: '图像生成' },
  { value: 'conversation', label: '对话' },
  { value: 'translation', label: '翻译' },
  { value: 'data-analysis', label: '数据分析' },
];

export function CapabilityFilter({ selectedCapabilities, onToggleCapability }: CapabilityFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">技能分类</label>
      <div className="flex flex-wrap gap-2">
        {capabilities.map((capability) => (
          <button
            key={capability.value}
            onClick={() => onToggleCapability(capability.value)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              selectedCapabilities.includes(capability.value)
                ? 'bg-white/40 text-white shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {capability.label}
          </button>
        ))}
      </div>
    </div>
  );
}