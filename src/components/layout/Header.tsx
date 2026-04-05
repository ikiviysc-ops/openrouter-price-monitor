import { Moon, Sun, RefreshCw } from 'lucide-react';
import { useModelStore } from '../../store/modelStore';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  const { refreshModels, isLoading } = useModelStore();

  return (
    <header className="sticky top-0 z-50">
      <div className="glass mx-4 mt-4 rounded-2xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">
            OpenRouter模型价格监控
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={refreshModels}
              disabled={isLoading}
              className="p-2 rounded-full hover:bg-white/20 transition-colors flex items-center gap-1 text-white"
              aria-label="刷新模型数据"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="text-sm">刷新</span>
            </button>
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full hover:bg-white/20 transition-colors text-white"
              aria-label="切换主题"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}