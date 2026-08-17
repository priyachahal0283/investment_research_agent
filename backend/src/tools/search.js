const TAVILY_URL = "https://api.tavily.com/search";

/**
 * Runs a live web search via Tavily (free tier: https://tavily.com) and
 * returns a small, LLM-friendly list of { title, url, content } results.
 * This is the agent's only real "research" data source — every node that
 * needs facts calls this before asking the LLM to reason over the results.
 *
 * @param {string} query
 * @param {number} [maxResults=5]
 * @returns {Promise<Array<{title: string, url: string, content: string}>>}
 */
export async function webSearch(query, maxResults = 5) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    throw new Error(
      "TAVILY_API_KEY is not set. Get a free key at https://tavily.com and add it to .env"
    );
  }

  const res = await fetch(TAVILY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      max_results: maxResults,
      search_depth: "basic",
      include_answer: false,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Tavily search failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  return (data.results || []).map((r) => ({
    title: r.title || "",
    url: r.url || "",
    content: r.content || "",
  }));
}
