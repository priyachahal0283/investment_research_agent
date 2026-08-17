import { Router } from "express";
import { researchAgent } from "../agent/graph.js";

const router = Router();

/**
 * Formats API errors into user-friendly messages without exposing internal stack traces.
 * Detects Gemini API 429 quota exhaustion specifically.
 */
function formatErrorMessage(err) {
  const msg = err?.message || String(err);
  if (
    msg.includes("429") ||
    msg.includes("QuotaExhausted") ||
    msg.includes("quota") ||
    msg.includes("ResourceExhausted")
  ) {
    return "Gemini API rate limit / quota exceeded. Please wait 45-60 seconds before submitting another research request.";
  }
  return msg;
}

/**
 * Maps internal graph state onto the exact AgentResult shape expected
 * by the React frontend.
 *
 * @param {Object} state
 * @returns {Object} AgentResult
 */
function toAgentResult(state) {
  return {
    company: state.companyName || "",
    ticker: state.ticker || "",
    sector: state.sector || "",
    summary: state.summary || "",
    verdict: state.verdict || "WATCH",
    confidence: state.confidence ?? 50,
    oneLiner: state.oneLiner || "",
    financials: state.financials || [],
    scores: state.scores || [],
    sentiment: state.sentiment || [],
    reasoning: state.reasoning || [],
    sources: state.sources || [],
    riskLevel: state.riskLevel || "Moderate",
    riskNotes: state.riskNotes || "",
    targetHorizon: state.targetHorizon || "12–18 months",
    stockSeries: state.stockSeries || [],
    earnings: state.earnings || [],
    redditPosts: state.redditPosts || [],
  };
}

// POST /api/research  { companyName } -> full AgentResult response
router.post("/", async (req, res) => {
  const { companyName } = req.body || {};
  if (!companyName || typeof companyName !== "string" || !companyName.trim()) {
    return res.status(400).json({ error: "companyName is required" });
  }

  try {
    const finalState = await researchAgent.invoke({ companyName: companyName.trim() });
    res.json(toAgentResult(finalState));
  } catch (err) {
    console.error("[research] agent failed:", err);
    res.status(500).json({ error: "Agent research failed", detail: formatErrorMessage(err) });
  }
});

// GET /api/research/stream?companyName=... -> SSE endpoint
router.get("/stream", async (req, res) => {
  const companyName = (req.query.companyName || "").toString().trim();
  if (!companyName) {
    return res.status(400).json({ error: "companyName query param is required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  if (typeof res.flushHeaders === "function") {
    res.flushHeaders();
  }

  const send = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    const stream = await researchAgent.stream({ companyName });
    let finalState = { companyName };
    for await (const chunk of stream) {
      const nodeName = Object.keys(chunk)[0];
      if (nodeName) {
        finalState = { ...finalState, ...chunk[nodeName] };
        send("stage", { node: nodeName });
      }
    }
    send("result", toAgentResult(finalState));
  } catch (err) {
    console.error("[research/stream] agent failed:", err);
    send("error", { message: formatErrorMessage(err) });
  } finally {
    res.end();
  }
});

export default router;
