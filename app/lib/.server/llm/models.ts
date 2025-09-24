import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';

// Model definitions
export const MODELS = {
  "anthropic:claude-3-5-sonnet-20240620": {
    id: "anthropic:claude-3-5-sonnet-20240620",
    provider: "anthropic",
    model: "claude-3-5-sonnet-20240620",
    maxTokens: 200000,
  },
  "anthropic:claude-3-opus-20240229": {
    id: "anthropic:claude-3-opus-20240229",
    provider: "anthropic",
    model: "claude-3-opus-20240229",
    maxTokens: 200000,
  },
  "anthropic:claude-3-sonnet-20240229": {
    id: "anthropic:claude-3-sonnet-20240229",
    provider: "anthropic",
    model: "claude-3-sonnet-20240229",
    maxTokens: 200000,
  },
  "anthropic:claude-3-haiku-20240307": {
    id: "anthropic:claude-3-haiku-20240307",
    provider: "anthropic",
    model: "claude-3-haiku-20240307",
    maxTokens: 200000,
  },
  "openai:gpt-4o": {
    id: "openai:gpt-4o",
    provider: "openai",
    model: "gpt-4o",
    maxTokens: 128000,
  },
  "openai:gpt-4-turbo": {
    id: "openai:gpt-4-turbo",
    provider: "openai",
    model: "gpt-4-turbo",
    maxTokens: 128000,
  },
  "openai:gpt-4": {
    id: "openai:gpt-4",
    provider: "openai",
    model: "gpt-4",
    maxTokens: 8192,
  },
  "openai:gpt-3.5-turbo": {
    id: "openai:gpt-3.5-turbo",
    provider: "openai",
    model: "gpt-3.5-turbo",
    maxTokens: 16385,
  },
  "deepseek:deepseek-coder": {
    id: "deepseek:deepseek-coder",
    provider: "deepseek",
    model: "deepseek-coder",
    maxTokens: 8192,
  },
  "openrouter:meta-llama/llama-3.1-70b-instruct": {
    id: "openrouter:meta-llama/llama-3.1-70b-instruct",
    provider: "openrouter",
    model: "meta-llama/llama-3.1-70b-instruct",
    maxTokens: 8192,
  },
  "openrouter:meta-llama/llama-3.1-8b-instruct": {
    id: "openrouter:meta-llama/llama-3.1-8b-instruct",
    provider: "openrouter",
    model: "meta-llama/llama-3.1-8b-instruct",
    maxTokens: 8192,
  },
  "openrouter:qwen/qwen2.5-coder-32b-instruct:free": {
    id: "openrouter:qwen/qwen2.5-coder-32b-instruct:free",
    provider: "openrouter",
    model: "qwen/qwen2.5-coder-32b-instruct:free",
    maxTokens: 8192,
  },
  "openrouter:qwen/qwen2.5-7b-instruct": {
    id: "openrouter:qwen/qwen2.5-7b-instruct",
    provider: "openrouter",
    model: "qwen/qwen2.5-7b-instruct",
    maxTokens: 8192,
  },
  "openrouter:deepseek/deepseek-r1-0528:free": {
    id: "openrouter:deepseek/deepseek-r1-0528:free",
    provider: "openrouter",
    model: "deepseek/deepseek-r1-0528:free",
    maxTokens: 8192,
  },
};

export type ModelID = keyof typeof MODELS;

export function getModelFromId(modelId: ModelID, env: Env) {
  const modelDef = MODELS[modelId];
  if (!modelDef) throw new Error(`Unknown model: ${modelId}`);

  switch (modelDef.provider) {
    case 'anthropic': {
      const provider = createAnthropic({
        apiKey: (env?.ANTHROPIC_API_KEY as string | undefined) || process.env.ANTHROPIC_API_KEY || '',
      });
      return provider(modelDef.model);
    }
    case 'openai': {
      const provider = createOpenAI({
        apiKey: (env?.OPENAI_API_KEY as string | undefined) || process.env.OPENAI_API_KEY || '',
      });
      return provider(modelDef.model);
    }
    case 'openrouter': {
      const provider = createOpenAI({
        apiKey: (env?.OPENROUTER_API_KEY as string | undefined) || process.env.OPENROUTER_API_KEY || '',
        baseURL:
          (env?.OPENROUTER_API_BASE_URL as string | undefined) ||
          process.env.OPENROUTER_API_BASE_URL ||
          'https://openrouter.ai/api/v1',
        headers: {
          'HTTP-Referer': (env?.OPENROUTER_SITE_URL as string | undefined) || process.env.OPENROUTER_SITE_URL || '',
          'X-Title': (env?.OPENROUTER_APP_NAME as string | undefined) || process.env.OPENROUTER_APP_NAME || '',
        },
      });
      return provider(modelDef.model);
    }
    default:
      throw new Error(`Unsupported provider: ${modelDef.provider}`);
  }
}