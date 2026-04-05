import { Model } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const getCapabilityLabel = (capability: string): string => {
    const labels: Record<string, string> = {
      'coding': '写代码',
      'content-creation': '内容创作',
      'image-generation': '图像生成',
      'conversation': '对话',
      'translation': '翻译',
      'data-analysis': '数据分析',
    };
    return labels[capability] || capability;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{model.name}</CardTitle>
          {model.isFree && (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              免费
            </Badge>
          )}
        </div>
        <CardDescription>{model.provider}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {model.description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {model.capabilities.slice(0, 3).map((capability) => (
            <Badge key={capability} variant="secondary">
              {getCapabilityLabel(capability)}
            </Badge>
          ))}
          {model.capabilities.length > 3 && (
            <Badge variant="secondary">
              +{model.capabilities.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">输入:</span>
              <span className="text-gray-900 dark:text-white font-medium ml-1">
                ${model.price.input.toFixed(4)} {model.price.unit}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">输出:</span>
              <span className="text-gray-900 dark:text-white font-medium ml-1">
                ${model.price.output.toFixed(4)} {model.price.unit}
              </span>
            </div>
          </div>
        </div>
        
        {model.recommendedFor.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">推荐用于:</p>
            <div className="flex flex-wrap gap-1">
              {model.recommendedFor.map((useCase) => (
                <Badge key={useCase} variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                  {getCapabilityLabel(useCase)}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}