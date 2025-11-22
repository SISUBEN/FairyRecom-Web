import { Play } from "lucide-react";

export function VideoCard({ video }) {
  return (
    <article className="group relative bg-black border border-[#333] hover:border-[#F3B61F] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(243,182,31,0.1)]">
      <div className={`aspect-video ${video.coverColor} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs font-mono text-white border border-[#333]">
          {video.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-[#F3B61F] flex items-center justify-center text-black shadow-lg">
            <Play fill="black" size={20} />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700" />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#222] text-[#F3B61F] border border-[#F3B61F]/30">
            #{video.tag}
          </span>
          <button className="text-gray-500 hover:text-white">
            <div className="rotate-90 text-xs">...</div>
          </button>
        </div>
        <h3 className="font-bold text-sm leading-snug mb-3 line-clamp-2 group-hover:text-[#F3B61F] transition-colors">
          {video.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px]">
            {video.author[0]}
          </div>
          <span className="text-xs text-gray-400 font-medium">{video.author}</span>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 border-t border-[#222] pt-2">
          <span className="flex items-center gap-1">
            <div className="w-1 h-1 bg-gray-500 rounded-full" />
            {Intl.NumberFormat("zh-CN", { notation: "compact" }).format(video.views)} VIEWS
          </span>
          <span>{video.date}</span>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-[#F3B61F] transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-[#F3B61F] transition-colors" />
    </article>
  );
}
