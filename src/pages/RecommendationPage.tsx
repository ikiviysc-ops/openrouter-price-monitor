import { useModelStore } from '../store/modelStore';
import { RecommendationCard } from '../components/recommendation/RecommendationCard';
import { Recommendation } from '../types';

export function RecommendationPage() {
  const { models } = useModelStore();

  const recommendations: Recommendation[] = [
    {
      id: 'coding',
      title: '写代码',
      description: '适合编程、代码生成和调试的模型',
      modelIds: ['meta-llama/llama-3.1-405b-instruct', 'openai/gpt-4o', 'google/gemini-2.5-flash'],
    },
    {
      id: 'content-creation',
      title: '内容创作',
      description: '适合写作、创意内容生成的模型',
      modelIds: ['anthropic/claude-3-5-sonnet', 'openai/gpt-4o', 'mistralai/mistral-large-latest'],
    },
    {
      id: 'image-generation',
      title: '图像生成',
      description: '适合创建高质量图像的模型',
      modelIds: ['stabilityai/stable-diffusion-3.5-large', 'google/gemini-2.5-flash'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">推荐模型</h1>
      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((recommendation) => {
          const recommendedModels = recommendation.modelIds
            .map((id) => models.find((model) => model.id === id))
            .filter((model): model is NonNullable<typeof model> => model !== undefined);

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