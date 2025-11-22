import { Bell, Search, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export function Header({ searchQuery, onSearchChange, time, day, onMenuToggle, menuOpen = false }) {
  // 简单判断是否登录
  const isLoggedIn = !!localStorage.getItem("fs-auth-token");

  return (
    <header className="h-16 md:h-20 border-b border-[#333] flex items-center justify-between px-4 md:px-8 bg-[#0a0a0a]/90 backdrop-blur-sm z-20">
      <div className="flex-1 max-w-2xl mr-8 relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#F3B61F]">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="输入关键字检索……"
          className="w-full bg-black border-2 border-[#333] text-white h-10 md:h-12 pl-12 pr-4 focus:border-[#F3B61F] focus:outline-none transition-colors font-mono text-sm skew-x-[-5deg]"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gray-500 group-focus-within:border-[#F3B61F] transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gray-500 group-focus-within:border-[#F3B61F] transition-colors" />
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button
          className="md:hidden p-2 border border-[#333] text-gray-300 hover:text-[#F3B61F] hover:border-[#F3B61F] transition-colors"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="text-right hidden lg:block">
          <div className="text-xl font-bold font-mono tracking-tighter">{time}</div>
          <div className="text-[10px] text-[#F3B61F]">{day}</div>
        </div>

        <div className="w-[1px] h-8 bg-[#333]" />

        <button className="relative p-2 hover:text-[#F3B61F] transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#F3B61F] rounded-full animate-pulse" />
        </button>

        <Link 
          to={isLoggedIn ? "/profile" : "/login"} 
          className="flex items-center gap-3 pl-4 border-l border-[#333] cursor-pointer group"
        >
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold group-hover:text-[#F3B61F] transition-colors">
              {isLoggedIn ? "PHAETHON" : "GUEST"}
            </div>
            <div className="text-[10px] text-gray-500 font-mono">
              {isLoggedIn ? "LEVEL 45" : "LOGIN REQUIRED"}
            </div>
          </div>
          <div className={`w-10 h-10 bg-[#222] border ${isLoggedIn ? 'border-[#444]' : 'border-[#333]'} flex items-center justify-center overflow-hidden relative rounded-sm group-hover:border-[#F3B61F] transition-colors`}>
            <User size={20} className={isLoggedIn ? "text-white" : "text-gray-500"} />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10" />
          </div>
        </Link>
      </div>
    </header>
  );
}
