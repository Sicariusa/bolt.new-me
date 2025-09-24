import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getModel } from '~/lib/.server/llm/model';
import { DEFAULT_MODEL } from '~/config';
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

export function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  const model = getModel(env, DEFAULT_MODEL);
  const headers = DEFAULT_MODEL.startsWith('anthropic:')
    ? { 'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15' }
    : undefined;

  return _streamText({
    model,
    system: getSystemPrompt(),
    maxTokens: MAX_TOKENS,
    headers,
    messages: convertToCoreMessages(messages),
    ...options,
  });
}
