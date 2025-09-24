declare global {
  interface Env {
    ANTHROPIC_API_KEY: string;
    OPENAI_API_KEY: string;
    OPENROUTER_API_KEY: string;
    OPENROUTER_API_BASE_URL: string;
    OPENROUTER_SITE_URL: string;
    OPENROUTER_APP_NAME: string;
  }
}

export {};
