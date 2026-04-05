import { PriceRangeSlider } from './PriceRangeSlider';
import { CapabilityFilter } from './CapabilityFilter';
import { useModelStore } from '../../store/modelStore';

export function FilterBar() {
  const { filters, setFilters, applyFilters } = useModelStore();

  const handlePriceRangeChange = (value: [number, number]) => {
    setFilters({ priceRange: value });
    applyFilters();
  };

  const handleFreeToggle = (isFree: boolean | null) => {
    setFilters({ isFree });
    applyFilters();
  };

  const handleToggleCapability = (capability: string) => {
    const newCapabilities = filters.capabilities.includes(capability)
      ? filters.capabilities.filter(c => c !== capability)
      : [...filters.capabilities, capability];
    setFilters({ capabilities: newCapabilities });
    applyFilters();
  };

  const handleSortChange = (sortBy: 'price-asc' | 'price-desc' | 'name') => {
    setFilters({ sortBy });
    applyFilters();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Price Range */}
        <PriceRangeSlider
          min={0}
          max={20}
          value={filters.priceRange}
          onChange={handlePriceRangeChange}
        />

        {/* Free Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">免费模型</label>
          <div className="flex space-x-4">
            <button
              onClick={() => handleFreeToggle(null)}
              className={`px-4 py-1 rounded-md text-sm transition-colors ${
                filters.isFree === null
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => handleFreeToggle(true)}
              className={`px-4 py-1 rounded-md text-sm transition-colors ${
                filters.isFree === true
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              免费
            </button>
            <button
              onClick={() => handleFreeToggle(false)}
              className={`px-4 py-1 rounded-md text-sm transition-colors ${
                filters.isFree === false
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              付费
            </button>
          </div>
        </div>

        {/* Capabilities */}
        <CapabilityFilter
          selectedCapabilities={filters.capabilities}
          onToggleCapability={handleToggleCapability}
        />

        {/* Sort */}
        <div className="space-y-2">
          <label className="text-sm font-medium">排序方式</label>
          <div className="flex space-x-4">
            <button
              onClick={() => handleSortChange('price-asc')}
              className={`px-4 py-1 rounded-md text-sm transition-colors ${
                filters.sortBy === 'price-asc'
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              价格从低到高
            </button>
            <button
              onClick={() => handleSortChange('price-desc')}
              className={`px-4 py-1 rounded-md text-sm transition-colors ${
                filters.sortBy === 'price-desc'
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              价格从高到低
            </button>
            <button
              onClick={() => handleSortChange('name')}
              className={`px-4 py-1 rounded-md text-sm transition-colors ${
                filters.sortBy === 'name'
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              名称
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}