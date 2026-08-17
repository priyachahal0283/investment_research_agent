import { StateGraph, START, END } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { identifyNode } from "./nodes/identify.js";
import { financialsNode } from "./nodes/financials.js";
import { sentimentNode } from "./nodes/sentiment.js";
import { competitiveNode } from "./nodes/competitive.js";
import { riskNode } from "./nodes/risk.js";
import { valuationNode } from "./nodes/valuation.js";
import { decisionNode } from "./nodes/decision.js";

const graph = new StateGraph(AgentState)
  .addNode("identifyNode", identifyNode)
  .addNode("financialsNode", financialsNode)
  .addNode("sentimentNode", sentimentNode)
  .addNode("competitiveNode", competitiveNode)
  .addNode("riskNode", riskNode)
  .addNode("valuationNode", valuationNode)
  .addNode("decisionNode", decisionNode)

  .addEdge(START, "identifyNode")
  .addEdge("identifyNode", "financialsNode")
  .addEdge("financialsNode", "sentimentNode")
  .addEdge("sentimentNode", "competitiveNode")
  .addEdge("competitiveNode", "riskNode")
  .addEdge("riskNode", "valuationNode")
  .addEdge("valuationNode", "decisionNode")
  .addEdge("decisionNode", END);

export const researchAgent = graph.compile();