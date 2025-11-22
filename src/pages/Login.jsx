import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import bgImage from "../assets/background/knet-bg.jpg";
import { ArrowLeft, Lock, ShieldAlert } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await login(form.username.trim(), form.password);
      localStorage.setItem("fs-auth-token", result.token);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "登录失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen text-white flex items-center justify-center relative overflow-hidden font-mono"
      style={{
        backgroundImage: `linear-gradient(rgba(5,5,5,0.92), rgba(5,5,5,0.92)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 背景特效 (与 Home 保持一致) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

      {/* 返回按钮 */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-[#F3B61F] transition-colors z-20 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-xs font-bold tracking-widest">
          ABORT CONNECTION
        </span>
      </Link>

      <div className="w-full max-w-md mx-auto px-6 relative z-10">
        {/* 主卡片 */}
        <div className="border border-[#333] bg-[#0a0a0a]/95 backdrop-blur-md p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
          {/* 装饰性边角 (Cyberpunk 风格) */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#F3B61F]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#F3B61F]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#F3B61F]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#F3B61F]" />

          {/* 顶部 Logo 区域 */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 flex items-center justify-center text-2xl animate-pulse">
                🧿
              </div>
              <span className="text-3xl font-black italic tracking-tighter text-white">
                <span className="text-[#F3B61F]">Fairy</span>Search
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono tracking-[0.2em] border-t border-[#222] pt-3 w-fit mx-auto px-4">
              <Lock size={10} />
              <span>SECURE GATEWAY V.3.0</span>
            </div>
          </div>

          {/* 表单区域 */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-[#F3B61F] uppercase tracking-wider pl-1">
                Proxy ID // 用户名
              </label>
              <input
                type="text"
                value={form.username}
                onChange={handleChange("username")}
                placeholder="ENTER ID..."
                className="w-full bg-black border border-[#333] text-white px-4 py-3 text-sm focus:border-[#F3B61F] focus:outline-none transition-colors placeholder-gray-700 font-mono"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-[#F3B61F] uppercase tracking-wider pl-1">
                Access Key // 密码
              </label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
                className="w-full bg-black border border-[#333] text-white px-4 py-3 text-sm focus:border-[#F3B61F] focus:outline-none transition-colors placeholder-gray-700 font-mono"
                required
              />
            </div>

            {error && (
              <div className="bg-red-950/30 border border-red-900/50 text-red-500 text-xs p-3 flex items-center gap-2 animate-pulse">
                <ShieldAlert size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F3B61F] text-black font-black text-sm py-3.5 uppercase tracking-widest hover:bg-[#ffcd3e] disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group mt-4"
              style={{
                clipPath:
                  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
              }}
            >
              {loading ? (
                <span>VERIFYING...</span>
              ) : (
                <span className="flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                  INITIALIZE LINK{" "}
                  <span className="text-lg leading-none">›</span>
                </span>
              )}
            </button>

            {/* 新增：注册跳转链接 */}
            <div className="text-center mt-4">
              <Link 
                to="/register" 
                className="text-[10px] text-gray-500 hover:text-[#F3B61F] transition-colors font-mono tracking-wider border-b border-transparent hover:border-[#F3B61F]"
              >
                NO IDENTITY? APPLY FOR PROXY ACCESS &gt;&gt;
              </Link>
            </div>
          </form>

          {/* 底部警告 */}
          <div className="mt-8 pt-4 border-t border-dashed border-[#333] text-center">
            <div className="text-[10px] text-gray-600 leading-relaxed scale-90">
              WARNING: UNAUTHORIZED ACCESS ATTEMPTS WILL BE LOGGED AND REPORTED
              TO PUBLIC SECURITY SECTION 6.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
