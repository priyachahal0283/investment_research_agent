/**
 * Risk Assessment Node (Deterministic Risk Classifier - 0 Gemini calls).
 * Evaluates investment risk level (Low, Moderate, Elevated, High) and generates
 * explanatory risk notes deterministically from financial trends, earnings beats,
 * and composite factor scores gathered by earlier nodes.
 */
export async function riskNode(state) {
  const { sector, financials = [], scores = [], earnings = [] } = state;

  const avgScore = scores.length
    ? scores.reduce((sum, s) => sum + (s.score || 0), 0) / scores.length
    : 55;

  const beatCount = earnings.filter((e) => e.beat).length;
  const totalQuarters = earnings.length || 4;
  const negativeNetIncomeYears = financials.filter((f) => (f.netIncome || 0) < 0).length;

  let riskLevel = "Moderate";
  let justification = "";

  if (avgScore >= 72 && beatCount >= 3 && negativeNetIncomeYears === 0) {
    riskLevel = "Low";
    justification = `Strong composite factor score (${avgScore.toFixed(1)}/100) and consistent earnings performance (${beatCount}/${totalQuarters} quarters beat) with positive net margins.`;
  } else if (avgScore >= 55) {
    riskLevel = "Moderate";
    justification = `Balanced fundamental profile with moderate factor score (${avgScore.toFixed(1)}/100) and manageable macro/sector volatility in ${sector || "the industry"}.`;
  } else if (avgScore >= 42 || negativeNetIncomeYears > 0) {
    riskLevel = "Elevated";
    justification = `Elevated operational risk driven by below-average factor composite (${avgScore.toFixed(1)}/100) or historical margin variability.`;
  } else {
    riskLevel = "High";
    justification = `High investment risk due to weak composite factor score (${avgScore.toFixed(1)}/100), earnings deceleration, and sector sensitivity.`;
  }

  return {
    riskLevel,
    riskNotes: justification,
  };
}
