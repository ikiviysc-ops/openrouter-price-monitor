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
    <div className="glass p-6 rounded-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-white/70 mt-2">{description}</p>
      </div>
      <div className="space-y-3">
        {models.map((model, index) => (
          <div key={model.id} className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white/70 w-8 text-center">
                #{index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{model.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-white/60">{model.provider}</p>
                  {model.score && (
                    <Badge variant="outline" className="text-xs bg-white/10 border-white/20 text-white">
                      评分: {model.score.toFixed(1)}
                    </Badge>
                  )}
                  <Badge variant="ghost" className="text-xs text-white/80">
                    上下文: {formatContextLength(model.contextLength)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {model.isFree && (
                <Badge variant="default" className="bg-green-500/80 hover:bg-green-600 text-xs border-transparent">
                  免费
                </Badge>
              )}
              <span className="text-sm font-medium text-white">
                ${Math.max(model.price.input, model.price.output).toFixed(4).replace(/\.?0+$/, '')} m
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}