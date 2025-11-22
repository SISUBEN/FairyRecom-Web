import { apiClient, API_BASE_URL } from "./apiClient";
import { mockVideos } from "../data/mockVideos";

export async function fetchVideos(params = {}) {
  if (API_BASE_URL) {
    try {
      const data = await apiClient.get("/videos", params);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.warn("[videoService] 后端请求失败，已回退为本地 mock 数据", error);
    }
  }

  const { query = "", tag } = params;
  const normalizedQuery = query.toLowerCase();

  return mockVideos.filter((video) => {
    const hasTag = tag ? video.tag === tag : true;
    const matchText =
      video.title.toLowerCase().includes(normalizedQuery) ||
      video.author.toLowerCase().includes(normalizedQuery);

    return hasTag && matchText;
  });
}

export async function fetchVideoById(id) {
  if (API_BASE_URL) {
    try {
      return await apiClient.get(`/videos/${id}`);
    } catch (error) {
      console.warn("[videoService] 获取单视频失败，回退 mock", error);
    }
  }

  return mockVideos.find((video) => video.id === id);
}
