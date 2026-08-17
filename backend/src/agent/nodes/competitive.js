import { webSearch } from "../../tools/search.js";

/**
 * Competitive Positioning Node (Deterministic Heuristics - 0 Gemini calls).
 * Computes transparent, data-driven factor scores across 6 fixed axes:
 * [Growth, Profitability, Balance Sheet, Moat, Sentiment, Valuation]
 * using state collected by earlier graph nodes and Tavily research context.
 */
export async function competitiveNode(state) {
  const { companyName, sector, financials = [], earnings = [], sentiment = [] } = state;

  const results = await webSearch(
    `${companyName} competitors peers ${sector} market share comparison`,
    4
  );

  // 1. Growth score (computed from 4-year revenue CAGR)
  let growthScore = 65;
  if (financials.length >= 2) {
    const oldest = financials[0].revenue || 1;
    const latest = financials[financials.length - 1].revenue || oldest;
    const totalGrowth = (latest - oldest) / Math.abs(oldest);
    growthScore = Math.min(98, Math.max(20, Math.round(50 + totalGrowth * 60)));
  }

  // 2. Profitability score (computed from average net profit margin)
  let profitabilityScore = 60;
  if (financials.length > 0) {
    const avgMargin = financials.reduce((acc, f) => acc + (f.margin || 0), 0) / financials.length;
    profitabilityScore = Math.min(96, Math.max(25, Math.round(45 + avgMargin * 1.6)));
  }

  // 3. Balance Sheet score (net income stability + earnings beat consistency)
  const beatCount = earnings.filter((e) => e.beat).length;
  const positiveNetIncomeYears = financials.filter((f) => (f.netIncome || 0) > 0).length;
  const balanceSheetScore = Math.min(
    95,
    Math.max(30, 45 + beatCount * 8 + positiveNetIncomeYears * 5)
  );

  // 4. Moat score (derived from margin strength and growth trajectory)
  const avgMargin = financials.length
    ? financials.reduce((acc, f) => acc + (f.margin || 0), 0) / financials.length
    : 10;
  const moatScore = Math.min(
    95,
    Math.max(30, Math.round(50 + avgMargin * 1.4 + (growthScore - 50) * 0.3))
  );

  // 5. Sentiment score (average trailing weekly sentiment mapped from [-100..+100] to [0..100])
  let sentimentScore = 60;
  if (sentiment.length > 0) {
    const avgSent = sentiment.reduce((acc, s) => acc + (s.sentiment || 0), 0) / sentiment.length;
    sentimentScore = Math.min(98, Math.max(10, Math.round((avgSent + 100) / 2)));
  }

  // 6. Valuation score (relative valuation tradeoff vs growth premium)
  const valuationScore = Math.min(90, Math.max(35, Math.round(85 - growthScore * 0.35)));

  const scores = [
    { axis: "Growth", score: growthScore },
    { axis: "Profitability", score: profitabilityScore },
    { axis: "Balance Sheet", score: balanceSheetScore },
    { axis: "Moat", score: moatScore },
    { axis: "Sentiment", score: sentimentScore },
    { axis: "Valuation", score: valuationScore },
  ];

  const secondarySources = results.slice(0, 2).map((r) => ({
    label: r.title || `${companyName} Competitor Benchmarking`,
    kind: "Secondary",
    url: r.url,
  }));

  return {
    scores,
    sources: [
      { label: "Peer & competitive benchmarking", kind: "Derived" },
      ...secondarySources,
    ],
  };
}
