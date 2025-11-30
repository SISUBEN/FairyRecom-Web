# 前端扩展指南

介绍当前 Vite/React/Tailwind 的组织方式，以及安全扩展的入口。

## 目录结构（src/）
- `App.jsx`：页面编排，tab/搜索状态，Hero 区域，视频网格。
- `main.jsx`：入口挂载，导入全局样式。
- `index.css`：全局样式与 Tailwind 指令。
- `components/layout/*`：布局骨架（SystemBar、Sidebar、Header）。
- `components/ui/*`：可复用的小组件（GlitchText、RetroButton）。
- `features/videos/*`：视频域 UI（VideoCard、VideoGrid）。
- `services/*`：API 服务层（`apiClient`、`videoService`）。
- `data/*`：本地 mock 数据。
- `hooks/*`：共享 Hook（`useClock`）。

## 样式与 Tailwind
- Tailwind 扫描路径：`./src/**/*.{js,jsx,ts,tsx}`（见 `tailwind.config.js`）。
- 自定义工具类在 `index.css`：`clip-path-diagonal`、`scrollbar-hide`、`animate-blink`、扫描动画等。
- 新的全局类尽量少，优先使用 Tailwind 组合。

## 状态 / 数据流
- `App` 维护：`activeTab`、`searchQuery`、`videos`、`loading`。
- 数据获取：`fetchVideos`（`videoService`），后端缺失时回退 mock。
- 过滤：基于 tab + 搜索在前端进行二次过滤。
- 时钟：`useClock` 返回 `{ time, day }` 用于 Header。

## 如何新增功能
1) **新领域功能**：在 `src/features/<domain>/` 下创建 UI + hooks；服务调用放在 `src/services/`。
2) **新 API 调用**：新增 `<domain>Service.js`，复用 `apiClient`，保持响应字段统一（如 id/title）。
3) **新 UI 原子件**：放在 `components/ui/`，避免重复样式。
4) **全局状态**：若状态提升过多，可引入轻量状态库（Zustand/Redux Toolkit）放置 `src/store/`，按领域拆分。
5) **路由**：引入 `react-router-dom`，将页面放在 `src/pages/`，复用布局壳。

## 后端友好模式
- `VITE_API_BASE_URL` 为空则自动使用 mock；非 2xx 会抛错并在 `videoService` 回退。
- 列表调用可扩展分页/排序：在 `fetchVideos` 传递 `page`、`pageSize`、`sort`，并在 UI 加控件。
- 请求失败可在 feature 层做 toast/兜底提示。

## 测试 / 校验
- 若启用测试（推荐 Vitest + Testing Library），按功能放在 `src/features/<domain>/__tests__/`。
- 服务层测试可 mock `fetch`，断言请求路径与参数。

## 性能与体验
- 搜索已做 200ms 简单防抖；如请求量大可抽成专用 debounce hook。
- 新页面可用 `React.lazy`/`Suspense` 懒加载。
- 若改为图片封面，给 `VideoCard` 添加 `thumbnail` 支持并保留颜色 fallback。

## 主题 / 视觉
- 目前是 CRT/控制台风；如需换肤，可把主色抽为 CSS 变量放在 `:root`。
- 保持背景纹理和动画在 `index.css`，新主题尽量复用变量减少样式分叉。
