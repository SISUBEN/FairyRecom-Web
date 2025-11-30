
# 🧿 FairySearch Web | 绳网视频终端

> 一个基于 React + Vite 构建的赛博朋克风格视频检索终端前端项目。
> A Cyberpunk-themed video search terminal interface built with React & Vite.

## 🛠️ 技术栈 / Tech Stack

- **Core:** React 18, Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router DOM v6
- **State:** React Hooks

## ✨ 功能特性 / Features

- 📟 **沉浸式终端 UI**：复古 CRT 风格与现代赛博朋克设计的结合。
- 🔐 **身份验证**：完整的登录 (Login) 与注册 (Register) 流程。
- 👤 **用户档案**：包含活动日志与系统状态的个人中心 (Profile)。
- 🎬 **视频网格**：响应式视频卡片展示与圆角裁剪设计。
- 📱 **完全响应式**：适配桌面端与移动端设备。

## 🚀 本地开发 / Local Development

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
在项目根目录创建 `.env` 文件：
```env
# 后端 API 地址
VITE_API_URL=http://localhost:8000
```

### 3. 启动开发服务器
```bash
npm run dev
```
访问: `http://localhost:5173`

## 🐳 Docker 部署 / Docker Deployment

### 1. 构建镜像 (Build)
构建时可以通过 `--build-arg` 传入后端 API 地址。

```bash
# 注意：将 http://localhost:8000 替换为你真实的后端地址
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:8000 \
  -t fairysearch-web .
```

### 2. 运行容器 (Run)
将容器的 80 端口映射到宿主机的 8080 端口。

```bash
docker run -d \
  -p 8080:80 \
  --name fairy-web \
  fairysearch-web
```

访问: `http://localhost:8080`

### 3. 常用管理命令
```bash
# 停止容器
docker stop fairy-web

# 删除容器
docker rm fairy-web

# 查看日志
docker logs fairy-web
```

## 📂 项目结构 / Project Structure

```text
src/
├── assets/         # 静态资源 (背景图等)
├── components/     # 公共组件 (Header, Sidebar, UI)
├── features/       # 业务功能组件 (VideoGrid)
├── pages/          # 页面视图 (Home, Login, Profile)
├── services/       # API 服务 (authService)
├── App.jsx         # 路由配置
└── main.jsx        # 入口文件
```