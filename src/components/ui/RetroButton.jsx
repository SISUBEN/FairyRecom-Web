export function RetroButton({ children, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-2 font-bold text-sm tracking-widest uppercase transition-all duration-100
        clip-path-button
        ${active
          ? "bg-[#F3B61F] text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]"
          : "bg-[#1a1a1a] text-white border border-[#333] hover:bg-[#333] hover:text-[#F3B61F]"}
      `}
      style={{
        clipPath:
          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
      }}
    >
      {children}
    </button>
  );
}
