import { env } from 'node:process';

export function getEnvVar(name: keyof Env | string, cloudflareEnv: Env) {
  return (env as Record<string, string | undefined>)[name as string] || (cloudflareEnv as Record<string, string | undefined>)[name as string];
}
