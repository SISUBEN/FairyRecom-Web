export function GlitchText({ text, className = "" }) {
  return (
    <span className={`relative inline-block group cursor-default ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 left-[1px] -z-10 opacity-0 group-hover:opacity-70 text-red-500 animate-pulse">
        {text}
      </span>
      <span className="absolute inset-0 -left-[1px] -z-10 opacity-0 group-hover:opacity-70 text-cyan-500 animate-pulse delay-75">
        {text}
      </span>
    </span>
  );
}
