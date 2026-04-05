import { useModelStore } from '../../store/modelStore';
import { ModelCard } from './ModelCard';

export function ModelList() {
  const { filteredModels, isLoading, error } = useModelStore();

  console.log('ModelList - filteredModels:', filteredModels);
  console.log('ModelList - isLoading:', isLoading);
  console.log('ModelList - error:', error);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-md mb-4">
        {error}
      </div>
    );
  }

  if (filteredModels.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        没有找到符合条件的模型
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredModels.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  );
}