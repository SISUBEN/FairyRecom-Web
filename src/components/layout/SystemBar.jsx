import { Battery, Signal } from "lucide-react";

export function SystemBar() {
  return (
    <div className="h-8 bg-[#111] border-b border-[#333] flex items-center justify-between px-4 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-[#F3B61F]">
          <span className="w-2 h-2 bg-[#F3B61F] rounded-full animate-pulse" />
          INTER-KNOT NETWORK: CONNECTED
        </span>
        <span>LAT: 35.6895° N</span>
        <span>LNG: 139.6917° E</span>
      </div>
      <div className="flex items-center gap-4">
        <span>MEM: 64%</span>
        <span>HDD: ONLINE</span>
        <div className="flex items-center gap-1">
          <Battery size={12} />
          <span>98%</span>
        </div>
      </div>
    </div>
  );
}
