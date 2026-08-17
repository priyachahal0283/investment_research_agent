import { ArrowUpRight, ArrowDownRight, Minus, ArrowBigUp } from "lucide-react";
const TONE_META = {
  good: {
    icon: ArrowUpRight,
    color: "text-signal-invest",
  },
  bad: {
    icon: ArrowDownRight,
    color: "text-signal-pass",
  },
  neutral: {
    icon: Minus,
    color: "text-signal-watch",
  },
};
export default function RedditFeed({ posts }) {
  return (
    <div className="flex flex-col gap-2">
      {posts.map((p, i) => {
        const meta = TONE_META[p.tone];
        return (
          <div
            key={i}
            className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[13px]"
          >
            <meta.icon size={15} className={`${meta.color} shrink-0 mt-0.5`} />
            <span className="text-ink-muted flex-1 leading-relaxed">
              {p.text}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-ink-faint shrink-0">
              <ArrowBigUp size={11} /> {p.upvotes}
            </span>
          </div>
        );
      })}
    </div>
  );
}
