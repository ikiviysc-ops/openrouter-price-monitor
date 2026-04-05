import { Model } from '../../types';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const getCapabilityLabel = (capability: string): string => {
    const labels: Record<string, string> = {
      'coding': '写代码',
      'content-creation': '内容创作',
      'image-generation': '图像生成',
      'conversation': '对话',
      'translation': '翻译',
      'data-analysis': '数据分析',
    };
    return labels[capability] || capability;
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{model.name}</h3>
        {model.isFree && (
          <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
            免费
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{model.provider}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {model.description}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {model.capabilities.slice(0, 3).map((capability) => (
          <span key={capability} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
            {getCapabilityLabel(capability)}
          </span>
        ))}
        {model.capabilities.length > 3 && (
          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
            +{model.capabilities.length - 3}
          </span>
        )}
      </div>
      
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mb-3">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">输入:</span>
            <span className="text-gray-900 dark:text-white font-medium ml-1">
              ${parseFloat(model.price.input.toString()).toFixed(4).replace(/\.?0+$/, '')} m
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-400">输出:</span>
            <span className="text-gray-900 dark:text-white font-medium ml-1">
              ${parseFloat(model.price.output.toString()).toFixed(4).replace(/\.?0+$/, '')} m
            </span>
          </div>
        </div>
      </div>
      
      {model.recommendedFor.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">推荐用于:</p>
          <div className="flex flex-wrap gap-1">
            {model.recommendedFor.map((useCase) => (
              <span key={useCase} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2 py-1 rounded text-xs">
                {getCapabilityLabel(useCase)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}