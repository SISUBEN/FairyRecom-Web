import { VideoCard } from "./VideoCard";

export function VideoGrid({ videos, loading }) {
  if (loading) {
    return (
      <div className="mt-12 py-8 border-t border-dashed border-[#333] text-center font-mono text-xs text-gray-400">
        数据流加载中……
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div className="mt-12 py-8 border-t border-dashed border-[#333] text-center font-mono text-xs text-gray-400">
        暂无内容，试试修改筛选条件。
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
