import { create } from 'zustand';
import { Model, FilterOptions, Capability } from '../types';
import { fetchOpenRouterModels, refreshOpenRouterModels } from '../lib/api';

// Simple translation function for model descriptions
function translateDescription(description: string): string {
  // Common model description translations
  const translations: Record<string, string> = {
    'Gemma 4 26B A4B IT is an instruction-tuned Mixture-of-Experts (MoE) model from Google DeepMind. Despite 25.2B total parameters, only 3.8B activate per token during inference — delivering near-31B quality at a fraction of the compute cost. Supports multimodal input including text, images, and video (up to 60s at 1fps). Features a 256K token context window, native function calling, configurable thinking/reasoning mode, and structured output support. Released under Apache 2.0.': 'Gemma 4 26B A4B IT 是 Google DeepMind 开发的指令调优混合专家 (MoE) 模型。尽管总共有 252 亿参数，但在推理过程中每个 token 只激活 38 亿参数 —— 以更低的计算成本提供接近 31B 模型的质量。支持多模态输入，包括文本、图像和视频（最多 60 秒，1fps）。具有 256K token 上下文窗口、原生函数调用、可配置的思考/推理模式和结构化输出支持。以 Apache 2.0 许可证发布。',
    'Gemma 4 31B Instruct is Google DeepMind\'s 30.7B dense multimodal model supporting text and image input with text output. Features a 256K token context window, configurable thinking/reasoning mode, native function calling, and multilingual support across 140+ languages. Strong on coding, reasoning, and document understanding tasks. Apache 2.0 license.': 'Gemma 4 31B Instruct 是 Google DeepMind 的 307 亿密集型多模态模型，支持文本和图像输入，文本输出。具有 256K token 上下文窗口、可配置的思考/推理模式、原生函数调用和支持 140+ 种语言的多语言能力。在编码、推理和文档理解任务上表现出色。Apache 2.0 许可证。',
    'No description available': '无描述可用',
  };
  
  // Return translation if available
  if (translations[description]) {
    return translations[description];
  }
  
  // Basic translation for common patterns
  let translated = description;
  
  // Translate sentence structures
  translated = translated.replace(/(.+) is a (.+) model from (.+)\./g, '$1 是 $3 开发的 $2 模型。');
  translated = translated.replace(/(.+) is (.+)'s (.+) model\./g, '$1 是 $2 的 $3 模型。');
  translated = translated.replace(/Supports (.+)\./g, '支持 $1。');
  translated = translated.replace(/Features (.+)\./g, '具有 $1。');
  translated = translated.replace(/Strong on (.+) tasks\./g, '在 $1 任务上表现出色。');
  translated = translated.replace(/Released under (.+)\./g, '以 $1 许可证发布。');
  translated = translated.replace(/(.+) license\./g, '$1 许可证。');
  
  // Translate common model types and terms
  translated = translated.replace(/Mixture-of-Experts \(MoE\)/g, '混合专家 (MoE)');
  translated = translated.replace(/instruction-tuned/g, '指令调优');
  translated = translated.replace(/multimodal/g, '多模态');
  translated = translated.replace(/context window/g, '上下文窗口');
  translated = translated.replace(/function calling/g, '函数调用');
  translated = translated.replace(/structured output/g, '结构化输出');
  translated = translated.replace(/token/g, 'token');
  translated = translated.replace(/parameters/g, '参数');
  translated = translated.replace(/inference/g, '推理');
  translated = translated.replace(/Apache 2\.0/g, 'Apache 2.0');
  translated = translated.replace(/license/g, '许可证');
  translated = translated.replace(/supports/g, '支持');
  translated = translated.replace(/features/g, '具有');
  translated = translated.replace(/strong on/g, '在...方面表现出色');
  translated = translated.replace(/text and image input/g, '文本和图像输入');
  translated = translated.replace(/text output/g, '文本输出');
  translated = translated.replace(/multilingual support/g, '多语言支持');
  translated = translated.replace(/coding/g, '编码');
  translated = translated.replace(/reasoning/g, '推理');
  translated = translated.replace(/document understanding/g, '文档理解');
  translated = translated.replace(/tasks/g, '任务');
  translated = translated.replace(/dense model/g, '密集型模型');
  translated = translated.replace(/total parameters/g, '总参数');
  translated = translated.replace(/activate per token/g, '每个 token 激活');
  translated = translated.replace(/compute cost/g, '计算成本');
  translated = translated.replace(/input modalities/g, '输入模态');
  translated = translated.replace(/output modalities/g, '输出模态');
  translated = translated.replace(/tokenizer/g, '分词器');
  translated = translated.replace(/instruct type/g, '指令类型');
  translated = translated.replace(/prompt/g, '提示');
  translated = translated.replace(/completion/g, '完成');
  translated = translated.replace(/context length/g, '上下文长度');
  translated = translated.replace(/max completion tokens/g, '最大完成 token 数');
  translated = translated.replace(/is moderated/g, '已审核');
  translated = translated.replace(/per request limits/g, '每请求限制');
  translated = translated.replace(/supported parameters/g, '支持的参数');
  translated = translated.replace(/frequency penalty/g, '频率惩罚');
  translated = translated.replace(/include reasoning/g, '包含推理');
  translated = translated.replace(/logit bias/g, 'logit 偏差');
  translated = translated.replace(/max tokens/g, '最大 token 数');
  translated = translated.replace(/presence penalty/g, '存在惩罚');
  translated = translated.replace(/repetition penalty/g, '重复惩罚');
  translated = translated.replace(/response format/g, '响应格式');
  translated = translated.replace(/seed/g, '种子');
  translated = translated.replace(/stop/g, '停止');
  translated = translated.replace(/structured outputs/g, '结构化输出');
  translated = translated.replace(/temperature/g, '温度');
  translated = translated.replace(/tool choice/g, '工具选择');
  translated = translated.replace(/tools/g, '工具');
  translated = translated.replace(/top k/g, 'top-k');
  translated = translated.replace(/top p/g, 'top-p');
  translated = translated.replace(/Despite/g, '尽管');
  translated = translated.replace(/only/g, '只');
  translated = translated.replace(/delivering/g, '提供');
  translated = translated.replace(/at a fraction of/g, '以更低的');
  translated = translated.replace(/including/g, '包括');
  translated = translated.replace(/up to/g, '最多');
  translated = translated.replace(/native/g, '原生');
  translated = translated.replace(/configurable/g, '可配置的');
  translated = translated.replace(/thinking\/reasoning mode/g, '思考/推理模式');
  translated = translated.replace(/support/g, '支持');
  translated = translated.replace(/across/g, '跨越');
  
  return translated;
}

// Extract capabilities from model data
function extractCapabilities(model: any): string[] {
  const capabilities: string[] = [];
  
  // Check architecture modality
  if (model.architecture?.modality) {
    const modality = model.architecture.modality;
    if (modality.includes('image')) {
      capabilities.push('image-generation');
    }
    if (modality.includes('video')) {
      capabilities.push('video-generation');
    }
  }
  
  // Check input/output modalities
  if (model.architecture?.input_modalities) {
    if (model.architecture.input_modalities.includes('image')) {
      capabilities.push('image-understanding');
    }
    if (model.architecture.input_modalities.includes('video')) {
      capabilities.push('video-understanding');
    }
  }
  
  // Check supported parameters
  if (model.supported_parameters) {
    if (model.supported_parameters.includes('tools') || model.supported_parameters.includes('tool_choice')) {
      capabilities.push('tool-use');
    }
    if (model.supported_parameters.includes('structured_outputs') || model.supported_parameters.includes('response_format')) {
      capabilities.push('structured-output');
    }
    if (model.supported_parameters.includes('reasoning') || model.supported_parameters.includes('include_reasoning')) {
      capabilities.push('reasoning');
    }
  }
  
  // Check description for keywords
  const description = model.description?.toLowerCase() || '';
  if (description.includes('coding') || description.includes('code')) {
    capabilities.push('coding');
  }
  if (description.includes('content') || description.includes('writing')) {
    capabilities.push('content-creation');
  }
  if (description.includes('conversation') || description.includes('chat')) {
    capabilities.push('conversation');
  }
  if (description.includes('translation') || description.includes('translate')) {
    capabilities.push('translation');
  }
  if (description.includes('data') || description.includes('analysis')) {
    capabilities.push('data-analysis');
  }
  if (description.includes('multimodal')) {
    capabilities.push('multimodal');
  }
  
  // Remove duplicates
  return [...new Set(capabilities)];
}

// Calculate comprehensive score for a model
function calculateScore(model: any, capabilities: string[]): number {
  let score = 0;
  
  // 1. Price score (inverse - lower price = higher score)
  const inputPrice = parseFloat(model.pricing?.prompt || '0');
  const outputPrice = parseFloat(model.pricing?.completion || '0');
  const avgPrice = (inputPrice + outputPrice) / 2;
  const priceScore = avgPrice === 0 ? 100 : Math.max(0, 100 - (avgPrice * 10000000)); // 价格越低得分越高
  
  // 2. Capabilities score
  const capabilitiesScore = Math.min(100, capabilities.length * 10); // 每个能力10分，最高100分
  
  // 3. Context length score
  const contextLength = model.context_length || 0;
  const contextScore = Math.min(100, Math.log10(contextLength + 1) * 20); // 对数 scale
  
  // 4. Supported parameters score
  const supportedParamsCount = model.supported_parameters?.length || 0;
  const paramsScore = Math.min(100, supportedParamsCount * 5); // 每个参数5分，最高100分
  
  // 5. Free model bonus
  const freeBonus = (inputPrice === 0 && outputPrice === 0) ? 20 : 0;
  
  // 6. Recency score (based on creation date)
  const created = model.created || 0;
  const now = Math.floor(Date.now() / 1000);
  const daysSinceCreation = (now - created) / (24 * 3600);
  const recencyScore = Math.max(0, 100 - (daysSinceCreation * 0.5)); // 每天减少0.5分
  
  // Weighted average
  score = (
    priceScore * 0.3 +
    capabilitiesScore * 0.25 +
    contextScore * 0.2 +
    paramsScore * 0.15 +
    freeBonus +
    recencyScore * 0.1
  );
  
  return Math.min(100, Math.max(0, score));
}

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
        const capabilities = extractCapabilities(model);
        const score = calculateScore(model, capabilities);
        return {
          id: model.id,
          name: model.name,
          provider: model.provider,
          description: translateDescription(model.description || 'No description available'),
          capabilities: capabilities,
          price: {
            input: inputPrice * 1000000, // Convert from per token to per 1M tokens
            output: outputPrice * 1000000, // Convert from per token to per 1M tokens
            unit: 'm'
          },
          isFree: inputPrice === 0 && outputPrice === 0,
          recommendedFor: [], // Extract recommended use cases from API response if available
          score: score,
          contextLength: model.context_length,
          supportedParametersCount: model.supported_parameters?.length || 0
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
      const capabilities = extractCapabilities(model);
      const score = calculateScore(model, capabilities);
      return {
        id: model.id,
        name: model.name,
        provider: model.provider,
        description: translateDescription(model.description || 'No description available'),
        capabilities: capabilities,
        price: {
          input: inputPrice * 1000000, // Convert from per token to per 1M tokens
          output: outputPrice * 1000000, // Convert from per token to per 1M tokens
          unit: 'm'
        },
        isFree: inputPrice === 0 && outputPrice === 0,
        recommendedFor: [], // Extract recommended use cases from API response if available
        score: score,
        contextLength: model.context_length,
        supportedParametersCount: model.supported_parameters?.length || 0
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