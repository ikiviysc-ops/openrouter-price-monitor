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
}

export interface FilterOptions {
  priceRange: [number, number];
  isFree: boolean | null;
  capabilities: string[];
  sortBy: 'price-asc' | 'price-desc' | 'name';
}

export type Capability = 'coding' | 'content-creation' | 'image-generation' | 'conversation' | 'translation' | 'data-analysis';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  modelIds: string[];
}