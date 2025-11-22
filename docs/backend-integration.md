# 后端对接指南（videoService / apiClient）

说明当前服务层设计、环境变量、接口约定、联调方式及可扩展点。

## 环境变量
- `VITE_API_BASE_URL`：后端基础地址，如 `https://api.example.com`。留空则使用本地 mock 数据。

## 服务层结构
- `src/services/apiClient.js`：统一封装 `fetch`，提供 `get` / `post`，自动拼 BASE_URL，非 2xx 抛错（携带 `status` / `body`）。
- `src/services/videoService.js`：视频领域入口  
  - `fetchVideos(params)`：列表查询（搜索/标签）  
  - `fetchVideoById(id)`：单条查询  
  - 后端不可用时自动回退 `src/data/mockVideos.js`

调用链：`App.jsx` → `fetchVideos` → `apiClient.get("/videos", params)`；`VITE_API_BASE_URL` 未设或请求失败时，回退为本地 mock。

## 接口约定

### GET /videos
- 查询参数  
  - `query` (string, 可选)：搜索关键字，命中标题或作者  
  - `tag` (string, 可选)：分类标签；当前示例 tab：`推荐|委托|终端|数据|工具|工程`，`推荐` 可视为全部/不传
- 响应 200：数组
```json
[
  {
    "id": "v-001",
    "title": "深空引力波观测：一号探针的未知响应与地面站联调",
    "author": "深航实验室",
    "views": 982000,
    "date": "2 小时前",
    "tag": "卫星",
    "duration": "12:45",
    "coverColor": "bg-red-500"
  }
]
```
- 状态码  
  - 200：正常（允许空数组）  
  - 4xx/5xx：前端抛错，`videoService` 会告警并回退 mock

### GET /videos/:id
- 响应 200：单对象（字段同上）
- 状态码  
  - 404：前端可当作不存在  
  - 4xx/5xx：抛错，`videoService` 尝试从 mock 查找

### 可选扩展字段（向后兼容）
- `thumbnail`：封面 URL（优先使用）  
- `publishedAt`：ISO 时间，便于前端做相对时间  
- `likes` / `comments`：用于 KPI 展示

## 错误处理期望
- `apiClient` 遇非 2xx 抛 `Error`，附带 `status` / `body`  
- `videoService` 捕获后 `console.warn` 并回退 mock  
- 建议后端错误体使用 `{ "message": "..." }`

## 联调步骤
1) 在根目录 `.env`/`.env.local` 设置：`VITE_API_BASE_URL=https://api.example.com`  
2) 运行 `npm run dev`（需先修复本机 Node/PowerShell 环境报错）  
3) 确认 CORS 允许 `/videos` 与 `/videos/:id`；如需认证，在 `apiClient` 中补充 header/cookie

## 常见调整位
- 认证：在 `apiClient` 增加 `Authorization` 头或凭证选项  
- 分页：为 `fetchVideos` 增加 `page`/`pageSize`，后端返回 `{ list, total }`；前端在网格上加分页控件  
- 排序：新增 `sort` 参数（如 `views_desc`），前端透传
