import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FilterBar } from './components/filter/FilterBar';
import { ModelList } from './components/model/ModelList';
import { RecommendationPage } from './pages/RecommendationPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { useModelStore } from './store/modelStore';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { setActiveTab } = useModelStore();

  // 检查系统主题偏好
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // 应用主题
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'models' | 'free' | 'recommendations');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">OpenRouter模型价格监控</h1>
        
        <Tabs defaultValue="models" className="w-full flex flex-col" onValueChange={handleTabChange}>
          <TabsList className="mb-6 flex overflow-x-auto">
            <TabsTrigger value="models" className="flex-shrink-0">模型列表</TabsTrigger>
            <TabsTrigger value="free" className="flex-shrink-0">免费模型</TabsTrigger>
            <TabsTrigger value="recommendations" className="flex-shrink-0">推荐模型</TabsTrigger>
          </TabsList>
          
          <div className="flex-1">
            <TabsContent value="models" className="space-y-6">
              <FilterBar />
              <ModelList />
            </TabsContent>
            
            <TabsContent value="free" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">免费模型</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  以下是当前可用的免费模型，适合简单任务和快速响应。
                </p>
              </div>
              <ModelList />
            </TabsContent>
            
            <TabsContent value="recommendations">
              <RecommendationPage />
            </TabsContent>
          </div>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;