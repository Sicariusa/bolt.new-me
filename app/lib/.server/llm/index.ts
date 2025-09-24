import { anthropic, openai, openRouter } from "./models";

export function getLLMProvider(provider: string) {
  switch (provider) {
    case "anthropic":
      return anthropic();
    case "openai":
      return openai();
    case "openrouter":
      return openRouter();
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}