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
      <label className="text-sm font-medium">技能分类</label>
      <div className="flex flex-wrap gap-2">
        {capabilities.map((capability) => (
          <button
            key={capability.value}
            onClick={() => onToggleCapability(capability.value)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCapabilities.includes(capability.value)
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {capability.label}
          </button>
        ))}
      </div>
    </div>
  );
}