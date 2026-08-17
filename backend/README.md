# AI Investment Research Agent — Backend

Node.js + Express + LangGraph.js backend. It runs your exact 7-stage pipeline
(identify → financials → sentiment → competitive → risk → valuation → decision)
as a real LangGraph `StateGraph`, uses live web search (Tavily) as its research
tool, and returns JSON matching your frontend's `AgentResult` contract exactly
— no field name changes needed on the frontend.

## 1. Setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:
- An LLM key — OpenAI by default (`OPENAI_API_KEY`), or set `LLM_PROVIDER=anthropic`
  and `ANTHROPIC_API_KEY` (also `npm install @langchain/anthropic` if you switch).
- A free **Tavily** API key from https://tavily.com — this is what the agent
  uses to actually research each company. Without it, every node will error.

```bash
npm run dev
```

Server runs at `http://localhost:8787`. Check `http://localhost:8787/health`.

## 2. Endpoints

**`POST /api/research`**
```json
{ "companyName": "Tata Motors" }
```
Returns the full `AgentResult` object in one response. Takes ~20-40s since it's
7 sequential LLM calls, each preceded by a live web search.

**`GET /api/research/stream?companyName=...`** *(optional bonus)*
Server-Sent Events. Emits `event: stage` with `{ node: "financials" }` etc. as
each graph node finishes, then one `event: result` with the full `AgentResult`.
Only useful once you wire your `ResearchPipeline` component to listen for real
backend progress instead of its local mock timers — not required to get a
working demo.

## 3. Connecting your frontend

Replace `runAgent(company)` in `mockAgent.js` with a real call:

```javascript
async function runAgent(company) {
  const res = await fetch("http://localhost:8787/api/research", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyName: company }),
  });
  if (!res.ok) throw new Error("Research failed");
  return res.json();
}
```

(Swap in axios later if you like — same body/response shape either way.)

Your `ResearchPipeline` component can keep its own local stage animation
exactly as-is (it doesn't need real backend timing to look good) — just call
the real endpoint in parallel and use its result once both finish, or await it
after the animation completes.

## 4. Honest limitations

- `stockSeries`, `earnings`, and the weekly `sentiment` trend are **LLM
  estimates grounded in real search results**, not pulled from a live market
  data feed — there's no dedicated financial-data API key wired in here.
  For a stronger submission, add a real market data API (Alpha Vantage or
  Financial Modeling Prep both have free tiers) and feed that data into
  `financialsNode` / `valuationNode` instead of asking the LLM to estimate.
- All grounding comes from Tavily web search snippets fed into
  structured-output LLM calls (`withStructuredOutput` + zod) — no scraping.

## 5. Deploying

This is a plain Express app — deploy it as-is to Render, Railway, or Fly.io
and point your Vercel-hosted frontend's fetch URL at that backend URL.
It won't run unmodified as Vercel serverless functions, but everything in
`src/agent/` is framework-agnostic and can be dropped straight into a
Next.js API route or a Vercel serverless function if you'd rather deploy
frontend + backend together.
