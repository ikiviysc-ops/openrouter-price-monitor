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
    <div className="w-full glass-card">
      <div className="pb-3 px-4 pt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white">{model.name}</h3>
            <p className="text-sm mt-1 text-white/70">{model.provider}</p>
          </div>
          {model.isFree && (
            <Badge variant="default" className="bg-green-500/80 hover:bg-green-600 border-transparent">
              免费
            </Badge>
          )}
        </div>
      </div>
      <div className="px-4 pb-4 space-y-4">
        <p className="text-sm text-white/80">
          {model.description}
        </p>
        
        {model.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {model.capabilities.slice(0, 5).map((capability) => (
              <Badge 
                key={capability} 
                variant={getCapabilityVariant(capability) === 'default' ? 'default' : 'outline'}
                className={getCapabilityVariant(capability) === 'default' 
                  ? 'bg-white/30 text-white border-transparent' 
                  : 'bg-white/10 text-white border-white/20'}
              >
                {getCapabilityLabel(capability)}
              </Badge>
            ))}
            {model.capabilities.length > 5 && (
              <Badge variant="ghost" className="text-white/70">
                +{model.capabilities.length - 5}
              </Badge>
            )}
          </div>
        )}
        
        <div className="pt-3 border-t border-white/20">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-white/60">输入:</span>
              <span className="text-white font-medium ml-1">
                ${parseFloat(model.price.input.toString()).toFixed(4).replace(/\.?0+$/, '')} m
              </span>
            </div>
            <div className="text-sm">
              <span className="text-white/60">上下文:</span>
              <span className="text-white font-medium ml-1">
                {formatContextLength(model.contextLength)}
              </span>
            </div>
            <div className="text-sm">
              <span className="text-white/60">输出:</span>
              <span className="text-white font-medium ml-1">
                ${parseFloat(model.price.output.toString()).toFixed(4).replace(/\.?0+$/, '')} m
              </span>
            </div>
          </div>
        </div>
        
        {model.recommendedFor.length > 0 && (
          <div>
            <p className="text-xs text-white/60 mb-2">推荐用于:</p>
            <div className="flex flex-wrap gap-2">
              {model.recommendedFor.map((useCase) => (
                <Badge key={useCase} variant="outline" className="bg-white/10 text-white border-white/20">
                  {getCapabilityLabel(useCase)}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}