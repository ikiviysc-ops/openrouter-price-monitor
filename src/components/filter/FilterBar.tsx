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
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Price Range */}
        <PriceRangeSlider
          min={0}
          max={20}
          value={filters.priceRange}
          onChange={handlePriceRangeChange}
        />

        {/* Free Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">免费模型</label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleFreeToggle(null)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filters.isFree === null
                  ? 'bg-white/40 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => handleFreeToggle(true)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filters.isFree === true
                  ? 'bg-white/40 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              免费
            </button>
            <button
              onClick={() => handleFreeToggle(false)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filters.isFree === false
                  ? 'bg-white/40 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
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
          <label className="text-sm font-medium text-white">排序方式</label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleSortChange('price-asc')}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filters.sortBy === 'price-asc'
                  ? 'bg-white/40 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              价格从低到高
            </button>
            <button
              onClick={() => handleSortChange('price-desc')}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filters.sortBy === 'price-desc'
                  ? 'bg-white/40 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              价格从高到低
            </button>
            <button
              onClick={() => handleSortChange('name')}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filters.sortBy === 'name'
                  ? 'bg-white/40 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
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