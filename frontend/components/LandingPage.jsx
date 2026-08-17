import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Layers, Sparkles } from "lucide-react";
import GlassCard from "./GlassCard";
const FEATURES = [
  {
    icon: TrendingUp,
    color: "text-neon-cyan",
    title: "Live research pipeline",
    copy: "Every step streams in real time — company ID, financials, sentiment, risk, valuation.",
    dir: -20,
  },
  {
    icon: ShieldCheck,
    color: "text-signal-invest",
    title: "Risk-aware verdicts",
    copy: "Volatility, concentration, and macro sensitivity are scored, not glossed over.",
    dir: 20,
  },
  {
    icon: Layers,
    color: "text-neon-violet",
    title: "Full data coverage",
    copy: "Filings, earnings, SEC disclosures, price action, and social sentiment in one view.",
    dir: -20,
  },
  {
    icon: Sparkles,
    color: "text-neon-gold",
    title: "Explainable, always",
    copy: "Every verdict ships with pros, cons, and the sources behind them.",
    dir: 20,
  },
];
const COMPANIES = [
  {
    ticker: "TCS",
    sector: "IT SERVICES",
    color: "#00E5FF",
  },
  {
    ticker: "HDFCB",
    sector: "BANKING",
    color: "#7C5CFF",
  },
  {
    ticker: "RELI",
    sector: "ENERGY",
    color: "#00F5A0",
  },
  {
    ticker: "ZOM",
    sector: "E-COMMERCE",
    color: "#FFC400",
  },
  {
    ticker: "TATAM",
    sector: "AUTO",
    color: "#FF3B5C",
  },
  {
    ticker: "INFY",
    sector: "IT SERVICES",
    color: "#00E5FF",
  },
];
function Reveal({ children, y = 30, delay = 0, duration = 0.55 }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.15,
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
export default function LandingPage({ onLaunch }) {
  return (
    <div>
      <nav className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 backdrop-blur-xl bg-void/60 border-b border-white/5">
        <div className="font-display font-bold text-sm tracking-wide">
          Invest<span className="text-gradient-neon">IQ</span>
        </div>
        <div className="hidden sm:flex gap-7 font-mono text-xs text-ink-muted">
          <a href="#about" className="hover:text-neon-cyan transition">
            About
          </a>
          <a href="#features" className="hover:text-neon-cyan transition">
            Features
          </a>
          <a href="#coverage" className="hover:text-neon-cyan transition">
            Coverage
          </a>
          <a href="#contact" className="hover:text-neon-cyan transition">
            Contact
          </a>
        </div>
        <button
          onClick={onLaunch}
          className="px-4 py-2 rounded-xl font-display font-bold text-xs bg-[#3fd0ff] text-[#04121a] border border-[#7fe3ff] shadow-[0_0_0_1px_rgba(63,208,255,0.6),0_0_10px_rgba(63,208,255,0.65)] hover:bg-[#6fe0ff] hover:-translate-y-0.5 transition"
        >
          Launch Agent →
        </button>
      </nav>

      {/* HERO */}
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-center">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono tracking-wider text-neon-cyan mb-7">
            <Sparkles size={13} /> AUTONOMOUS RESEARCH AGENT · INVESTIQ LABS
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display font-semibold leading-[1.1] tracking-tight text-[clamp(32px,6vw,58px)]">
            An AI analyst that reads the filings{" "}
            <span className="text-gradient-neon">
              so you don&apos;t have to.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-ink-muted text-base max-w-xl mx-auto leading-relaxed">
            InvestIQ built an autonomous agent that pulls
            annual reports, earnings calls, SEC/exchange filings, price action,
            and even Reddit chatter — then hands you an explainable INVEST /
            PASS / WATCH call.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <button
            onClick={onLaunch}
            className="mt-9 px-8 py-4 rounded-2xl font-display font-bold text-sm bg-[#3fd0ff] text-[#04121a] border border-[#7fe3ff] shadow-[0_0_0_1px_rgba(63,208,255,0.6),0_0_14px_rgba(63,208,255,0.7)] hover:bg-[#6fe0ff] hover:-translate-y-0.5 transition"
          >
            Launch the Agent →
          </button>
        </Reveal>
      </div>

      {/* ABOUT */}
      <div
        id="about"
        className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        <Reveal y={30} delay={0}>
          <div>
            <div className="text-neon-cyan font-mono text-xs tracking-widest">
              ABOUT THE AGENT
            </div>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl mt-3 mb-4">
              Not a chatbot. A research process.
            </h2>
            <p className="text-ink-muted text-sm leading-relaxed">
              Most &quot;AI stock tools&quot; summarize a headline. This agent
              runs a full multi-step LangGraph.js pipeline — identification,
              financial analysis, sentiment, competitive positioning, risk, and
              valuation — and shows every step of that reasoning live, instead
              of hiding it behind a spinner.
            </p>
            <p className="text-ink-muted text-sm leading-relaxed mt-3">
              The goal isn&apos;t to replace your judgment — it&apos;s to
              compress hours of filing-reading into a transparent, explainable
              verdict you can sanity-check yourself.
            </p>
          </div>
        </Reveal>
        <Reveal y={30} delay={0.15}>
          <GlassCard trace hover className="p-6">
            <div className="font-display font-semibold text-sm mb-3.5">
              What it pulls together
            </div>
            <div className="flex flex-col gap-2.5 text-sm text-ink-muted">
              <div>▤ Annual reports &amp; financial statements</div>
              <div>▤ Quarterly earnings reports (EPS beat / miss)</div>
              <div>▤ SEC / exchange regulatory disclosures</div>
              <div>▤ Live stock price &amp; revenue growth trend</div>
              <div>▤ Reddit &amp; social sentiment discussions</div>
              <div>▤ Analyst notes &amp; peer comparables</div>
            </div>
          </GlassCard>
        </Reveal>
      </div>

      {/* FEATURES */}
      <div id="features" className="max-w-5xl mx-auto px-6 py-20">
        <Reveal delay={0}>
          <div className="text-center mb-12">
            <div className="text-neon-cyan font-mono text-xs tracking-widest">
              FEATURES
            </div>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl mt-3">
              Built to be read, not just trusted
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} y={25} delay={i * 0.08}>
              <GlassCard trace hover className="p-5">
                <f.icon size={20} className={f.color} />
                <div className="font-display font-semibold text-sm mt-3">
                  {f.title}
                </div>
                <div className="text-xs text-ink-muted mt-1.5 leading-relaxed">
                  {f.copy}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* COMPANIES / COVERAGE */}
      <div id="coverage" className="max-w-5xl mx-auto px-6 py-20">
        <Reveal delay={0}>
          <div className="text-center mb-10">
            <div className="text-neon-cyan font-mono text-xs tracking-widest">
              COVERAGE
            </div>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl mt-3">
              Works across listed sectors
            </h2>
            <p className="text-ink-muted text-sm mt-2">
              A few examples the agent can research on demand
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {COMPANIES.map((c, i) => (
            <Reveal key={c.ticker} y={25} delay={i * 0.06}>
              <div
                className="glass aspect-[1.6] rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.04]"
                style={{
                  borderColor: `${c.color}55`,
                  boxShadow: `0 0 0 1px ${c.color}33, 0 0 8px ${c.color}55`,
                  transform: "perspective(400px) rotateX(6deg)",
                }}
              >
                <div
                  className="font-display font-bold text-lg"
                  style={{
                    color: c.color,
                  }}
                >
                  {c.ticker}
                </div>
                <div className="text-[9px] font-mono text-ink-faint tracking-wider">
                  {c.sector}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" className="max-w-3xl mx-auto px-6 pt-4 pb-24">
        <Reveal y={30} delay={0}>
          <GlassCard strong trace className="p-10 text-center">
            <div className="font-display font-semibold text-xl sm:text-2xl">
              Ready to run your first research call?
            </div>
            <p className="text-ink-muted text-sm mt-2">
              No setup, no keys — try it on any listed company.
            </p>
            <button
              onClick={onLaunch}
              className="mt-6 px-8 py-4 rounded-2xl font-display font-bold text-sm bg-[#3fd0ff] text-[#04121a] border border-[#7fe3ff] shadow-[0_0_0_1px_rgba(63,208,255,0.6),0_0_14px_rgba(63,208,255,0.7)] hover:bg-[#6fe0ff] hover:-translate-y-0.5 transition"
            >
              Launch the Agent →
            </button>
            <div className="text-ink-faint font-mono text-[11px] mt-8 tracking-wide">
              BUILT FOR THE INVESTIQ TAKE-HOME · CONTACT:
              support@investiq.ai
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}
