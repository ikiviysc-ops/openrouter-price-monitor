import { create } from 'zustand';
import { Model, FilterOptions, Capability } from '../types';
import { fetchOpenRouterModels, refreshOpenRouterModels } from '../lib/api';

interface ModelState {
  models: Model[];
  filteredModels: Model[];
  filters: FilterOptions;
  isLoading: boolean;
  error: string | null;
  activeTab: 'models' | 'free' | 'recommendations';
  
  setModels: (models: Model[]) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setActiveTab: (tab: 'models' | 'free' | 'recommendations') => void;
  applyFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  refreshModels: () => Promise<void>;
}

const initialFilters: FilterOptions = {
  priceRange: [0, 100],
  isFree: null,
  capabilities: [],
  sortBy: 'price-asc',
};

// Mock data for OpenRouter models
const mockModels: Model[] = [
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: '最先进的多模态模型，支持文本和图像理解',
    capabilities: ['coding', 'content-creation', 'conversation', 'translation', 'data-analysis'],
    price: { input: 5, output: 15, unit: 'm' }, // 0.005 * 1000 = 5 per 1M tokens
    isFree: false,
    recommendedFor: ['coding', 'content-creation'],
  },
  {
    id: 'anthropic/claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: '强大的语言模型，擅长长文本理解和创意写作',
    capabilities: ['content-creation', 'conversation', 'translation', 'data-analysis'],
    price: { input: 3, output: 15, unit: 'm' }, // 0.003 * 1000 = 3 per 1M tokens
    isFree: false,
    recommendedFor: ['content-creation'],
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    description: '快速响应的多模态模型，适合实时应用',
    capabilities: ['coding', 'content-creation', 'image-generation', 'conversation', 'translation'],
    price: { input: 0.15, output: 0.6, unit: 'm' }, // 0.00015 * 1000 = 0.15 per 1M tokens
    isFree: false,
    recommendedFor: ['coding', 'image-generation'],
  },
  {
    id: 'meta-llama/llama-3.1-405b-instruct',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    description: '大型语言模型，适合复杂任务和长上下文',
    capabilities: ['coding', 'content-creation', 'conversation', 'translation', 'data-analysis'],
    price: { input: 1, output: 3, unit: 'm' }, // 0.001 * 1000 = 1 per 1M tokens
    isFree: false,
    recommendedFor: ['coding', 'data-analysis'],
  },
  {
    id: 'mistralai/mistral-large-latest',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    description: '高效的语言模型，平衡性能和成本',
    capabilities: ['coding', 'content-creation', 'conversation', 'translation'],
    price: { input: 2, output: 6, unit: 'm' }, // 0.002 * 1000 = 2 per 1M tokens
    isFree: false,
    recommendedFor: ['coding', 'content-creation'],
  },
  {
    id: 'openai/gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: '经济实惠的语言模型，适合日常任务',
    capabilities: ['content-creation', 'conversation', 'translation'],
    price: { input: 0.5, output: 1.5, unit: 'm' }, // 0.0005 * 1000 = 0.5 per 1M tokens
    isFree: false,
    recommendedFor: ['content-creation'],
  },
  {
    id: 'google/gemini-1.5-flash-lite',
    name: 'Gemini 1.5 Flash Lite',
    provider: 'Google',
    description: '轻量级模型，适合简单任务和快速响应',
    capabilities: ['conversation', 'translation'],
    price: { input: 0, output: 0, unit: 'm' },
    isFree: true,
    recommendedFor: ['conversation'],
  },
  {
    id: 'stabilityai/stable-diffusion-3.5-large',
    name: 'Stable Diffusion 3.5',
    provider: 'Stability AI',
    description: '先进的图像生成模型，创建高质量图像',
    capabilities: ['image-generation'],
    price: { input: 10, output: 10, unit: 'm' }, // 保持原价，因为是per image
    isFree: false,
    recommendedFor: ['image-generation'],
  },
];

export const useModelStore = create<ModelState>((set, get) => ({
  models: mockModels,
  filteredModels: mockModels,
  filters: initialFilters,
  isLoading: false,
  error: null,
  activeTab: 'models',
  
  setModels: (models) => set({ models, filteredModels: models }),
  
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  
  setActiveTab: (tab) => {
    set({ activeTab: tab });
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { models, filters, activeTab } = get();
    
    let filtered = models;
    
    // Filter by active tab
    if (activeTab === 'free') {
      filtered = filtered.filter(model => model.isFree === true);
    }
    
    // Filter by price range
    if (activeTab === 'models') {
      filtered = filtered.filter(model => {
        const maxPrice = Math.max(model.price.input, model.price.output);
        return maxPrice >= filters.priceRange[0] && maxPrice <= filters.priceRange[1];
      });
      
      // Filter by free status
      if (filters.isFree !== null) {
        filtered = filtered.filter(model => model.isFree === filters.isFree);
      }
      
      // Filter by capabilities
      if (filters.capabilities.length > 0) {
        filtered = filtered.filter(model => 
          filters.capabilities.some(capability => 
            model.capabilities.includes(capability)
          )
        );
      }
    }
    
    // Sort models
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = Math.max(a.price.input, a.price.output);
          const priceB = Math.max(b.price.input, b.price.output);
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = Math.max(a.price.input, a.price.output);
          const priceB = Math.max(b.price.input, b.price.output);
          return priceB - priceA;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    set({ filteredModels: filtered });
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  refreshModels: async () => {
    try {
      set({ isLoading: true, error: null });
      const models = await refreshOpenRouterModels();
      const convertedModels = models.map((model: any) => {
        const inputPrice = parseFloat(model.pricing?.prompt || '0');
        const outputPrice = parseFloat(model.pricing?.completion || '0');
        return {
          id: model.id,
          name: model.name,
          provider: model.provider,
          description: model.description || 'No description available',
          capabilities: [], // Extract capabilities from API response if available
          price: {
            input: inputPrice * 1000000, // Convert from per token to per 1M tokens
            output: outputPrice * 1000000, // Convert from per token to per 1M tokens
            unit: 'm'
          },
          isFree: inputPrice === 0 && outputPrice === 0,
          recommendedFor: [] // Extract recommended use cases from API response if available
        };
      });
      set({ models: convertedModels, filteredModels: convertedModels });
      get().applyFilters();
    } catch (error) {
      console.error('Failed to refresh OpenRouter models:', error);
      set({ error: 'Failed to refresh models. Using cached data.' });
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Initialize with real data from OpenRouter API
const store = useModelStore.getState();

async function initializeModels() {
  console.log('Starting to fetch OpenRouter models...');
  try {
    store.setLoading(true);
    console.log('Calling fetchOpenRouterModels...');
    const models = await fetchOpenRouterModels();
    console.log('API response received, models count:', models.length);
    
    // Convert API response to our Model type
    const convertedModels = models.map((model: any) => {
      const inputPrice = parseFloat(model.pricing?.prompt || '0');
      const outputPrice = parseFloat(model.pricing?.completion || '0');
      return {
        id: model.id,
        name: model.name,
        provider: model.provider,
        description: model.description || 'No description available',
        capabilities: [], // Extract capabilities from API response if available
        price: {
          input: inputPrice * 1000000, // Convert from per token to per 1M tokens
          output: outputPrice * 1000000, // Convert from per token to per 1M tokens
          unit: 'm'
        },
        isFree: inputPrice === 0 && outputPrice === 0,
        recommendedFor: [] // Extract recommended use cases from API response if available
      };
    });
    
    console.log('Converted models count:', convertedModels.length);
    console.log('First few models:', convertedModels.slice(0, 3));
    
    // Set models and log the result
    store.setModels(convertedModels);
    console.log('Models set successfully');
  } catch (error) {
    console.error('Failed to fetch OpenRouter models, using mock data:', error);
    // Use mock data as fallback
    store.setModels(mockModels);
    console.log('Using mock data as fallback');
  } finally {
    store.setLoading(false);
    store.applyFilters();
    console.log('Initial filtered models count:', store.filteredModels.length);
  }
}

// Fetch models on initialization
initializeModels();