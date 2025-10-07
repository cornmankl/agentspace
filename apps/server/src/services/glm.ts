import fetch from 'node-fetch';
import { config } from 'dotenv';
import { logger } from '../logger.js';
import { getEnv, getRequiredEnv } from '../utils/env.js';

config();

export interface GLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GLMChatRequest {
  model?: string;
  messages: GLMMessage[];
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface GLMChatResponse {
  id: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class GLMService {
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  constructor(options: { apiKey?: string; apiUrl?: string; model?: string } = {}) {
    this.apiKey = options.apiKey ?? getRequiredEnv('GLM_API_KEY');
    this.apiUrl = options.apiUrl ?? getEnv('GLM_API_URL', 'https://api.z.ai/api/coding/paas/v4')!;
    this.model = options.model ?? getEnv('GLM_MODEL', 'glm-4-plus')!;
  }

  async chat(messages: GLMMessage[], agentContext?: string): Promise<string> {
    try {
      const systemMessage: GLMMessage = {
        role: 'system',
        content: agentContext || 'You are a helpful AI assistant in AGENTSPACE, a multi-agent coordination platform. Provide clear, concise, and helpful responses.'
      };

      const requestBody: GLMChatRequest = {
        model: this.model,
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 2000,
        stream: false
      };

      logger.debug({ endpoint: `${this.apiUrl}/chat/completions`, messageCount: messages.length }, 'Invoking GLM API');

      const response = await fetch(this.apiUrl + '/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error({ status: response.status, error: errorText }, 'GLM API error');
        throw new Error(`GLM API Error: ${response.status}`);
      }

      const data = await response.json() as GLMChatResponse;
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from GLM API');
      }

      const content = data.choices[0].message.content;
      logger.debug({ preview: content.substring(0, 100) }, 'GLM response received');

      return content;
    } catch (error) {
      logger.error({ error }, 'GLM service error');
      throw error;
    }
  }

  async chatWithAgent(
    userMessage: string, 
    conversationHistory: GLMMessage[],
    agentName: string,
    agentType: string,
    agentCapabilities: string[]
  ): Promise<string> {
    const agentContext = `You are ${agentName}, a specialized ${agentType} agent in AGENTSPACE.

Your capabilities: ${agentCapabilities.join(', ')}

Your role: Assist users with tasks related to your capabilities. Be professional, helpful, and provide actionable advice. If asked about something outside your expertise, acknowledge it but still try to help or redirect appropriately.

Communication style: Clear, concise, and friendly. Use technical terms when appropriate but explain complex concepts simply.`;

    const messages: GLMMessage[] = [
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    return await this.chat(messages, agentContext);
  }
}

export const glmService = new GLMService();
