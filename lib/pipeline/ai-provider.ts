export type AiModel = "claude-haiku" | "gpt-5-nano";

interface GenerateOptions {
  model?: AiModel;
  maxTokens?: number;
  temperature?: number;
}

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;
const AI_TIMEOUT_MS = 120_000; // 120 seconds per AI call

function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = AI_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

// Unified AI content generation interface
// Prefers Claude if ANTHROPIC_API_KEY is set, falls back to OpenAI
export async function generateContent(
  prompt: string,
  options: GenerateOptions = {}
): Promise<string> {
  const { maxTokens = 16384, temperature = 0.7 } = options;

  // Auto-select model based on available API keys
  let model = options.model;
  if (!model) {
    if (process.env.ANTHROPIC_API_KEY) {
      model = "claude-haiku";
    } else if (process.env.OPENAI_API_KEY) {
      model = "gpt-5-nano";
    } else {
      throw new Error(
        "No AI API key configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY."
      );
    }
  }

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (model === "claude-haiku") {
        return await callClaude(prompt, maxTokens, temperature);
      } else if (model === "gpt-5-nano") {
        return await callOpenAI(prompt, maxTokens, temperature);
      } else {
        throw new Error(`Unknown model: ${model}`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(
        `AI generation attempt ${attempt}/${MAX_RETRIES} failed (${model}):`,
        lastError.message
      );

      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * attempt);
      }
    }
  }

  // Fallback: if Claude failed, try OpenAI (and vice versa)
  if (model === "claude-haiku" && process.env.OPENAI_API_KEY) {
    console.log("[ai-provider] Claude failed, falling back to GPT-5-nano");
    try {
      return await callOpenAI(prompt, maxTokens, 1);
    } catch (fallbackErr) {
      console.error("[ai-provider] OpenAI fallback also failed:", fallbackErr);
    }
  } else if (model === "gpt-5-nano" && process.env.ANTHROPIC_API_KEY) {
    console.log("[ai-provider] OpenAI failed, falling back to Claude Haiku");
    try {
      return await callClaude(prompt, maxTokens, temperature);
    } catch (fallbackErr) {
      console.error("[ai-provider] Claude fallback also failed:", fallbackErr);
    }
  }

  throw new Error(
    `AI generation failed after ${MAX_RETRIES} attempts + fallback: ${lastError?.message}`
  );
}

// Claude API (Anthropic)
async function callClaude(
  prompt: string,
  maxTokens: number,
  temperature: number
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");

  const response = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      temperature,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const textBlock = data.content?.find(
    (block: { type: string }) => block.type === "text"
  );
  if (!textBlock?.text) {
    throw new Error("No text content in Claude response");
  }

  return textBlock.text;
}

// OpenAI API
async function callOpenAI(
  prompt: string,
  maxTokens: number,
  temperature: number
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

  const response = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5-nano-2025-08-07",
      max_completion_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No content in OpenAI response");
  }

  return content;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
