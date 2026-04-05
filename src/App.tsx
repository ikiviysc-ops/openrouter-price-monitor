import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/layout/BackToTop';
import { FilterBar } from './components/filter/FilterBar';
import { ModelList } from './components/model/ModelList';
import { RecommendationPage } from './pages/RecommendationPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { useModelStore } from './store/modelStore';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { setActiveTab, models, filteredModels, activeTab } = useModelStore();

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
    <div className="min-h-screen text-white">
      <div className="bg-decoration"></div>
      <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="glass mx-0 mb-6 p-6 rounded-2xl">
          <h1 className="text-2xl font-bold">OpenRouter模型价格监控</h1>
        </div>
        
        <Tabs defaultValue="models" className="w-full" onValueChange={handleTabChange}>
          <div className="glass p-2 mb-6 rounded-2xl">
            <TabsList className="flex overflow-x-auto w-full gap-2">
              <TabsTrigger value="models" className="flex-shrink-0 bg-white/20 hover:bg-white/30 data-[state=active]:bg-white/40 text-white">
                模型列表 <span className="ml-2 bg-white/30 px-2 py-0.5 rounded-full text-xs">{models.length}</span>
              </TabsTrigger>
              <TabsTrigger value="free" className="flex-shrink-0 bg-white/20 hover:bg-white/30 data-[state=active]:bg-white/40 text-white">
                免费模型 <span className="ml-2 bg-white/30 px-2 py-0.5 rounded-full text-xs">{models.filter(m => m.isFree).length}</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex-shrink-0 bg-white/20 hover:bg-white/30 data-[state=active]:bg-white/40 text-white">
                推荐模型 <span className="ml-2 bg-white/30 px-2 py-0.5 rounded-full text-xs">{models.length}</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="models" className="space-y-6">
            <div className="glass p-4 rounded-2xl">
              <FilterBar />
            </div>
            <ModelList />
          </TabsContent>
          
          <TabsContent value="free" className="space-y-6">
            <div className="glass p-6 rounded-2xl mb-6">
              <h3 className="text-lg font-semibold mb-4">免费模型</h3>
              <p className="text-white/80">
                以下是当前可用的免费模型，适合简单任务和快速响应。
              </p>
            </div>
            <ModelList />
          </TabsContent>
          
          <TabsContent value="recommendations">
            <RecommendationPage />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;