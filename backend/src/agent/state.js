import { Annotation } from "@langchain/langgraph";

/**
 * Helper to define a "last write wins" state field with a default value.
 */
const field = (defaultValue) =>
  Annotation({
    reducer: (_prev, next) => (next !== undefined ? next : _prev),
    default: () => defaultValue,
  });

/**
 * Shared state threaded through every node in the graph.
 * Field names map 1:1 onto the frontend's AgentResult contract.
 */
export const AgentState = Annotation.Root({
  companyName: field(""),
  ticker: field(""),
  sector: field(""),
  summary: field(""),

  financials: field([]),
  earnings: field([]),

  sentiment: field([]),
  redditPosts: field([]),

  scores: field([]),

  riskLevel: field("Moderate"),
  riskNotes: field(""),

  stockSeries: field([]),
  targetHorizon: field("12–18 months"),

  verdict: field("WATCH"),
  confidence: field(50),
  oneLiner: field(""),
  reasoning: field([]),

  // Accumulates sources from all graph nodes
  sources: Annotation({
    reducer: (prev = [], next = []) => [...(prev || []), ...(next || [])],
    default: () => [],
  }),
});
