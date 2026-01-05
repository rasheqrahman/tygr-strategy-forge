
const HeroBackground = () => (
  <div className="absolute inset-0 z-0">
    <div className="absolute right-0 top-0 w-full h-full">
      <svg className="w-full h-full opacity-40" viewBox="0 0 800 600" fill="none">
        <defs>
          <radialGradient id="spiralGradient" cx="70%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#ea580c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        {Array.from({ length: 25 }, (_, i) => {
          const radius = 50 + i * 20;
          const strokeWidth = Math.max(1, 5 - i * 0.1);
          const opacity = Math.max(0.15, 0.9 - i * 0.025);
          return <g key={i}>
            <circle cx="560" cy="300" r={radius} fill="none" stroke="url(#spiralGradient)" strokeWidth={strokeWidth} opacity={opacity} />
            {Array.from({ length: Math.floor(radius / 10) }, (_, j) => {
              const angle = j / Math.floor(radius / 10) * 2 * Math.PI + i * 0.3;
              const x = 560 + radius * Math.cos(angle);
              const y = 300 + radius * Math.sin(angle);
              return <circle key={j} cx={x} cy={y} r="1.5" fill="#ffffff" opacity={opacity * 0.8} />;
            })}
          </g>;
        })}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-900/20 to-slate-900"></div>
    </div>
  </div>
);

export default HeroBackground;
