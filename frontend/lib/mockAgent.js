/**
 * Real API client for backend research agent server.
 * Connects to Node/Express + LangChain.js backend (/api/research).
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

/**
 * Executes a full POST /api/research call.
 *
 * @param {string} company
 * @returns {Promise<import('./types').AgentResult>}
 */
export async function fetchResearch(company) {
  const res = await fetch(`${API_BASE_URL}/api/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyName: company }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || errorBody.detail || `Backend returned error (${res.status})`);
  }

  return await res.json();
}

/**
 * Opens an SSE stream connection to GET /api/research/stream?companyName=...
 *
 * @param {string} company
 * @param {Object} handlers
 * @param {function(string): void} handlers.onStage
 * @param {function(import('./types').AgentResult): void} handlers.onResult
 * @param {function(string): void} handlers.onError
 * @returns {function(): void} Close stream function
 */
export function connectResearchStream(company, { onStage, onResult, onError }) {
  const url = `${API_BASE_URL}/api/research/stream?companyName=${encodeURIComponent(company)}`;
  const eventSource = new EventSource(url);

  eventSource.addEventListener("stage", (e) => {
    try {
      const data = JSON.parse(e.data);
      if (data.node) {
        onStage(data.node);
      }
    } catch (err) {
      console.error("Error parsing stage event:", err);
    }
  });

  eventSource.addEventListener("result", (e) => {
    try {
      const resultData = JSON.parse(e.data);
      eventSource.close();
      onResult(resultData);
    } catch (err) {
      eventSource.close();
      onError("Failed to parse research result from backend.");
    }
  });

  eventSource.addEventListener("error", (e) => {
    eventSource.close();
    let msg = `Failed to connect to backend server at ${API_BASE_URL}`;
    if (e.data) {
      try {
        const parsed = JSON.parse(e.data);
        if (parsed.message) msg = parsed.message;
      } catch {}
    }
    onError(msg);
  });

  return () => {
    eventSource.close();
  };
}

// Retained static stage configuration metadata for pipeline UI rendering
export const STAGES_CONFIG = [
  {
    id: "identify",
    node: "identifyNode",
    title: "Company Identification & Sector Mapping",
    subtitle: "Resolving entity, exchange listing, and industry classification",
  },
  {
    id: "financials",
    node: "financialsNode",
    title: "Financial Statement Analysis",
    subtitle: "Revenue trend, margins, debt load, and cash conversion",
  },
  {
    id: "sentiment",
    node: "sentimentNode",
    title: "Market Sentiment & News Analysis",
    subtitle: "Scanning recent coverage, analyst notes, and social chatter",
  },
  {
    id: "competitive",
    node: "competitiveNode",
    title: "Competitive Positioning",
    subtitle: "Benchmarking against sector peers and market share trend",
  },
  {
    id: "risk",
    node: "riskNode",
    title: "Risk Assessment",
    subtitle: "Volatility, concentration, macro sensitivity, and tail risks",
  },
  {
    id: "valuation",
    node: "valuationNode",
    title: "Valuation & Scoring",
    subtitle: "Relative valuation multiples and composite scoring model",
  },
  {
    id: "decision",
    node: "decisionNode",
    title: "Decision Synthesis",
    subtitle: "Weighing all evidence into a single, explainable verdict",
  },
];
