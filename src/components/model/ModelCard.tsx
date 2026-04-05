import { Model } from '../../types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const getCapabilityLabel = (capability: string): string => {
    const labels: Record<string, string> = {
      'coding': '写代码',
      'content-creation': '内容创作',
      'image-generation': '图像生成',
      'image-understanding': '图像理解',
      'video-generation': '视频生成',
      'video-understanding': '视频理解',
      'conversation': '对话',
      'translation': '翻译',
      'data-analysis': '数据分析',
      'tool-use': '工具使用',
      'structured-output': '结构化输出',
      'reasoning': '推理',
      'multimodal': '多模态',
    };
    return labels[capability] || capability;
  };

  const getCapabilityVariant = (capability: string): 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' => {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'> = {
      'coding': 'default',
      'content-creation': 'secondary',
      'image-generation': 'outline',
      'image-understanding': 'outline',
      'video-generation': 'outline',
      'video-understanding': 'outline',
      'conversation': 'ghost',
      'translation': 'ghost',
      'data-analysis': 'secondary',
      'tool-use': 'default',
      'structured-output': 'secondary',
      'reasoning': 'default',
      'multimodal': 'outline',
    };
    return variants[capability] || 'secondary';
  };

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
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{model.name}</CardTitle>
            <CardDescription className="text-sm mt-1">{model.provider}</CardDescription>
          </div>
          {model.isFree && (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              免费
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {model.description}
        </p>
        
        {model.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {model.capabilities.slice(0, 5).map((capability) => (
              <Badge key={capability} variant={getCapabilityVariant(capability)}>
                {getCapabilityLabel(capability)}
              </Badge>
            ))}
            {model.capabilities.length > 5 && (
              <Badge variant="ghost">
                +{model.capabilities.length - 5}
              </Badge>
            )}
          </div>
        )}
        
        <div className="pt-3 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-muted-foreground">输入:</span>
              <span className="text-foreground font-medium ml-1">
                ${parseFloat(model.price.input.toString()).toFixed(4).replace(/\.?0+$/, '')} m
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">上下文:</span>
              <span className="text-foreground font-medium ml-1">
                {formatContextLength(model.contextLength)}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">输出:</span>
              <span className="text-foreground font-medium ml-1">
                ${parseFloat(model.price.output.toString()).toFixed(4).replace(/\.?0+$/, '')} m
              </span>
            </div>
          </div>
        </div>
        
        {model.recommendedFor.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">推荐用于:</p>
            <div className="flex flex-wrap gap-2">
              {model.recommendedFor.map((useCase) => (
                <Badge key={useCase} variant="outline">
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