import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";

/**
 * Returns a chat model instance based on LLM_PROVIDER in .env.
 * Defaults to 'gemini'. Any LangChain 1.x chat model can be used here —
 * the rest of the agent only depends on this function's return value
 * supporting `.withStructuredOutput(zodSchema)`.
 *
 * @param {Object} options
 * @param {number} [options.temperature=0.3]
 * @returns {ChatGoogleGenerativeAI | ChatOpenAI}
 */
export function getModel({ temperature = 0.3 } = {}) {
  const provider = (process.env.LLM_PROVIDER || "gemini").toLowerCase();

  if (provider === "gemini") {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is not set in environment variables / .env");
    }

    return new ChatGoogleGenerativeAI({
      apiKey,
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
      temperature,
    });
  }

  if (provider === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set in environment variables / .env");
    }

    return new ChatOpenAI({
      apiKey,
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature,
    });
  }

  throw new Error(
    `Unsupported LLM_PROVIDER: '${provider}'. Supported values are 'gemini' or 'openai'.`
  );
}
