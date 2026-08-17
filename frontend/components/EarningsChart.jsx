import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
function EarningsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const p = payload[0]?.payload;
  if (!p) return null;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs font-mono">
      <div className="text-ink-faint mb-1">{label}</div>
      <div className="text-ink-muted">Estimate: ₹{p.estimate}</div>
      <div className={p.beat ? "text-signal-invest" : "text-signal-pass"}>
        Actual: ₹{p.actual} ({p.beat ? "Beat" : "Miss"})
      </div>
    </div>
  );
}
export default function EarningsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis
          dataKey="quarter"
          tick={{
            fill: "#8B96AC",
            fontSize: 10,
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
          tickFormatter={(v) => `₹${v}`}
        />
        <Tooltip
          content={<EarningsTooltip />}
          cursor={{
            fill: "rgba(255,255,255,0.03)",
          }}
        />
        <Bar
          dataKey="estimate"
          name="Estimate"
          fill="rgba(255,255,255,0.15)"
          radius={[6, 6, 0, 0]}
          animationDuration={700}
          className="chart-dot-hover"
        />
        <Bar
          dataKey="actual"
          name="Actual"
          radius={[6, 6, 0, 0]}
          animationDuration={800}
          className="chart-dot-hover"
        >
          {data.map((d, i) => (
            <Cell key={i} fill={d.beat ? "#00F5A0" : "#FF3B5C"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
