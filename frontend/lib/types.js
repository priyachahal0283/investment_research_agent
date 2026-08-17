/**
 * These were TypeScript `interface`/`type` declarations in the original
 * codebase. Plain JavaScript has no interfaces or types at runtime, so
 * there is nothing to "convert" here in a functional sense — but the
 * shapes are documented below as JSDoc typedefs so editors (VS Code, etc.)
 * still show autocomplete/hover info, and so this file still describes
 * exactly what every other file expects to receive.
 *
 * @typedef {"pending" | "running" | "done"} StageStatus
 *
 * @typedef {Object} PipelineLogLine
 * @property {string} text
 * @property {"neutral" | "good" | "bad" | "warn"} [tone]
 *
 * @typedef {Object} PipelineStage
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {PipelineLogLine[]} logs
 * @property {number} durationMs
 *
 * @typedef {Object} FinancialYear
 * @property {string} year
 * @property {number} revenue - in Cr
 * @property {number} netIncome - in Cr
 * @property {number} margin - %
 *
 * @typedef {Object} ScoreAxis
 * @property {string} axis
 * @property {number} score - 0-100
 * @property {100} fullMark
 *
 * @typedef {Object} SentimentPoint
 * @property {string} week
 * @property {number} sentiment - -100 to 100
 *
 * @typedef {Object} ReasoningPoint
 * @property {"pro" | "con"} type
 * @property {string} text
 *
 * @typedef {Object} Source
 * @property {string} label
 * @property {string} kind
 *
 * @typedef {Object} StockPoint
 * @property {number} session
 * @property {number} price
 *
 * @typedef {Object} EarningsPoint
 * @property {string} quarter
 * @property {number} estimate
 * @property {number} actual
 * @property {boolean} beat
 *
 * @typedef {Object} RedditPost
 * @property {"good" | "bad" | "neutral"} tone
 * @property {string} text
 * @property {number} upvotes
 *
 * @typedef {"INVEST" | "PASS" | "WATCH"} Verdict
 *
 * @typedef {Object} AgentResult
 * @property {string} company
 * @property {string} ticker
 * @property {string} sector
 * @property {Verdict} verdict
 * @property {number} confidence - 0-100
 * @property {string} oneLiner
 * @property {FinancialYear[]} financials
 * @property {ScoreAxis[]} scores
 * @property {SentimentPoint[]} sentiment
 * @property {ReasoningPoint[]} reasoning
 * @property {Source[]} sources
 * @property {"Low" | "Moderate" | "Elevated" | "High"} riskLevel
 * @property {string} targetHorizon
 * @property {StockPoint[]} stockSeries
 * @property {EarningsPoint[]} earnings
 * @property {RedditPost[]} redditPosts
 */

export {};
