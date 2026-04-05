# 部署指南

本指南将帮助你将OpenRouter模型价格监控应用部署到GitHub Pages。

## 前提条件

- 已安装Git
- GitHub账号
- 本地已安装Node.js和npm

## 步骤 1: 准备项目

项目已经构建完成，构建结果在 `dist` 目录中。

## 步骤 2: 创建GitHub仓库

1. 登录你的GitHub账号
2. 点击右上角的"+"按钮，选择"New repository"
3. 填写仓库信息：
   - 仓库名称：例如 `openrouter-price-monitor`
   - 描述：OpenRouter模型价格监控应用
   - 选择"Public"或"Private"
   - 不要勾选"Initialize this repository with a README"（因为我们已经有项目文件）
   - 点击"Create repository"

## 步骤 3: 推送代码到GitHub

在项目根目录执行以下命令：

```bash
# 添加GitHub远程仓库
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 推送代码到GitHub
git push -u origin master
```

替换 `YOUR_USERNAME` 和 `YOUR_REPOSITORY_NAME` 为你的GitHub用户名和仓库名称。

## 步骤 4: 部署到GitHub Pages

### 方法1: 使用GitHub Actions（推荐）

1. 在项目根目录创建 `.github/workflows` 目录：
   ```bash
   mkdir -p .github/workflows
   ```

2. 创建 `deploy.yml` 文件：
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - master

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '20'
         - name: Install dependencies
           run: npm install
         - name: Build
           run: npm run build
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. 提交并推送这个文件：
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow for deployment"
   git push
   ```

4. 等待GitHub Actions完成部署。

### 方法2: 手动部署

1. 构建项目：
   ```bash
   npm run build
   ```

2. 进入 `dist` 目录并初始化一个新的Git仓库：
   ```bash
   cd dist
   git init
   git add .
   git commit -m "Deploy to GitHub Pages"
   ```

3. 推送到GitHub Pages分支：
   ```bash
   git push -f https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git master:gh-pages
   ```

4. 在GitHub仓库设置中，将"GitHub Pages"的"Source"设置为"gh-pages"分支。

## 步骤 5: 访问应用

部署完成后，你可以通过以下URL访问应用：
```
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME
```

## 注意事项

- 首次部署可能需要几分钟时间才能生效
- 确保 `package.json` 中的 `homepage` 字段设置正确（如果使用）
- 如果你修改了代码，只需提交并推送更改，GitHub Actions会自动重新部署（如果使用方法1）
