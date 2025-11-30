import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService"; // 确保引入了 register
import bgImage from "../assets/background/knet-bg.jpg";
import { ArrowLeft, UserPlus, ShieldAlert, Mail } from "lucide-react";

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("密码不匹配 / PASSWORD MISMATCH");
      return;
    }

    setLoading(true);
    try {
      // 调用注册接口
      await register(form.username, form.password, form.email);
      // 注册成功后跳转登录
      navigate("/login", { state: { message: "REGISTRATION SUCCESSFUL. PLEASE LOGIN." } });
    } catch (err) {
      setError(err.message || "注册失败");
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
      {/* 背景特效 */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

      <Link 
        to="/login" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-[#F3B61F] transition-colors z-20 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
        <span className="text-xs font-bold tracking-widest">BACK TO LOGIN</span>
      </Link>

      <div className="w-full max-w-md mx-auto px-6 relative z-10">
        <div className="border border-[#333] bg-[#0a0a0a]/95 backdrop-blur-md p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
            
          {/* 装饰角标 */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#F3B61F]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#F3B61F]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#F3B61F]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#F3B61F]" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
               <div className="w-8 h-8 flex items-center justify-center text-2xl text-[#F3B61F]">
                <UserPlus size={28} />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-white">
                NEW PROXY
              </span>
            </div>
            <div className="text-[10px] text-gray-500 font-mono tracking-[0.2em] border-t border-[#222] pt-3 w-fit mx-auto px-4">
                REGISTRATION PROTOCOL
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[#F3B61F] uppercase tracking-wider pl-1">
                Proxy ID // 用户名
              </label>
              <input
                type="text"
                value={form.username}
                onChange={handleChange("username")}
                className="w-full bg-black border border-[#333] text-white px-4 py-2 text-sm focus:border-[#F3B61F] focus:outline-none transition-colors placeholder-gray-700 font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[#F3B61F] uppercase tracking-wider pl-1">
                Contact // 邮箱
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className="w-full bg-black border border-[#333] text-white px-4 py-2 text-sm focus:border-[#F3B61F] focus:outline-none transition-colors placeholder-gray-700 font-mono"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[#F3B61F] uppercase tracking-wider pl-1">
                Key // 密码
              </label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                className="w-full bg-black border border-[#333] text-white px-4 py-2 text-sm focus:border-[#F3B61F] focus:outline-none transition-colors placeholder-gray-700 font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[#F3B61F] uppercase tracking-wider pl-1">
                Verify Key // 确认密码
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                className="w-full bg-black border border-[#333] text-white px-4 py-2 text-sm focus:border-[#F3B61F] focus:outline-none transition-colors placeholder-gray-700 font-mono"
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
              className="w-full bg-[#F3B61F] text-black font-black text-sm py-3 uppercase tracking-widest hover:bg-[#ffcd3e] disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group mt-6"
              style={{
                clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
              }}
            >
              {loading ? "PROCESSING..." : "REGISTER IDENTITY"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}