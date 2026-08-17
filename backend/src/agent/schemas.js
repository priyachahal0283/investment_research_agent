import { z } from "zod";

export const IdentifySchema = z.object({
  ticker: z.string().describe("Best-guess stock ticker symbol, all caps"),
  sector: z.string().describe("Primary industry sector, e.g. 'Information Technology'"),
  summary: z.string().describe("2-3 sentence factual company overview"),
});

export const FinancialsSchema = z.object({
  financials: z
    .array(
      z.object({
        year: z.string().describe("e.g. 'FY22'"),
        revenue: z.number().describe("Revenue, consistent units across all 4 years"),
        netIncome: z.number(),
        margin: z.number().describe("Net margin as a percentage, e.g. 12.4"),
      }),
    )
    .length(4)
    .describe("Oldest year first, most recent year last"),
  earnings: z
    .array(
      z.object({
        quarter: z.string().describe("e.g. 'Q1 FY26'"),
        estimate: z.number(),
        actual: z.number(),
        beat: z.boolean(),
      }),
    )
    .length(4)
    .describe("Last 4 reported quarters, oldest first"),
});

export const SentimentSchema = z.object({
  sentiment: z
    .array(
      z.object({
        week: z.string().describe("e.g. 'W1'"),
        sentiment: z.number().min(-100).max(100),
      }),
    )
    .length(8)
    .describe("Trailing 8 weeks, oldest first"),
  redditPosts: z
    .array(
      z.object({
        tone: z.enum(["good", "bad", "neutral"]),
        text: z.string().describe("One representative discussion snippet"),
        upvotes: z.number().int().min(0),
      }),
    )
    .length(4),
});

export const CompetitiveSchema = z.object({
  scores: z
    .array(
      z.object({
        axis: z.enum(["Growth", "Profitability", "Balance Sheet", "Moat", "Sentiment", "Valuation"]),
        score: z.number().min(0).max(100),
      }),
    )
    .length(6)
    .describe("All 6 axes, in this exact order"),
});

export const RiskSchema = z.object({
  riskLevel: z.enum(["Low", "Moderate", "Elevated", "High"]),
  riskNotes: z.string().describe("1-2 sentence justification"),
});

export const ValuationSchema = z.object({
  stockSeries: z
    .array(
      z.object({
        session: z.number().int().min(1),
        price: z.number().min(0),
      }),
    )
    .length(30)
    .describe("30 trading sessions, session 1 = oldest"),
  targetHorizon: z.string().describe("e.g. '12-18 months'"),
});

export const DecisionSchema = z.object({
  verdict: z.enum(["INVEST", "PASS", "WATCH"]),
  confidence: z.number().min(0).max(100),
  oneLiner: z.string().describe("One punchy sentence summarizing the call"),
  reasoning: z
    .array(
      z.object({
        type: z.enum(["pro", "con"]),
        text: z.string(),
      }),
    )
    .min(3)
    .max(8)
    .describe("Strongest points first"),
});
