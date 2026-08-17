import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { webSearch } from "../../tools/search.js";
import { getModel } from "../../config/llm.js";
import { SentimentSchema } from "../schemas.js";

/**
 * Sentiment Node (Gemini Call #3).
 * Conducts Tavily search for analyst notes/news and uses Gemini structured output
 * to extract weekly sentiment trend and representative retail investor snippets.
 */
export async function sentimentNode(state) {
  const { companyName, sector } = state;

  const results = await webSearch(
    `${companyName} news recent analyst opinion investor discussion`,
    6
  );
  const context = results.map((r) => `${r.title}\n${r.content}`).join("\n\n");

  const model = getModel({ temperature: 0.4 }).withStructuredOutput(SentimentSchema);
  const out = await model.invoke([
    new SystemMessage(
      "Based on the news/discussion snippets, estimate a weekly sentiment trend for the trailing 8 weeks (-100 very negative to +100 very positive) and 4 representative retail-investor-style discussion snippets with a tone and plausible upvote count. Base direction and magnitude on the actual tone of the research provided, not a guess."
    ),
    new HumanMessage(`Company: ${companyName} (Sector: ${sector})\n\nResearch:\n${context}`),
  ]);

  const secondarySources = results.slice(0, 2).map((r) => ({
    label: r.title || `${companyName} News Coverage`,
    kind: "Secondary",
    url: r.url,
  }));

  return {
    sentiment: out.sentiment,
    redditPosts: out.redditPosts,
    sources: [
      { label: "News & social sentiment scan", kind: "Secondary" },
      ...secondarySources,
    ],
  };
}
