import { useState } from 'react';
import { useModelStore } from '../store/modelStore';
import { RecommendationCard } from '../components/recommendation/RecommendationCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function RecommendationPage() {
  const { models } = useModelStore();
  const [activeCategory, setActiveCategory] = useState('coding');

  // Define recommendation categories
  const categories = [
    {
      id: 'coding',
      title: '写代码',
      description: '适合编程、代码生成和调试的模型',
      capability: 'coding'
    },
    {
      id: 'content-creation',
      title: '内容创作',
      description: '适合写作、创意内容生成的模型',
      capability: 'content-creation'
    },
    {
      id: 'image-generation',
      title: '图像生成',
      description: '适合创建高质量图像的模型',
      capability: 'image-generation'
    },
    {
      id: 'conversation',
      title: '对话',
      description: '适合聊天、问答和对话的模型',
      capability: 'conversation'
    },
    {
      id: 'translation',
      title: '翻译',
      description: '适合多语言翻译的模型',
      capability: 'translation'
    },
    {
      id: 'data-analysis',
      title: '数据分析',
      description: '适合数据分析和处理的模型',
      capability: 'data-analysis'
    },
    {
      id: 'multimodal',
      title: '多模态',
      description: '支持多种输入输出模态的模型',
      capability: 'multimodal'
    },
    {
      id: 'tool-use',
      title: '工具使用',
      description: '适合使用外部工具的模型',
      capability: 'tool-use'
    },
    {
      id: 'reasoning',
      title: '推理',
      description: '擅长逻辑推理的模型',
      capability: 'reasoning'
    },
    {
      id: 'structured-output',
      title: '结构化输出',
      description: '适合生成结构化数据的模型',
      capability: 'structured-output'
    }
  ];

  // Get models for a specific category
  const getCategoryModels = (capability: string) => {
    const filteredModels = models.filter(model => 
      model.capabilities.includes(capability)
    );
    
    return [...filteredModels].sort((a, b) => 
      (b.score || 0) - (a.score || 0)
    ).slice(0, 10);
  };

  return (
    <div className="px-0 py-0">
      <div className="glass p-6 rounded-2xl mb-6">
        <h1 className="text-2xl font-bold text-white">推荐模型</h1>
      </div>
      
      <Tabs 
        defaultValue="coding" 
        className="w-full"
        onValueChange={setActiveCategory}
      >
        <div className="glass p-2 mb-6 rounded-2xl">
          <TabsList className="flex overflow-x-auto flex-wrap gap-2 w-full">
            {categories.map((category) => {
              const categoryModels = getCategoryModels(category.capability);
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id} 
                  className="flex-shrink-0 bg-white/20 hover:bg-white/30 data-[state=active]:bg-white/40 text-white"
                >
                  {category.title}
                  <span className="ml-2 bg-white/30 px-2 py-0.5 rounded-full text-xs">
                    {categoryModels.length}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        
        {categories.map((category) => {
          const categoryModels = getCategoryModels(category.capability);
          
          return (
            <TabsContent key={category.id} value={category.id}>
              {categoryModels.length > 0 ? (
                <RecommendationCard
                  title={category.title}
                  description={category.description}
                  models={categoryModels}
                />
              ) : (
                <div className="glass p-6 rounded-2xl text-center">
                  <p className="text-white/70">
                    暂无该类别的模型推荐
                  </p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}