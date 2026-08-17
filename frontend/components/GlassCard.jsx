import clsx from "clsx";
const glowMap = {
  cyan: "glow-cyan-line",
  invest: "glow-invest-line",
  pass: "glow-pass-line",
  none: "",
};
export default function GlassCard({
  strong,
  glow = "none",
  trace = false,
  hover = false,
  className,
  children,
  ...rest
}) {
  return (
    <div
      className={clsx(
        strong ? "glass-strong" : "glass",
        "rounded-2xl",
        glowMap[glow],
        trace && "trace-border",
        hover && "card-hover",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
