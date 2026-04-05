import { Model } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface RecommendationCardProps {
  title: string;
  description: string;
  models: Model[];
}

export function RecommendationCard({ title, description, models }: RecommendationCardProps) {
  // Format context length for display
  const formatContextLength = (length?: number): string => {
    if (!length) return '未知';
    if (length >= 1000000) {
      return `${(length / 1000000).toFixed(1)}M`;
    }
    if (length >= 1000) {
      return `${(length / 1000).toFixed(1)}K`;
    }
    return length.toString();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {models.map((model, index) => (
            <div key={model.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 w-8 text-center">
                  #{index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{model.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{model.provider}</p>
                    {model.score && (
                      <Badge variant="outline" className="text-xs">
                        评分: {model.score.toFixed(1)}
                      </Badge>
                    )}
                    <Badge variant="ghost" className="text-xs">
                      上下文: {formatContextLength(model.contextLength)}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {model.isFree && (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
                    免费
                  </Badge>
                )}
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  ${Math.max(model.price.input, model.price.output).toFixed(4).replace(/\.?0+$/, '')} m
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}