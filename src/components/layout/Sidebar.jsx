import { Disc, Grid, MessageSquare, Radio, Settings, User, Database, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { icon: Grid, label: "推荐 / HOME", key: "推荐" },
  { icon: Disc, label: "热点 / TRENDING", key: "热点" },
  { icon: Radio, label: "直播 / LIVE", key: "直播" },
  { icon: Database, label: "档案 / ARCHIVE", key: "档案" },
];

const SYSTEM_ITEMS = [
  { icon: MessageSquare, label: "私信 / DM" },
  { icon: User, label: "代理人 / PROXY" },
  { icon: Settings, label: "设置 / SETTING" },
];

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left flex items-center gap-3 p-3 cursor-pointer transition-all group relative
        ${active ? "text-[#F3B61F]" : "text-gray-400 hover:text-white"}
      `}
    >
      {active && <div className="absolute left-0 w-1 h-full bg-[#F3B61F]" />}
      <Icon size={20} className={active ? "animate-pulse" : ""} />
      <span className="font-mono text-sm font-bold">{label}</span>
      <div className="ml-auto opacity-0 group-hover:opacity-100 text-[10px] text-gray-600 font-mono">
        0010
      </div>
    </button>
  );
}

export function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-72 bg-[#0a0a0a] border-r border-[#333] hidden md:flex flex-col relative">
      <div className="p-6 border-b border-[#333]">
        <div className="text-3xl font-black italic tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8  flex items-center justify-center text-black font-bold ">
            🧿
          </div>
          <span className="text-[#F3B61F]">FairySearch</span>
        </div>
        <div className="text-[10px] text-gray-500 mt-1 font-mono">PROXY NETWORK V.3.0.1</div>
      </div>

      <div className="flex-1 py-6 space-y-1">
        <div className="px-4 text-xs text-gray-600 font-bold mb-2">NAVIGATION</div>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.key}
            onClick={() => onTabChange(item.key)}
          />
        ))}

        <div className="px-4 text-xs text-gray-600 font-bold mb-2 mt-8">SYSTEM</div>
        {SYSTEM_ITEMS.map((item) => (
          <NavItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>

      <div className="p-4 border-t border-[#333] bg-[#0f0f0f]">
        <Link
          to="/login"
          className="mb-3 block w-full text-center border border-[#333] text-sm text-[#F3B61F] py-2 hover:border-[#F3B61F] transition-colors"
        >
          <div className="inline-flex items-center gap-2 font-mono">
            <Lock size={14} />
            <span>登录 / LOGIN</span>
          </div>
        </Link>

        <div className="border border-[#333] p-2 bg-black relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#F3B61F] animate-[scan_2s_linear_infinite]" />
          <div className="flex justify-between items-end">
            <div className="text-[10px] text-gray-400 font-mono">
              <div>SIGNAL STRENGTH</div>
              <div className="text-[#F3B61F] text-lg font-bold">EXCELLENT</div>
            </div>
            <Radio className="text-[#F3B61F]" size={20} />
          </div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={`h-2 flex-1 ${index % 2 === 0 ? "bg-[#333]" : "bg-[#111]"}`} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
