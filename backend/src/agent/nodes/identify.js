import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { webSearch } from "../../tools/search.js";
import { getModel } from "../../config/llm.js";
import { IdentifySchema } from "../schemas.js";

/**
 * Identify Node (Gemini Call #1).
 * Conducts Tavily web search to resolve company basics, sector, and ticker,
 * using Gemini structured output with IdentifySchema.
 */
export async function identifyNode(state) {
  const { companyName } = state;

  const results = await webSearch(
    `${companyName} company overview stock exchange listing sector`,
    5
  );
  const context = results.map((r) => `${r.title}\n${r.url}\n${r.content}`).join("\n\n");

  const model = getModel({ temperature: 0.2 }).withStructuredOutput(IdentifySchema);
  const out = await model.invoke([
    new SystemMessage(
      "You are an equity research analyst identifying company basics from search snippets. Be concise and factual. If the exact ticker isn't stated, give your best reasonable estimate rather than leaving it blank."
    ),
    new HumanMessage(`Company: ${companyName}\n\nSearch results:\n${context}`),
  ]);

  const secondarySources = results.slice(0, 3).map((r) => ({
    label: r.title || `${companyName} Overview & Exchange Listing`,
    kind: "Secondary",
    url: r.url,
  }));

  return {
    ticker: out.ticker,
    sector: out.sector,
    summary: out.summary,
    sources: [
      { label: "Company overview & exchange listing data", kind: "Primary" },
      ...secondarySources,
    ],
  };
}
