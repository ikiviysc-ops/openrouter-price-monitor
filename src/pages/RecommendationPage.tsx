import { useModelStore } from '../store/modelStore';
import { RecommendationCard } from '../components/recommendation/RecommendationCard';
import { Recommendation } from '../types';

export function RecommendationPage() {
  const { models } = useModelStore();

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

  // Generate recommendations based on score
  const recommendations: Recommendation[] = categories.map(category => {
    // Filter models by capability
    const filteredModels = models.filter(model => 
      model.capabilities.includes(category.capability)
    );
    
    // Sort by score (descending)
    const sortedModels = [...filteredModels].sort((a, b) => 
      (b.score || 0) - (a.score || 0)
    );
    
    // Get top 10 models
    const topModels = sortedModels.slice(0, 10);
    
    return {
      id: category.id,
      title: category.title,
      description: category.description,
      modelIds: topModels.map(model => model.id)
    };
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">推荐模型</h1>
      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((recommendation) => {
          const recommendedModels = recommendation.modelIds
            .map((id) => models.find((model) => model.id === id))
            .filter((model): model is NonNullable<typeof model> => model !== undefined);

          // Only show if there are models available
          if (recommendedModels.length === 0) return null;

          return (
            <RecommendationCard
              key={recommendation.id}
              title={recommendation.title}
              description={recommendation.description}
              models={recommendedModels}
            />
          );
        })}
      </div>
    </div>
  );
}