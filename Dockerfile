# --- 阶段 1: 构建 (Builder) ---
    FROM node:18-alpine AS builder

    # 设置工作目录
    WORKDIR /app
    
    # 复制依赖文件并安装
    COPY package*.json ./
    RUN npm install
    
    # 复制源代码
    COPY . .
    
    # 接收构建参数 (API 地址)，用于 Vite 打包时替换
    ARG VITE_API_BASE_URL
    ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
    
    # 执行构建 (生成 dist 目录)
    RUN npm run build
    
    # --- 阶段 2: 部署 (Runner) ---
    FROM nginx:alpine
    
    # 复制构建产物到 Nginx 目录
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # 复制自定义 Nginx 配置 (为了解决 React Router 刷新 404 问题)
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # 暴露端口
    EXPOSE 80
    
    # 启动 Nginx
    CMD ["nginx", "-g", "daemon off;"]