import OpenAI from "openai";
import { createAnthropic } from '@ai-sdk/anthropic';

// Configure OpenRouter LLaMA
export function openRouter() {
  return new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_API_BASE_URL,
  });
}

// Configure Anthropic
export function anthropic() {
  return createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
  });
}

// Configure OpenAI
export function openai() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
}

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
  "openrouter:llama-coder": {
    id: "openrouter:llama-coder",
    provider: "openrouter",
    model: "llama-coder",
    maxTokens: 8192,
  },
};

export type ModelID = keyof typeof MODELS;