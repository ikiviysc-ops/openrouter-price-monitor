import { create } from 'zustand';
import { Model, FilterOptions, Capability } from '../types';
import { fetchOpenRouterModels, refreshOpenRouterModels } from '../lib/api';

function translateDescription(description: string): string {
  if (!description || description.trim() === '') {
    return '无描述可用';
  }
  
  const translations: Record<string, string> = {
    'Gemma 4 26B A4B IT is an instruction-tuned Mixture-of-Experts (MoE) model from Google DeepMind. Despite 25.2B total parameters, only 3.8B activate per token during inference — delivering near-31B quality at a fraction of the compute cost. Supports multimodal input including text, images, and video (up to 60s at 1fps). Features a 256K token context window, native function calling, configurable thinking/reasoning mode, and structured output support. Released under Apache 2.0.': 'Gemma 4 26B A4B IT 是 Google DeepMind 开发的指令调优混合专家 (MoE) 模型。尽管总共有 252 亿参数，但在推理过程中每个 token 只激活 38 亿参数 —— 以更低的计算成本提供接近 31B 模型的质量。支持多模态输入，包括文本、图像和视频（最多 60 秒，1fps）。具有 256K token 上下文窗口、原生函数调用、可配置的思考/推理模式和结构化输出支持。以 Apache 2.0 许可证发布。',
    'Gemma 4 31B Instruct is Google DeepMind\'s 30.7B dense multimodal model supporting text and image input with text output. Features a 256K token context window, configurable thinking/reasoning mode, native function calling, and multilingual support across 140+ languages. Strong on coding, reasoning, and document understanding tasks. Apache 2.0 license.': 'Gemma 4 31B Instruct 是 Google DeepMind 的 307 亿密集型多模态模型，支持文本和图像输入，文本输出。具有 256K token 上下文窗口、可配置的思考/推理模式、原生函数调用和支持 140+ 种语言的多语言能力。在编码、推理和文档理解任务上表现出色。Apache 2.0 许可证。',
    'No description available': '无描述可用',
  };
  
  if (translations[description]) {
    return translations[description];
  }
  
  let translated = description;
  
  // 首先处理短语翻译，确保长短语优先
  const phraseMap: Record<string, string> = {
    'Mixture-of-Experts (MoE)': '混合专家 (MoE)',
    'instruction-tuned': '指令调优',
    'context window': '上下文窗口',
    'function calling': '函数调用',
    'structured output': '结构化输出',
    'structured outputs': '结构化输出',
    'max completion tokens': '最大完成 token 数',
    'frequency penalty': '频率惩罚',
    'presence penalty': '存在惩罚',
    'repetition penalty': '重复惩罚',
    'logit bias': 'logit 偏差',
    'response format': '响应格式',
    'tool choice': '工具选择',
    'supported parameters': '支持的参数',
    'per request limits': '每请求限制',
    'is moderated': '已审核',
    'text and image input': '文本和图像输入',
    'text output': '文本输出',
    'multilingual support': '多语言支持',
    'document understanding': '文档理解',
    'dense model': '密集型模型',
    'total parameters': '总参数',
    'activate per token': '每个 token 激活',
    'compute cost': '计算成本',
    'input modalities': '输入模态',
    'output modalities': '输出模态',
    'instruct type': '指令类型',
    'context length': '上下文长度',
    'thinking/reasoning mode': '思考/推理模式',
    'max tokens': '最大 token 数',
    'include reasoning': '包含推理',
    'Apache 2.0': 'Apache 2.0',
    'efficient linear attention': '高效线性注意力',
    'sparse mixture-of-experts routing': '稀疏混合专家路由',
    'strong scalability': '强大的可扩展性',
    'high-performance inference': '高性能推理',
    'agentic coding': '代理编码',
    'front-end development': '前端开发',
    'overall reasoning': '整体推理',
    'vibe coding': '氛围编码',
    '3D scenes': '3D 场景',
    'repository-level problem solving': '仓库级问题解决',
    'state-of-the-art models': '最先进的模型',
    'industry-leading speed': '行业领先的速度',
    'agentic tool calling capabilities': '代理工具调用能力',
    'lowest hallucination rate': '最低的幻觉率',
    'on the market': '市场上',
    'strict prompt adherence': '严格的提示遵循',
    'consistently precise and truthful responses': '始终如一的精确和真实响应',
    'vision-based coding': '基于视觉的编码',
    'agent-driven tasks': '代理驱动的任务',
    'long-horizon planning': '长期规划',
    'complex coding': '复杂编码',
    'task execution': '任务执行',
    'seamlessly with agents': '与代理无缝协作',
    'complete the full loop of': '完成完整的循环',
    'perceive → plan → execute': '感知 → 规划 → 执行',
    'collaborative, agent-based workflows': '协作的、基于代理的工作流',
    'conduct deep research': '进行深入研究',
    'coordinate tool use': '协调工具使用',
    'synthesize information': '综合信息',
    'across complex tasks': '跨复杂任务',
    'low / medium': '低 / 中',
    'high / xhigh': '高 / 超高',
    'powerful open source reasoning model': '强大的开源推理模型',
    'from the team at': '由团队开发',
    'agentic workloads': '代理工作负载',
    'reasoning tasks': '推理任务',
    'open claw': '开放测试',
    'for the first five days': '前五天',
    'Launch video:': '发布视频：',
    'Reasoning effort behavior:': '推理努力行为：',
    'Learn more in our docs': '在我们的文档中了解更多',
    'text+image+video->text': '文本+图像+视频->文本',
    'text+image->text': '文本+图像->文本',
    'text->text': '文本->文本',
  };
  
  const sortedPhrases = Object.keys(phraseMap).sort((a, b) => b.length - a.length);
  sortedPhrases.forEach(phrase => {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    translated = translated.replace(regex, phraseMap[phrase]);
  });
  
  // 然后处理单词翻译
  const wordMap: Record<string, string> = {
    'is': '是',
    'a': '一个',
    'an': '一个',
    'from': '来自',
    'despite': '尽管',
    'only': '只',
    'during': '在...期间',
    'delivering': '提供',
    'near': '接近',
    'quality': '质量',
    'at': '以',
    'fraction': '一小部分',
    'of': '的',
    'compute': '计算',
    'cost': '成本',
    'supports': '支持',
    'including': '包括',
    'text': '文本',
    'images': '图像',
    'and': '和',
    'video': '视频',
    'up': '最多',
    'to': '到',
    'features': '具有',
    'token': 'token',
    'context': '上下文',
    'window': '窗口',
    'native': '原生',
    'function': '函数',
    'calling': '调用',
    'configurable': '可配置的',
    'thinking': '思考',
    'reasoning': '推理',
    'mode': '模式',
    'structured': '结构化',
    'output': '输出',
    'support': '支持',
    'released': '发布',
    'under': '以',
    'license': '许可证',
    'dense': '密集型',
    'multimodal': '多模态',
    'model': '模型',
    'supporting': '支持',
    'with': '具有',
    'multilingual': '多语言',
    'across': '支持',
    'languages': '语言',
    'strong': '强大的',
    'on': '在',
    'coding': '编码',
    'document': '文档',
    'understanding': '理解',
    'tasks': '任务',
    'builds': '基于',
    'hybrid': '混合',
    'architecture': '架构',
    'that': '该架构',
    'combines': '结合',
    'efficient': '高效的',
    'linear': '线性',
    'attention': '注意力',
    'sparse': '稀疏',
    'mixture': '混合',
    'experts': '专家',
    'routing': '路由',
    'enabling': '支持',
    'scalability': '可扩展性',
    'high-performance': '高性能',
    'inference': '推理',
    'compared': '与',
    'the': '',
    'series': '系列',
    'it': '它',
    'delivers': '提供',
    'major': '重大的',
    'gains': '进展',
    'in': '在',
    'agentic': '代理的',
    'front-end': '前端',
    'development': '开发',
    'overall': '整体的',
    'significantly': '显著地',
    'improved': '改进的',
    'vibe': '氛围',
    'experience': '体验',
    'excels': '擅长',
    'complex': '复杂的',
    'such': '例如',
    'as': '如',
    'scenes': '场景',
    'games': '游戏',
    'repository-level': '仓库级',
    'problem': '问题',
    'solving': '解决',
    'achieving': '取得',
    'score': '分数',
    'represents': '代表',
    'substantial': '重大的',
    'leap': '飞跃',
    'both': '在',
    'pure-text': '纯文本',
    'capabilities': '能力方面',
    'performing': '表现',
    'level': '水平',
    'leading': '领先的',
    'state-of-the-art': '最先进的',
    'newest': '最新的',
    'flagship': '旗舰',
    'speed': '速度',
    'tool': '工具',
    'lowest': '最低的',
    'hallucination': '幻觉',
    'rate': '率',
    'market': '市场',
    'strict': '严格的',
    'prompt': '提示',
    'adherence': '遵循',
    'consistently': '始终如一的',
    'precise': '精确的',
    'truthful': '真实的',
    'responses': '响应',
    'first': '首个',
    'foundation': '基础',
    'built': '构建',
    'for': '为',
    'vision-based': '基于视觉的',
    'agent-driven': '代理驱动的',
    'natively': '原生地',
    'handles': '处理',
    'inputs': '输入',
    'long-horizon': '长期',
    'planning': '规划',
    'execution': '执行',
    'seamlessly': '无缝地',
    'agents': '代理',
    'complete': '完成',
    'full': '完整的',
    'loop': '循环',
    'perceive': '感知',
    'plan': '规划',
    'execute': '执行',
    'variant': '变体',
    'designed': '设计',
    'collaborative': '协作的',
    'agent-based': '基于代理的',
    'workflows': '工作流',
    'multiple': '多个',
    'operate': '运行',
    'parallel': '并行',
    'conduct': '进行',
    'deep': '深入的',
    'research': '研究',
    'coordinate': '协调',
    'synthesize': '综合',
    'information': '信息',
    'powerful': '强大的',
    'open': '开源',
    'source': '的',
    'team': '团队',
    'performance': '性能',
    'free': '免费',
    'claw': '测试',
    'five': '五',
    'days': '天',
    'launch': '发布',
    'video': '视频',
    'effort': '努力',
    'behavior': '行为',
    'low': '低',
    'medium': '中',
    'high': '高',
    'xhigh': '超高',
    'learn': '了解',
    'more': '更多',
    'our': '我们的',
    'docs': '文档',
    'during inference': '在推理过程中',
    'multimodal input': '多模态输入',
    'native function calling': '原生函数调用',
    'structured output support': '结构化输出支持',
    'multimodal model': '多模态模型',
    'multilingual support': '多语言支持',
    'Apache 2.0 license': 'Apache 2.0 许可证',
    'text input': '文本输入',
    'image input': '图像输入',
    'video input': '视频输入',
    'text output': '文本输出',
    'image output': '图像输出',
    'video output': '视频输出',
  };
  
  // 改进的单词分割和翻译逻辑
  const words = translated.split(/(\s+|[.,!?;:\'"()\[\]{}]|->)/);
  translated = words.map(word => {
    const lowerWord = word.toLowerCase();
    if (wordMap[lowerWord]) {
      // 保持专有名词的大小写
      if (word === word.toUpperCase()) {
        return word;
      }
      const isCapitalized = word[0] === word[0].toUpperCase() && word.length > 1;
      if (isCapitalized) {
        const translatedWord = wordMap[lowerWord];
        return translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
      }
      return wordMap[lowerWord];
    }
    return word;
  }).join('');
  
  // 特殊模式翻译
  const specialPatterns = [
    { from: /(.+) is (.+)'s newest flagship model with (.+)\./g, to: '$1 是 $2 的最新旗舰模型，具有 $3。' },
    { from: /(.+) combines (.+) with (.+), delivering (.+)\./g, to: '$1 结合了 $2 和 $3，提供 $4。' },
    { from: /(.+) is (.+)'s first native multimodal agent foundation model, built for (.+)\./g, to: '$1 是 $2 的首个原生多模态代理基础模型，专为 $3 而构建。' },
    { from: /(.+) builds on a hybrid architecture that combines (.+), enabling (.+)\./g, to: '$1 基于混合架构，结合了 $2，支持 $3。' },
    { from: /Compared to (.+), it delivers (.+)\./g, to: '与 $1 相比，它提供 $2。' },
    { from: /The model excels at (.+)\./g, to: '该模型擅长 $1。' },
    { from: /It natively handles (.+), excels at (.+), and works (.+)\./g, to: '它原生支持 $1，擅长 $2，并且 $3。' },
    { from: /(.+) is a (.+) model from (.+)\./g, to: '$1 是 $3 开发的 $2 模型。' },
    { from: /(.+) is (.+)'s (.+) model\./g, to: '$1 是 $2 的 $3 模型。' },
    { from: /It shows strong performance in (.+)\./g, to: '它在 $1 方面表现出色。' },
    { from: /It is free in (.+)\./g, to: '它在 $1 中免费。' },
    { from: /(.+) is a variant of (.+) designed for (.+)\./g, to: '$1 是 $2 的变体，专为 $3 而设计。' },
    { from: /Multiple agents operate in parallel to (.+)\./g, to: '多个代理并行运行以 $1。' },
    { from: /Supports (.+)\./g, to: '支持 $1。' },
    { from: /Features (.+)\./g, to: '具有 $1。' },
    { from: /Strong on (.+) tasks\./g, to: '在 $1 任务上表现出色。' },
    { from: /Released under (.+)\./g, to: '以 $1 许可证发布。' },
    { from: /(.+) license\./g, to: '$1 许可证。' },
    { from: /achieving a (.+) score on (.+)\./g, to: '在 $2 上取得 $1 分。' },
    { from: /It represents a substantial leap in both (.+) and (.+) capabilities, performing at the level of (.+)\./g, to: '它在 $1 和 $2 能力方面都取得了重大飞跃，达到了 $3 的水平。' },
    { from: /with a significantly improved (.+) experience\./g, to: '具有显著改进的 $1 体验。' },
    { from: /major gains in (.+), (.+), and (.+),/g, to: '在 $1、$2 和 $3 方面取得重大进展，' },
    { from: /Despite (.+), only (.+) activate per token during inference — delivering near-(.+) quality at a fraction of the compute cost\./g, to: '尽管 $1，但在推理过程中每个 token 只激活 $2 —— 以更低的计算成本提供接近 $3 模型的质量。' },
    { from: /Supports multimodal input including text, images, and video \(up to (.+) at (.+)\)\./g, to: '支持多模态输入，包括文本、图像和视频（最多 $1，$2）。' },
    { from: /Features a (.+) token context window, native function calling, configurable thinking\/reasoning mode, and structured output support\./g, to: '具有 $1 token 上下文窗口、原生函数调用、可配置的思考/推理模式和结构化输出支持。' },
    { from: /(.+) is an instruction-tuned Mixture-of-Experts \(MoE\) model from (.+)\./g, to: '$1 是 $2 开发的指令调优混合专家 (MoE) 模型。' },
    { from: /(.+) is (.+)'s (.+) dense multimodal model supporting text and image input with text output\./g, to: '$1 是 $2 的 $3 密集型多模态模型，支持文本和图像输入，文本输出。' },
    { from: /Features a (.+) token context window, configurable thinking\/reasoning mode, native function calling, and multilingual support across (.+) languages\./g, to: '具有 $1 token 上下文窗口、可配置的思考/推理模式、原生函数调用和支持 $2 种语言的多语言能力。' },
  ];
  
  specialPatterns.forEach(pattern => {
    translated = translated.replace(pattern.from, pattern.to);
  });
  
  // 清理多余的空格和标点
  translated = translated.replace(/\s+/g, ' ').trim();
  translated = translated.replace(/ ([.,!?;:])/g, '$1');
  
  // 确保句子开头大写
  translated = translated.replace(/^\w/, char => char.toUpperCase());
  
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
      capabilities.push('image-understanding');
    }
    if (modality.includes('video')) {
      capabilities.push('video-generation');
      capabilities.push('video-understanding');
    }
    if (modality.includes('image') || modality.includes('video')) {
      capabilities.push('multimodal');
    }
  }
  
  // Check input/output modalities
  if (model.architecture?.input_modalities) {
    if (model.architecture.input_modalities.includes('image')) {
      if (!capabilities.includes('image-understanding')) {
        capabilities.push('image-understanding');
      }
      if (!capabilities.includes('image-generation')) {
        capabilities.push('image-generation');
      }
      if (!capabilities.includes('multimodal')) {
        capabilities.push('multimodal');
      }
    }
    if (model.architecture.input_modalities.includes('video')) {
      if (!capabilities.includes('video-understanding')) {
        capabilities.push('video-understanding');
      }
      if (!capabilities.includes('video-generation')) {
        capabilities.push('video-generation');
      }
      if (!capabilities.includes('multimodal')) {
        capabilities.push('multimodal');
      }
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
  if (description.includes('multimodal') || description.includes('image') || description.includes('video')) {
    if (!capabilities.includes('multimodal')) {
      capabilities.push('multimodal');
    }
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
    contextLength: 128000,
    supportedParametersCount: 15,
    score: 85,
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
    contextLength: 200000,
    supportedParametersCount: 12,
    score: 88,
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
    contextLength: 1000000,
    supportedParametersCount: 18,
    score: 92,
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
    contextLength: 128000,
    supportedParametersCount: 14,
    score: 82,
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
    contextLength: 64000,
    supportedParametersCount: 11,
    score: 78,
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
    contextLength: 16384,
    supportedParametersCount: 10,
    score: 72,
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
    contextLength: 8192,
    supportedParametersCount: 8,
    score: 65,
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
    contextLength: 4096,
    supportedParametersCount: 5,
    score: 70,
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