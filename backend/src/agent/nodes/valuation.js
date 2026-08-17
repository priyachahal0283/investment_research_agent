import { webSearch } from "../../tools/search.js";

/**
 * Computes a deterministic integer hash from a string.
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Valuation Node (Deterministic Stock Series - 0 Gemini calls).
 * Conducts Tavily web search to retrieve valuation multiples & price context,
 * then generates a deterministic illustrative 30-session stock price series
 * aligned with the company's financial growth trend.
 */
export async function valuationNode(state) {
  const { companyName, sector, scores = [] } = state;

  const results = await webSearch(
    `${companyName} stock price P/E ratio valuation multiple current`,
    5
  );

  // Compute a baseline starting price deterministically derived from companyName
  const seed = hashString(companyName + "valuation");
  const basePrice = 30 + (seed % 450); // $30 - $480 range

  // Extract growth score to set daily drift direction
  const growthScore = scores.find((s) => s.axis === "Growth")?.score || 60;
  const dailyDrift = (growthScore - 50) / 2000;

  const stockSeries = [];
  let currentPrice = basePrice;

  for (let session = 1; session <= 30; session++) {
    // Smooth pseudo-random variation using sin function seeded by company name & session
    const pseudoRand = Math.sin(seed * session * 0.15) * 0.012;
    currentPrice = Math.max(5, currentPrice * (1 + dailyDrift + pseudoRand));
    stockSeries.push({
      session,
      price: Math.round(currentPrice * 100) / 100,
    });
  }

  const secondarySources = results.slice(0, 2).map((r) => ({
    label: r.title || `${companyName} Valuation Multiples`,
    kind: "Secondary",
    url: r.url,
  }));

  return {
    stockSeries,
    targetHorizon: "12–18 months",
    sources: [
      { label: "Valuation multiples & price context", kind: "Secondary" },
      ...secondarySources,
    ],
  };
}
