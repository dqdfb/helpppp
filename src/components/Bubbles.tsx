const PALETTES = [
  // white
  "radial-gradient(circle at 30% 28%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.55) 25%, rgba(200,225,255,0.15) 60%, transparent 72%)",
  // iridescent pink/blue
  "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.95) 0%, rgba(255,210,235,0.35) 30%, rgba(180,220,255,0.25) 60%, transparent 72%)",
  // aqua
  "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.95) 0%, rgba(190,240,255,0.4) 30%, rgba(140,200,255,0.2) 60%, transparent 72%)",
  // soft lilac
  "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.95) 0%, rgba(220,210,255,0.35) 30%, rgba(180,190,255,0.2) 60%, transparent 72%)",
];

export function Bubbles() {
  const bubbles = Array.from({ length: 26 }, (_, i) => {
    const size = 8 + Math.random() * 46;
    return {
      id: i,
      left: Math.random() * 100,
      size,
      rise: 10 + Math.random() * 14,
      sway: 3 + Math.random() * 5,
      shimmer: 2 + Math.random() * 3,
      swayAmp: 12 + Math.random() * 40,
      delay: -Math.random() * 18,
      opacity: 0.55 + Math.random() * 0.4,
      palette: PALETTES[Math.floor(Math.random() * PALETTES.length)],
      blur: Math.random() < 0.25 ? Math.random() * 1.5 : 0,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute animate-bubble"
          style={{
            left: `${b.left}%`,
            bottom: `-60px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.rise}s`,
            animationDelay: `${b.delay}s`,
            ["--bubble-opacity" as string]: `${b.opacity}`,
          }}
        >
          <div
            className="w-full h-full animate-bubble-sway"
            style={{
              animationDuration: `${b.sway}s`,
              animationDelay: `${b.delay * 0.5}s`,
              ["--sway" as string]: `${b.swayAmp}px`,
            }}
          >
            <div
              className="w-full h-full rounded-full animate-bubble-shimmer"
              style={{
                background: b.palette,
                border: "1px solid rgba(255,255,255,0.65)",
                boxShadow:
                  "inset -2px -4px 10px rgba(120,170,220,0.15), inset 3px 4px 8px rgba(255,255,255,0.35), 0 2px 12px rgba(255,255,255,0.15)",
                filter: b.blur ? `blur(${b.blur}px)` : undefined,
                animationDuration: `${b.shimmer}s`,
                animationDelay: `${b.delay * 0.3}s`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
