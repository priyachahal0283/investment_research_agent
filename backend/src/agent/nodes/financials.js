import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { webSearch } from "../../tools/search.js";
import { getModel } from "../../config/llm.js";
import { FinancialsSchema } from "../schemas.js";

/**
 * Financials Node (Gemini Call #2).
 * Conducts Tavily search for financial filings and uses Gemini structured output
 * to extract 4 years of annual financials and last 4 quarters of EPS results.
 */
export async function financialsNode(state) {
  const { companyName, sector } = state;

  const results = await webSearch(
    `${companyName} annual revenue net income profit margin last 4 years financial results`,
    5
  );
  const context = results.map((r) => `${r.title}\n${r.content}`).join("\n\n");

  const model = getModel({ temperature: 0.3 }).withStructuredOutput(FinancialsSchema);
  const out = await model.invoke([
    new SystemMessage(
      "You are a financial analyst. Based on the research snippets, estimate 4 years (oldest to newest) of annual revenue, net income and net margin, plus the last 4 quarters of EPS estimate vs actual. Use consistent units throughout, and never leave a field blank — give a clearly reasoned estimate where exact figures aren't stated."
    ),
    new HumanMessage(`Company: ${companyName} (Sector: ${sector})\n\nResearch:\n${context}`),
  ]);

  const secondarySources = results.slice(0, 2).map((r) => ({
    label: r.title || `${companyName} Financial Statements`,
    kind: "Primary",
    url: r.url,
  }));

  return {
    financials: out.financials,
    earnings: out.earnings,
    sources: [
      { label: "Financial statement analysis", kind: "Primary" },
      ...secondarySources,
    ],
  };
}
