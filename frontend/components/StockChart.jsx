import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
function StockTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs font-mono">
      <div className="text-ink-faint mb-1">Session {p.session}</div>
      <div className="text-signal-invest">
        ₹{p.price.toLocaleString("en-IN")}
      </div>
    </div>
  );
}
export default function StockChart({ data }) {
  const up = data[data.length - 1].price >= data[0].price;
  const color = up ? "#00F5A0" : "#FF3B5C";
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis
          dataKey="session"
          tick={{
            fill: "#8B96AC",
            fontSize: 10,
            fontFamily: "var(--font-mono)",
          }}
          axisLine={{
            stroke: "rgba(255,255,255,0.1)",
          }}
          tickLine={false}
          tickFormatter={(v) => `D${v}`}
          interval={4}
        />
        <YAxis
          domain={["auto", "auto"]}
          tick={{
            fill: "#8B96AC",
            fontSize: 10,
            fontFamily: "var(--font-mono)",
          }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${v}`}
          width={52}
        />
        <Tooltip content={<StockTooltip />} />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          fill="url(#stockFill)"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 5,
            className: "chart-dot-hover",
          }}
          animationDuration={1100}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
