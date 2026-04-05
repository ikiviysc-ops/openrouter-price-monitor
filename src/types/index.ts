export interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: string[];
  price: {
    input: number;
    output: number;
    unit: string;
  };
  isFree: boolean;
  recommendedFor: string[];
  score?: number; // 综合评分
  contextLength?: number; // 上下文长度
  supportedParametersCount?: number; // 支持的参数数量
}

export interface FilterOptions {
  priceRange: [number, number];
  isFree: boolean | null;
  capabilities: string[];
  sortBy: 'price-asc' | 'price-desc' | 'name';
}

export type Capability = 
  | 'coding' 
  | 'content-creation' 
  | 'image-generation' 
  | 'conversation' 
  | 'translation' 
  | 'data-analysis'
  | 'image-understanding'
  | 'video-generation'
  | 'video-understanding'
  | 'tool-use'
  | 'structured-output'
  | 'reasoning'
  | 'multimodal';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  modelIds: string[];
}