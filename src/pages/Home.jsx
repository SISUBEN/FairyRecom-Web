import { useEffect, useMemo, useState } from "react";
import { Play, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { SystemBar } from "../components/layout/SystemBar";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { RetroButton } from "../components/ui/RetroButton";
import { GlitchText } from "../components/ui/GlitchText";
import { VideoGrid } from "../features/videos/VideoGrid";
import { useClock } from "../hooks/useClock";
import { fetchVideos } from "../services/videoService";
import bgImage from "../assets/background/knet-bg.jpg";

const FEATURE_TABS = ["推荐", "委托", "终端", "数据", "工具", "工程"];

const HERO = {
  badge: "深夜情报",
  title: "深空终端重启：远程节点联机实录",
  description:
    "多颗卫星同步校时，量子节点即将上线。以下素材为最新链路记录，包含高能画面与实时波形，请在安全环境下查看。",
};

export function Home() {
  const { time, day } = useClock();
  const [activeTab, setActiveTab] = useState(FEATURE_TABS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadVideos(searchQuery, activeTab);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, activeTab]);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    const targetTag = activeTab === "推荐" ? undefined : activeTab;

    return videos.filter((video) => {
      const matchSearch =
        video.title.toLowerCase().includes(normalizedQuery) ||
        video.author.toLowerCase().includes(normalizedQuery);
      const matchTag = targetTag ? video.tag === targetTag : true;
      return matchSearch && matchTag;
    });
  }, [videos, searchQuery, activeTab]);

  async function loadVideos(query = "", tab = activeTab) {
    setLoading(true);
    const data = await fetchVideos({ query, tag: tab === "推荐" ? undefined : tab });
    setVideos(data);
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen text-white selection:bg-[#F3B61F] selection:text-black overflow-x-hidden relative"
      style={{
        backgroundImage: `linear-gradient(rgba(5,5,5,0.85), rgba(5,5,5,0.85)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
      <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

      <SystemBar />

      <div className="flex h-[calc(100vh-32px)]">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 flex flex-col overflow-hidden relative bg-[#080808]/85 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px]">
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            time={time}
            day={day}
            onMenuToggle={() => setMobileMenuOpen((v) => !v)}
            menuOpen={mobileMenuOpen}
          />

          {mobileMenuOpen && (
            <div className="md:hidden border-b border-[#333] bg-black/85 backdrop-blur-sm px-4 py-3 space-y-3">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {FEATURE_TABS.map((tab) => (
                  <RetroButton
                    key={tab}
                    active={activeTab === tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {tab}
                  </RetroButton>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-300">
                <span>快捷入口</span>
                <Link to="/login" className="text-[#F3B61F] underline">
                  登录
                </Link>
              </div>
            </div>
          )}

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
            <div className="hidden md:flex gap-4 mb-6 lg:mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {FEATURE_TABS.map((tab) => (
                <RetroButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                  {tab}
                </RetroButton>
              ))}
            </div>

            <div className="w-full h-56 md:h-64 lg:h-80 bg-[#111] border border-[#333] mb-8 lg:mb-12 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10 flex flex-col justify-center p-6 md:p-10 lg:p-12">
                <div className="inline-flex items-center gap-2 bg-[#F3B61F] text-black px-2 py-1 text-xs font-bold w-fit mb-4 skew-x-[-10deg]">
                  <Zap size={12} fill="black" />
                  <span>{HERO.badge}</span>
                </div>
                <h1 className="text-2xl md:text-5xl font-black italic tracking-tight mb-2 max-w-2xl leading-tight">
                  <GlitchText text={HERO.title} />
                </h1>
                <p className="text-gray-400 max-w-lg mb-6 font-mono text-xs md:text-sm">{HERO.description}</p>
                <button className="flex items-center gap-2 bg-white text-black px-5 md:px-6 py-2.5 md:py-3 font-bold text-sm hover:bg-[#F3B61F] transition-colors w-fit clip-path-button skew-x-[-10deg]">
                  <Play size={16} fill="black" />
                  <span>立即播放</span>
                </button>
              </div>
              <div className="absolute right-0 top-0 w-2/3 h-full bg-[#1a1a1a] clip-path-diagonal flex items-center justify-center overflow-hidden">
                <div
                  className="w-full h-full opacity-30"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute right-6 md:right-20 top-10 text-6xl md:text-9xl font-black text-[#222] select-none pointer-events-none">
                  ZERO
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-8 bg-[#F3B61F]" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">实时委托情报</h2>
              <div className="h-[1px] flex-1 bg-[#333]" />
              <div className="text-xs font-mono text-gray-500">UPDATED: 10 MINS AGO</div>
            </div>

            <VideoGrid videos={filteredVideos} loading={loading} />

            <div className="mt-10 md:mt-12 py-8 border-t border-dashed border-[#333] text-center font-mono text-xs text-gray-600 animate-pulse">
              /// END OF DATA STREAM /// <br />
              LOAD MORE? [Y/N] <span className="inline-block w-2 h-4 bg-[#F3B61F] align-middle ml-1 animate-blink" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
