import { Model } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface RecommendationCardProps {
  title: string;
  description: string;
  models: Model[];
}

export function RecommendationCard({ title, description, models }: RecommendationCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {models.map((model) => (
            <div key={model.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <div>
                <p className="text-sm font-medium">{model.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{model.provider}</p>
              </div>
              <div className="flex items-center gap-2">
                {model.isFree && (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
                    免费
                  </Badge>
                )}
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  ${Math.max(model.price.input, model.price.output).toFixed(4)} / 千 tokens
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}