import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  ShieldAlert,
  Building2,
  Layers,
} from "lucide-react";
import GlassCard from "./GlassCard";
import DecisionGauge from "./DecisionGauge";
import StockChart from "./StockChart";
import EarningsChart from "./EarningsChart";
import RedditFeed from "./RedditFeed";
const VERDICT_META = {
  INVEST: {
    label: "INVEST",
    glow: "invest",
    color: "text-signal-invest",
  },
  PASS: {
    label: "PASS",
    glow: "pass",
    color: "text-signal-pass",
  },
  WATCH: {
    label: "WATCH",
    glow: "watch",
    color: "text-signal-watch",
  },
};
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs font-mono">
      <div className="text-ink-faint mb-1">{label}</div>
      {payload.map((p) => (
        <div
          key={p.dataKey}
          style={{
            color: p.color,
          }}
        >
          {p.name}: {p.value}
        </div>
      ))}
    </div>
  );
}
export default function ResultsDashboard({ result, onReset }) {
  const meta = VERDICT_META[result.verdict];
  return (
    <div className="px-6 py-14 max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs font-mono text-ink-faint tracking-widest">
            RESEARCH COMPLETE
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-1">
            {result.company}{" "}
            <span className="text-ink-faint font-mono text-lg">
              ({result.ticker})
            </span>
          </h1>
          <div className="flex items-center gap-2 text-xs text-ink-muted mt-1.5">
            <Building2 size={13} /> {result.sector}
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl glass hover:text-neon-cyan hover:shadow-neon-cyan transition focus-ring"
        >
          <RotateCcw size={13} /> New search
        </button>
      </div>

      {/* Verdict banner */}
      <GlassCard
        strong
        glow={
          result.verdict === "INVEST"
            ? "invest"
            : result.verdict === "PASS"
              ? "pass"
              : "cyan"
        }
        trace
        className="p-6 sm:p-8 mb-6 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-center"
      >
        <DecisionGauge
          verdict={result.verdict}
          confidence={result.confidence}
        />
        <div>
          <div
            className={`font-display text-4xl sm:text-5xl font-bold tracking-tight ${meta.color}`}
          >
            {meta.label}
          </div>
          <p className="text-ink-muted mt-3 max-w-xl leading-relaxed text-sm sm:text-base">
            {result.oneLiner}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs font-mono px-3 py-1.5 rounded-full glass flex items-center gap-1.5">
              <ShieldAlert size={12} /> Risk: {result.riskLevel}
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full glass flex items-center gap-1.5">
              <Layers size={12} /> Horizon: {result.targetHorizon}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard trace hover className="p-5">
          <h3 className="font-display font-semibold text-sm mb-1">
            Factor Score Breakdown
          </h3>
          <p className="text-xs text-ink-muted mb-3">
            Composite score across the six weighted research factors
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={result.scores} outerRadius={90}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{
                  fill: "#8B96AC",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                }}
              />
              <Radar
                dataKey="score"
                stroke="#00E5FF"
                fill="#00E5FF"
                fillOpacity={0.28}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard trace hover className="p-5">
          <h3 className="font-display font-semibold text-sm mb-1">
            Revenue & Net Income
          </h3>
          <p className="text-xs text-ink-muted mb-3">
            Last 4 fiscal years, ₹ Cr
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={result.financials}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{
                  fill: "#8B96AC",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={{
                  stroke: "rgba(255,255,255,0.1)",
                }}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fill: "#8B96AC",
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "rgba(255,255,255,0.03)",
                }}
              />
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#7C5CFF"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="netIncome"
                name="Net Income"
                fill="#00E5FF"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard trace hover className="p-5 mb-6">
        <h3 className="font-display font-semibold text-sm mb-1">
          News & Market Sentiment Trend
        </h3>
        <p className="text-xs text-ink-muted mb-3">
          Trailing 8-week sentiment score (-100 to +100)
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={result.sentiment}>
            <defs>
              <linearGradient id="sentimentFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F5A0" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#00F5A0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{
                fill: "#8B96AC",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
              }}
              axisLine={{
                stroke: "rgba(255,255,255,0.1)",
              }}
              tickLine={false}
            />
            <YAxis
              domain={[-100, 100]}
              tick={{
                fill: "#8B96AC",
                fontSize: 10,
                fontFamily: "var(--font-mono)",
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sentiment"
              name="Sentiment"
              stroke="#00F5A0"
              fill="url(#sentimentFill)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* Stock price + earnings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GlassCard trace hover className="p-5">
          <h3 className="font-display font-semibold text-sm mb-1">
            Stock Price (30-Session Trend)
          </h3>
          <p className="text-xs text-ink-muted mb-3">
            Hover any point for the session price
          </p>
          <StockChart data={result.stockSeries} />
        </GlassCard>

        <GlassCard trace hover className="p-5">
          <h3 className="font-display font-semibold text-sm mb-1">
            Earnings: Actual vs. Estimate (EPS)
          </h3>
          <p className="text-xs text-ink-muted mb-3">
            Last 4 reported quarters
          </p>
          <EarningsChart data={result.earnings} />
        </GlassCard>
      </div>

      <GlassCard trace hover className="p-5 mb-6">
        <h3 className="font-display font-semibold text-sm mb-1">
          Reddit & Social Discussion Signal
        </h3>
        <p className="text-xs text-ink-muted mb-3">
          Recent retail-investor chatter the agent factored into sentiment
        </p>
        <RedditFeed posts={result.redditPosts} />
      </GlassCard>

      {/* Reasoning + sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard trace hover className="p-5">
          <h3 className="font-display font-semibold text-sm mb-3">
            Reasoning Behind the Verdict
          </h3>
          <div className="space-y-2.5">
            {result.reasoning.map((r, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: i * 0.06,
                }}
                className="flex items-start gap-2.5 text-sm"
              >
                {r.type === "pro" ? (
                  <ArrowUpRight
                    size={16}
                    className="text-signal-invest shrink-0 mt-0.5"
                  />
                ) : (
                  <ArrowDownRight
                    size={16}
                    className="text-signal-pass shrink-0 mt-0.5"
                  />
                )}
                <span className="text-ink-muted leading-relaxed">{r.text}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard trace hover className="p-5">
          <h3 className="font-display font-semibold text-sm mb-3">
            Sources Consulted
          </h3>
          <div className="space-y-2">
            {result.sources.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/5"
              >
                <span className="text-ink-muted">{s.label}</span>
                <span className="text-[10px] font-mono text-ink-faint px-2 py-0.5 rounded-full bg-white/5">
                  {s.kind}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-ink-faint mt-4 leading-relaxed">
            Demo data is deterministically generated per company name for this
            frontend milestone. The production backend swaps this for live
            LangGraph.js retrieval + LLM synthesis over real filings and news.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
