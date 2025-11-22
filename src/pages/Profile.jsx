import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, User, Shield, Activity, LogOut, Database, Cpu } from "lucide-react";
import { logout } from "../services/authService";
import { SystemBar } from "../components/layout/SystemBar";
import { RetroButton } from "../components/ui/RetroButton";
import bgImage from "../assets/background/knet-bg.jpg";

// 模拟用户数据 (实际项目中应从 API 获取)
const MOCK_USER = {
  username: "PHAETHON",
  role: "LEGENDARY PROXY",
  level: 45,
  exp: "8,920 / 10,000",
  id: "UID-992-831-001",
  joinDate: "2023-11-15",
  credits: 125800,
};

// 模拟活动日志
const ACTIVITY_LOGS = [
  { id: 1, action: "LOGIN_SUCCESS", time: "10:42:05", ip: "192.168.X.X" },
  { id: 2, action: "DATA_QUERY", time: "10:45:12", target: "ARCHIVE_04" },
  { id: 3, action: "PROXY_LINK", time: "11:20:00", status: "STABLE" },
  { id: 4, action: "SYSTEM_SCAN", time: "12:01:33", result: "CLEAN" },
];

export function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载效果
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen text-white font-mono relative overflow-hidden flex flex-col"
      style={{
        backgroundImage: `linear-gradient(rgba(5,5,5,0.95), rgba(5,5,5,0.95)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SystemBar />

      {/* 背景网格特效 */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

      <div className="flex-1 p-6 md:p-12 overflow-y-auto relative z-10">
        {/* 顶部导航 */}
        <div className="max-w-5xl mx-auto mb-8 flex justify-between items-center border-b border-[#333] pb-4">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-[#F3B61F] transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold tracking-widest">RETURN TO TERMINAL</span>
          </Link>
          <div className="text-[#F3B61F] font-bold text-xl tracking-tighter italic">
            USER_PROFILE // <span className="text-white">V.3.0</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-20 text-[#F3B61F] animate-pulse">
            LOADING USER DATA...
          </div>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 左侧：用户主卡片 */}
            <div className="lg:col-span-1 space-y-6">
              <div className="border border-[#333] bg-[#0a0a0a]/80 p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#F3B61F]" />
                
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 bg-[#111] border-2 border-[#333] rounded-full flex items-center justify-center mb-4 relative group-hover:border-[#F3B61F] transition-colors">
                    <User size={40} className="text-gray-400 group-hover:text-white" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#F3B61F] rounded-full flex items-center justify-center text-black font-bold text-xs border-2 border-black">
                      {MOCK_USER.level}
                    </div>
                  </div>
                  <h2 className="text-2xl font-black italic tracking-tight text-white mb-1">
                    {MOCK_USER.username}
                  </h2>
                  <div className="text-xs text-[#F3B61F] border border-[#F3B61F]/30 px-2 py-0.5 bg-[#F3B61F]/10">
                    {MOCK_USER.role}
                  </div>
                </div>

                <div className="space-y-4 text-sm text-gray-400 border-t border-[#333] pt-4">
                  <div className="flex justify-between">
                    <span>UID</span>
                    <span className="text-white font-mono">{MOCK_USER.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>REGISTERED</span>
                    <span className="text-white font-mono">{MOCK_USER.joinDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>CREDITS</span>
                    <span className="text-[#F3B61F] font-bold flex items-center gap-1">
                      <Database size={12} /> {MOCK_USER.credits.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <RetroButton onClick={handleLogout} className="w-full flex justify-center items-center gap-2">
                    <LogOut size={16} />
                    DISCONNECT
                  </RetroButton>
                </div>
              </div>

              {/* 系统状态小部件 */}
              <div className="border border-[#333] bg-[#0a0a0a]/80 p-4">
                <div className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2">
                  <Cpu size={14} /> SYSTEM STATUS
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>SYNC RATE</span>
                    <span className="text-[#F3B61F]">98.2%</span>
                  </div>
                  <div className="w-full h-1 bg-[#222]">
                    <div className="h-full bg-[#F3B61F] w-[98%]" />
                  </div>
                  <div className="flex justify-between text-xs mt-2">
                    <span>MEMORY</span>
                    <span className="text-green-500">OPTIMAL</span>
                  </div>
                  <div className="w-full h-1 bg-[#222]">
                    <div className="h-full bg-green-500 w-[45%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：详细信息与日志 */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* 经验值/进度 */}
              <div className="border border-[#333] bg-[#0a0a0a]/80 p-6">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Shield size={18} className="text-[#F3B61F]" /> 
                    PROXY REPUTATION
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">{MOCK_USER.exp} EXP</span>
                </div>
                <div className="w-full h-4 bg-[#111] border border-[#333] relative overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#F3B61F]/50 to-[#F3B61F]" 
                    style={{ width: '89%' }}
                  />
                  <div className="absolute inset-0 bg-[url('/src/assets/pattern.png')] opacity-20" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Next Level: Access to "Hollow Zero" restricted archives.
                </p>
              </div>

              {/* 活动日志 */}
              <div className="border border-[#333] bg-[#0a0a0a]/80 p-6 flex-1 min-h-[300px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Activity size={18} className="text-[#F3B61F]" /> 
                    ACTIVITY LOG
                  </h3>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-green-500">LIVE RECORDING</span>
                  </div>
                </div>

                <div className="space-y-0 font-mono text-sm">
                  <div className="grid grid-cols-12 text-[10px] text-gray-600 border-b border-[#333] pb-2 mb-2 px-2">
                    <div className="col-span-2">TIME</div>
                    <div className="col-span-4">ACTION</div>
                    <div className="col-span-6">DETAILS</div>
                  </div>
                  
                  {ACTIVITY_LOGS.map((log) => (
                    <div key={log.id} className="grid grid-cols-12 py-3 px-2 border-b border-[#333]/50 hover:bg-[#F3B61F]/5 transition-colors group">
                      <div className="col-span-2 text-gray-400 group-hover:text-white">{log.time}</div>
                      <div className="col-span-4 text-[#F3B61F]">{log.action}</div>
                      <div className="col-span-6 text-gray-500 truncate">
                        {log.ip || log.target || log.status || log.result}
                      </div>
                    </div>
                  ))}
                  
                  <div className="py-3 px-2 text-center text-xs text-gray-600 animate-pulse">
                    _ WAITING FOR NEW EVENTS...
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}