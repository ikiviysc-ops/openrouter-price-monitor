# OpenRouter 模型价格监控

一个美观、高效的 OpenRouter 模型价格监控工具，帮助您快速了解和比较各种 AI 模型的价格、能力和性能。

## 🚀 在线预览

**项目已部署到 GitHub Pages，您可以直接访问监控页面：**

[OpenRouter 模型价格监控](https://ikiviysc-ops.github.io/openrouter-price-monitor)

**其他访问方式：**

1. **查看源代码**：[GitHub 仓库](https://github.com/ikiviysc-ops/openrouter-price-monitor)

2. **本地运行**：克隆仓库后按照下方的安装指南运行

3. **部署预览**：可以使用 Vercel、Netlify 等平台一键部署

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ikiviysc-ops/openrouter-price-monitor)

## ✨ 主要功能

- **实时模型数据**：从 OpenRouter API 获取最新的模型信息
- **价格比较**：以百万 token 为单位显示价格，方便比较
- **模型分类**：按技能分类展示模型（写代码、内容创作、图像生成等）
- **综合评分**：基于价格、能力、上下文长度等因素的综合评分
- **毛玻璃效果**：现代化的毛玻璃 UI 设计
- **响应式布局**：适配各种屏幕尺寸
- **一键返回顶部**：方便长页面浏览
- **免费模型筛选**：快速找到免费可用的模型

## 🛠 技术栈

- **前端框架**：React + TypeScript
- **构建工具**：Vite
- **状态管理**：Zustand
- **UI 组件**：shadcn/ui
- **样式**：Tailwind CSS
- **图标**：Lucide React
- **API**：OpenRouter API

## 📦 安装和运行

### 前置条件

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 预览生产构建

```bash
npm run preview
# 或
yarn preview
```

## 📁 项目结构

```
src/
├── components/
│   ├── filter/         # 筛选组件
│   ├── layout/         # 布局组件
│   ├── model/          # 模型相关组件
│   ├── recommendation/ # 推荐相关组件
│   └── ui/             # 通用 UI 组件
├── lib/
│   ├── api.ts          # API 调用
│   └── models.json     # 模型数据缓存
├── pages/
│   ├── Home.tsx        # 首页
│   └── RecommendationPage.tsx # 推荐页面
├── store/
│   └── modelStore.ts   # 模型状态管理
├── types/
│   └── index.ts        # TypeScript 类型定义
├── App.tsx             # 应用主组件
└── main.tsx            # 应用入口
```

## 🌟 特色功能

### 毛玻璃 UI 设计
现代化的毛玻璃效果，提供沉浸式的视觉体验，让界面更加美观和专业。

### 智能推荐系统
基于以下因素综合评分推荐模型：
- 价格（越低越好）
- 能力（支持的技能越多越好）
- 上下文长度（越长越好）
- 支持的参数数量
- 是否免费
- 模型新鲜度

### 实时数据
通过 OpenRouter API 获取最新的模型数据，确保信息的准确性和时效性。

### 响应式设计
完美适配桌面端、平板和移动设备，提供一致的用户体验。

## 📚 如何使用

1. **浏览模型列表**：查看所有可用的模型，按价格或名称排序
2. **筛选免费模型**：快速找到免费可用的模型
3. **查看推荐**：按技能分类查看推荐模型，每个类别显示评分最高的 10 个模型
4. **比较价格**：以百万 token 为单位比较不同模型的价格
5. **查看能力**：了解每个模型支持的技能和特性

## 🔄 数据更新

- 应用启动时自动从 OpenRouter API 获取最新模型数据
- 点击页面顶部的「刷新」按钮手动更新数据
- 数据获取失败时使用本地缓存作为 fallback

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 仓库
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 打开 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

如果您有任何问题或建议，欢迎联系我们。

---

**享受使用 OpenRouter 模型价格监控工具！** 🎉