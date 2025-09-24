# LLM Configuration (OpenRouter, Anthropic, OpenAI)

This project supports multiple LLM providers via the AI SDK, including OpenRouter (recommended), Anthropic, and OpenAI. The default is configured to a free coding model on OpenRouter.

## Default Model

The default model is defined in `app/config.ts`:

```ts
export const DEFAULT_MODEL = "openrouter:deepseek/deepseek-coder-v2";
```

You can change this to any supported model ID from the `MODELS` map in `app/lib/.server/llm/models.ts` or add your own.

## How Model Selection Works

- `DEFAULT_MODEL` is read by the server at `app/lib/.server/llm/stream-text.ts`.
- It resolves to a provider using `getModelFromId` in `app/lib/.server/llm/models.ts`.
- OpenRouter is accessed through the OpenAI-compatible API with a custom `baseURL` and headers.

## Switching Models

1. Update `DEFAULT_MODEL` in `app/config.ts` to one of:
   - `openrouter:deepseek/deepseek-coder-v2` (recommended, broad availability)
   - `openrouter:meta-llama/llama-3.1-70b-instruct`
   - `openrouter:qwen/qwen2.5-coder-32b-instruct` (availability may vary)
   - `openai:gpt-4o`
   - `anthropic:claude-3-5-sonnet-20240620`
2. Or add a new entry to `MODELS` in `app/lib/.server/llm/models.ts` and set `DEFAULT_MODEL` accordingly.

## Environment Variables

For OpenRouter:

- `OPENROUTER_API_KEY` (required)
- `OPENROUTER_API_BASE_URL` (optional, default `https://openrouter.ai/api/v1`)
- `OPENROUTER_SITE_URL` (optional, sent as `HTTP-Referer` header)
- `OPENROUTER_APP_NAME` (optional, sent as `X-Title` header)

For Anthropic:

- `ANTHROPIC_API_KEY`

For OpenAI:

- `OPENAI_API_KEY`

The runtime types for these variables are declared in `worker-configuration.d.ts`.

## Notes on Free Models

- Some OpenRouter models expose `:free` routes. If a `:free` variant returns an error (e.g., 400), remove `:free` or switch to another free-eligible model from your OpenRouter dashboard.
- Recommended free coding model: `openrouter:qwen/qwen2.5-coder-32b-instruct:free`.

## Files Touched by LLM Integration

- `app/config.ts` – sets `DEFAULT_MODEL`.
- `app/lib/.server/llm/models.ts` – defines `MODELS` and provider wiring.
- `app/lib/.server/llm/model.ts` – resolves the selected model.
- `app/lib/.server/llm/stream-text.ts` – streams responses using the selected model.
- `worker-configuration.d.ts` – declares required env variables.

[![Bolt.new: AI-Powered Full-Stack Web Development in the Browser](./public/social_preview_index.jpg)](https://bolt.new)

# Bolt.new: AI-Powered Full-Stack Web Development in the Browser

Bolt.new is an AI-powered web development agent that allows you to prompt, run, edit, and deploy full-stack applications directly from your browser—no local setup required. If you're here to build your own AI-powered web dev agent using the Bolt open source codebase, [click here to get started!](./CONTRIBUTING.md)

## What Makes Bolt.new Different

Claude, v0, etc are incredible- but you can't install packages, run backends or edit code. That’s where Bolt.new stands out:

- **Full-Stack in the Browser**: Bolt.new integrates cutting-edge AI models with an in-browser development environment powered by **StackBlitz’s WebContainers**. This allows you to:
  - Install and run npm tools and libraries (like Vite, Next.js, and more)
  - Run Node.js servers
  - Interact with third-party APIs
  - Deploy to production from chat
  - Share your work via a URL

- **AI with Environment Control**: Unlike traditional dev environments where the AI can only assist in code generation, Bolt.new gives AI models **complete control** over the entire  environment including the filesystem, node server, package manager, terminal, and browser console. This empowers AI agents to handle the entire app lifecycle—from creation to deployment.

Whether you’re an experienced developer, a PM or designer, Bolt.new allows you to build production-grade full-stack applications with ease.

For developers interested in building their own AI-powered development tools with WebContainers, check out the open-source Bolt codebase in this repo!

## Tips and Tricks

Here are some tips to get the most out of Bolt.new:

- **Be specific about your stack**: If you want to use specific frameworks or libraries (like Astro, Tailwind, ShadCN, or any other popular JavaScript framework), mention them in your initial prompt to ensure Bolt scaffolds the project accordingly.

- **Use the enhance prompt icon**: Before sending your prompt, try clicking the 'enhance' icon to have the AI model help you refine your prompt, then edit the results before submitting.

- **Scaffold the basics first, then add features**: Make sure the basic structure of your application is in place before diving into more advanced functionality. This helps Bolt understand the foundation of your project and ensure everything is wired up right before building out more advanced functionality.

- **Batch simple instructions**: Save time by combining simple instructions into one message. For example, you can ask Bolt to change the color scheme, add mobile responsiveness, and restart the dev server, all in one go saving you time and reducing API credit consumption significantly.

## FAQs

**Where do I sign up for a paid plan?**  
Bolt.new is free to get started. If you need more AI tokens or want private projects, you can purchase a paid subscription in your [Bolt.new](https://bolt.new) settings, in the lower-left hand corner of the application. 

**What happens if I hit the free usage limit?**  
Once your free daily token limit is reached, AI interactions are paused until the next day or until you upgrade your plan.

**Is Bolt in beta?**  
Yes, Bolt.new is in beta, and we are actively improving it based on feedback.

**How can I report Bolt.new issues?**  
Check out the [Issues section](https://github.com/stackblitz/bolt.new/issues) to report an issue or request a new feature. Please use the search feature to check if someone else has already submitted the same issue/request.

**What frameworks/libraries currently work on Bolt?**  
Bolt.new supports most popular JavaScript frameworks and libraries. If it runs on StackBlitz, it will run on Bolt.new as well.

**How can I add make sure my framework/project works well in bolt?**  
We are excited to work with the JavaScript ecosystem to improve functionality in Bolt. Reach out to us via [hello@stackblitz.com](mailto:hello@stackblitz.com) to discuss how we can partner!
