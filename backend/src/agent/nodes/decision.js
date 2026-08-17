import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { getModel } from "../../config/llm.js";
import { DecisionSchema } from "../schemas.js";

/**
 * Decision Node (Gemini Call #4).
 * Synthesizes the full accumulated state from all 6 previous nodes
 * into a single explainable INVEST / PASS / WATCH verdict, confidence score,
 * one-liner summary, and structured pros/cons reasoning points.
 */
export async function decisionNode(state) {
  const { companyName, sector, financials, scores, sentiment, riskLevel, riskNotes } = state;

  const avgScore = scores.length
    ? scores.reduce((sum, s) => sum + (s.score || 0), 0) / scores.length
    : 50;

  const model = getModel({ temperature: 0.4 }).withStructuredOutput(DecisionSchema);
  const out = await model.invoke([
    new SystemMessage(
      "You are the lead analyst synthesizing a final investment verdict from everything gathered so far. Weigh growth, profitability, sentiment, valuation and risk together. Verdict must be INVEST, PASS, or WATCH. Give 3-6 reasoning points, each tagged pro or con, strongest first. Write one punchy one-line summary."
    ),
    new HumanMessage(
      `Company: ${companyName} (Sector: ${sector})
Average factor score: ${avgScore.toFixed(1)}/100
Factor scores: ${JSON.stringify(scores)}
Financial trend: ${JSON.stringify(financials)}
Sentiment trend (weekly, -100 to 100): ${JSON.stringify(sentiment)}
Risk level: ${riskLevel} — ${riskNotes}`
    ),
  ]);

  return {
    verdict: out.verdict,
    confidence: out.confidence,
    oneLiner: out.oneLiner,
    reasoning: out.reasoning,
  };
}
