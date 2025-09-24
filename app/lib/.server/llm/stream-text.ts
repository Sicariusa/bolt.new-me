import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getModel } from '~/lib/.server/llm/model';
import { DEFAULT_MODEL } from '~/config';
import { type ModelID } from '~/lib/.server/llm/models';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
}

export type Messages = Message[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;

export async function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  const candidates: ModelID[] = [
    DEFAULT_MODEL as ModelID,
    'openrouter:deepseek/deepseek-r1-0528:free' as ModelID,
    'openrouter:meta-llama/llama-3.1-70b-instruct' as ModelID,
    'openrouter:qwen/qwen2.5-coder-32b-instruct:free' as ModelID,
    'openrouter:meta-llama/llama-3.1-8b-instruct' as ModelID,
    'openrouter:qwen/qwen2.5-7b-instruct' as ModelID,
  ];

  let lastError: unknown;
  for (const candidate of candidates) {
    try {
      const model = getModel(env, candidate);
      const headers = candidate.startsWith('anthropic:')
        ? { 'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15' }
        : undefined;

      return await _streamText({
        model,
        system: getSystemPrompt(),
        maxTokens: MAX_TOKENS,
        maxRetries: 0,
        headers,
        messages: convertToCoreMessages(messages),
        ...options,
      });
    } catch (error) {
      // If model ID is invalid or not allowed, try next candidate
      lastError = error;
      const maybe = error as { statusCode?: number; message?: string };
      if (maybe?.statusCode === 429 || maybe?.message?.includes('Too Many Requests')) {
        // fall through to try next candidate immediately
        continue;
      }
      // For other errors (e.g., config), still try next
      continue;
    }
  }

  throw lastError ?? new Error('No valid model available');
}
