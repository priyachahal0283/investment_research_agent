import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Circle, Terminal, AlertTriangle, RefreshCw } from "lucide-react";
import GlassCard from "./GlassCard";
import { connectResearchStream, STAGES_CONFIG } from "../lib/mockAgent";

const NODE_TO_INDEX = {
  identifyNode: 0,
  financialsNode: 1,
  sentimentNode: 2,
  competitiveNode: 3,
  riskNode: 4,
  valuationNode: 5,
  decisionNode: 6,
};

export default function ResearchPipeline({ company, onComplete, onBack }) {
  const stages = STAGES_CONFIG;
  const [statuses, setStatuses] = useState(stages.map(() => "pending"));
  const [stageLogs, setStageLogs] = useState(
    stages.map((s) => [`Initial status: queued for ${s.id}`])
  );
  const [showIntro, setShowIntro] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showIntro) return;

    // Set first stage to running when pipeline starts
    setStatuses((prev) => {
      const next = [...prev];
      next[0] = "running";
      return next;
    });
    setStageLogs((prev) => {
      const next = [...prev];
      next[0] = [`Executing identity & sector resolution via LangGraph node...`];
      return next;
    });

    const closeStream = connectResearchStream(company, {
      onStage: (nodeName) => {
        const completedIndex = NODE_TO_INDEX[nodeName];
        if (completedIndex !== undefined) {
          setStatuses((prev) => {
            const next = [...prev];
            next[completedIndex] = "done";
            if (completedIndex + 1 < stages.length) {
              next[completedIndex + 1] = "running";
            }
            return next;
          });

          setStageLogs((prev) => {
            const next = [...prev];
            next[completedIndex] = [
              `Completed ${stages[completedIndex].title}`,
              `Output saved to graph state`,
            ];
            if (completedIndex + 1 < stages.length) {
              next[completedIndex + 1] = [
                `Executing ${stages[completedIndex + 1].title}...`,
              ];
            }
            return next;
          });
        }
      },
      onResult: (realAgentResult) => {
        setStatuses(stages.map(() => "done"));
        setStageLogs(
          stages.map((s) => [`Completed ${s.title}`, `Node state updated successfully`])
        );
        setTimeout(() => {
          onComplete(realAgentResult);
        }, 500);
      },
      onError: (msg) => {
        setErrorMessage(msg);
      },
    });

    return () => {
      closeStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showIntro, company]);

  const doneCount = statuses.filter((s) => s === "done").length;
  const progress = Math.round((doneCount / stages.length) * 100);

  if (showIntro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="live-label text-neon-cyan mb-4">
          <span
            className="live-dot"
            style={{
              background: "#00E5FF",
              color: "#00E5FF",
            }}
          />
          AGENT ENGAGED
        </div>
        <div
          className="company-3d"
          style={{
            fontSize: "clamp(36px, 7vw, 64px)",
          }}
        >
          <span>{company}</span>
        </div>
        <div className="font-mono text-ink-muted text-xs mt-4 tracking-wide">
          CONNECTING TO BACKEND RESEARCH AGENT…
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <GlassCard glow="pink" trace className="p-8 max-w-lg w-full text-center">
          <AlertTriangle size={36} className="text-signal-pass mx-auto mb-4" />
          <h2 className="font-display font-bold text-xl text-ink mb-2">
            Research Execution Failed
          </h2>
          <p className="text-xs text-ink-muted font-mono leading-relaxed mb-6 bg-black/40 p-3.5 rounded-xl border border-white/5 break-words">
            {errorMessage}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onBack || (() => window.location.reload())}
              className="px-5 py-2.5 rounded-xl font-display font-bold text-xs tracking-wide bg-white/10 text-ink hover:bg-white/20 transition flex items-center gap-2"
            >
              <RefreshCw size={14} /> Back to Search
            </button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-mono text-ink-faint mb-2">
          <span className="flex items-center gap-2 text-neon-cyan">
            <Terminal size={13} /> LIVE BACKEND AGENT · {company.toUpperCase()}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-violet via-neon-cyan to-signal-invest"
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.4,
            }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {stages.map((stage, i) => {
          const status = statuses[i];
          const logs = stageLogs[i] || [];
          return (
            <GlassCard
              key={stage.id}
              glow={status === "running" ? "cyan" : "none"}
              trace
              hover
              className={`p-5 transition-opacity duration-500 ${status === "pending" ? "opacity-40" : "opacity-100"}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {status === "done" && (
                    <CheckCircle2 size={18} className="text-signal-invest" />
                  )}
                  {status === "running" && (
                    <Loader2
                      size={18}
                      className="text-neon-cyan animate-spin"
                    />
                  )}
                  {status === "pending" && (
                    <Circle size={18} className="text-ink-faint" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display font-semibold text-sm sm:text-base text-ink">
                      {stage.title}
                    </h3>
                    <span className="text-[10px] font-mono text-ink-faint uppercase shrink-0">
                      {status}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {stage.subtitle}
                  </p>

                  <AnimatePresence>
                    {status !== "pending" && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 rounded-lg bg-black/30 border border-white/5 px-3 py-2.5 font-mono text-[11px] leading-relaxed space-y-1">
                          {logs.map((logText, li) => (
                            <div
                              key={li}
                              className={
                                status === "done"
                                  ? "text-signal-invest"
                                  : "text-ink-muted"
                              }
                            >
                              <span className="text-ink-faint">$ </span>
                              {logText}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
