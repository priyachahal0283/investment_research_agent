import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function BootSplash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8">
      {/* Centered InvestIQ Branding */}
      <div
        className="company-3d flex flex-col items-center justify-center"
        style={{
          fontSize: "clamp(38px, 8vw, 84px)",
        }}
      >
        <span
          className="block text-ink-faint font-mono font-medium tracking-[0.35em]"
          style={{
            fontSize: "0.32em",
            marginBottom: 10,
            opacity: 0,
            animation: "fadeIn .6s ease forwards .1s",
          }}
        >
          INVESTIQ LABS PRESENTS
        </span>
        <span className="leading-none">InvestIQ</span>
        <span
          className="block font-mono tracking-[0.25em] text-neon-cyan"
          style={{
            fontSize: "0.18em",
            marginTop: 14,
            opacity: 0,
            animation: "fadeIn .6s ease forwards 0.4s",
          }}
        >
          AI INVESTMENT RESEARCH AGENT
        </span>
      </div>

      {/* Live Loader Symbol */}
      <div
        className="relative flex items-center justify-center my-7"
        style={{
          opacity: 0,
          animation: "fadeIn .6s ease forwards 0.7s",
        }}
      >
        <div className="absolute w-12 h-12 rounded-full bg-neon-cyan/15 animate-ping" />
        <div className="p-3 rounded-full glass border border-neon-cyan/30 shadow-[0_0_20px_rgba(0,229,255,0.25)]">
          <Loader2 size={28} className="text-neon-cyan animate-spin" />
        </div>
      </div>

      {/* Loading Progress Bar */}
      <div
        className="w-[220px] h-[3px] rounded-full bg-white/5 overflow-hidden"
        style={{
          opacity: 0,
          animation: "fadeIn .5s ease forwards 0.9s",
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-neon-violet via-neon-cyan to-signal-invest"
          style={{
            width: 0,
            animation: "bootFill 1.8s ease forwards 1.0s",
          }}
        />
      </div>

      {/* "Loading..." text below live loader symbol */}
      <div
        className="mt-4 flex items-center gap-2 text-ink-muted font-mono text-xs tracking-widest uppercase"
        style={{
          opacity: 0,
          animation: "fadeIn .6s ease forwards 1.0s",
        }}
      >
        <span className="live-dot bg-neon-cyan" />
        <span>Loading...</span>
      </div>
    </div>
  );
}

