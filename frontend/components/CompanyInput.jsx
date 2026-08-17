import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import GlassCard from "./GlassCard";
const EXAMPLES = ["Tata Motors", "Zomato", "Infosys", "Nykaa", "HDFC Bank"];
export default function CompanyInput({ onSubmit, onBackToLanding }) {
  const [value, setValue] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim().length === 0) return;
    onSubmit(value.trim());
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative">
      <div className="w-full max-w-3xl flex justify-start mb-6">
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-neon-cyan transition focus-ring px-3.5 py-2 rounded-xl glass border border-white/10 shadow-sm"
          >
            <ArrowLeft size={14} /> Home Page
          </button>
        )}
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="w-full max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono tracking-wider text-neon-cyan mb-8">
          <Sparkles size={13} />
          AUTONOMOUS RESEARCH AGENT · INVESTIQ LABS
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-semibold leading-[1.08] tracking-tight text-ink">
          Should you invest in{" "}
          <span className="text-gradient-neon">that company?</span>
        </h1>
        <p className="mt-6 text-ink-muted text-base sm:text-lg max-w-xl mx-auto font-body">
          Give the agent a name. It reads the filings, checks the news, weighs
          the risk, and hands you a verdict — plus every step of reasoning
          behind it.
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <GlassCard
            glow="cyan"
            trace
            className="flex items-center gap-3 p-2.5 sm:p-3 max-w-xl mx-auto"
          >
            <Search className="ml-3 shrink-0 text-ink-faint" size={20} />
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. Tata Motors, Zomato, Infosys…"
              className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink-faint font-body text-base py-2"
            />
            <button
              type="submit"
              disabled={value.trim().length === 0}
              className="shrink-0 px-5 sm:px-6 py-3 rounded-xl font-display font-bold text-sm tracking-wide
                bg-[#3fd0ff] text-[#04121a] border border-[#7fe3ff]
                shadow-[0_0_0_1px_rgba(63,208,255,0.6),0_0_10px_rgba(63,208,255,0.65)]
                hover:bg-[#6fe0ff] hover:shadow-[0_0_0_1px_rgba(111,224,255,0.8),0_0_16px_rgba(111,224,255,0.85)]
                hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition
                disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:bg-white/10 disabled:text-ink-faint disabled:translate-y-0"
            >
              Run Research
            </button>
          </GlassCard>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-ink-faint font-mono mr-1">TRY:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => onSubmit(ex)}
              className="text-xs font-mono px-3 py-1.5 rounded-full glass text-ink-muted hover:text-neon-cyan hover:shadow-neon-cyan transition focus-ring"
            >
              {ex}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.25,
        }}
        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
      >
        {[
          {
            icon: TrendingUp,
            title: "Full transparency",
            copy: "Watch every research step run live — nothing is a black box.",
          },
          {
            icon: ShieldCheck,
            title: "Risk-aware",
            copy: "Volatility, concentration, and macro sensitivity, not just upside.",
          },
          {
            icon: Sparkles,
            title: "Explainable verdict",
            copy: "A clear INVEST / PASS / WATCH call with the reasoning behind it.",
          },
        ].map((f) => (
          <GlassCard key={f.title} hover trace className="p-5 text-left">
            <f.icon size={18} className="text-neon-cyan mb-3" />
            <div className="font-display font-semibold text-sm text-ink">
              {f.title}
            </div>
            <div className="text-xs text-ink-muted mt-1.5 leading-relaxed">
              {f.copy}
            </div>
          </GlassCard>
        ))}
      </motion.div>
    </div>
  );
}
