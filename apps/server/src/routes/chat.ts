import { NextFunction, Response, Router } from 'express';
import { glmService, GLMMessage } from '../services/glm.js';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { HttpError } from '../middleware/HttpError.js';
import { CoordinatorRequest } from '../types/CoordinatorRequest.js';
import { logger } from '../logger.js';

const router = Router();

const chatMessageSchema = z.object({
  role: z.union([z.literal('user'), z.literal('assistant'), z.literal('system')]),
  content: z.string().min(1),
});

const chatRequestSchema = z.object({
  agentId: z.string().uuid(),
  message: z.string().min(1, 'Message is required'),
  conversationHistory: z.array(chatMessageSchema).optional(),
});

type ChatRequestBody = z.infer<typeof chatRequestSchema>;

// POST /api/chat - Send message to agent via GLM
router.post(
  '/',
  validateRequest(chatRequestSchema),
  async (
    req: CoordinatorRequest<ChatRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { agentId, message, conversationHistory = [] } = req.body;

      const agent = req.coordinator.getAgentManager().getAgent(agentId);
      if (!agent) {
        throw new HttpError(404, 'Agent not found');
      }

      logger.info({ agentId, agentName: agent.name }, 'Processing chat request');

      const response = await glmService.chatWithAgent(
        message,
        conversationHistory,
        agent.name,
        agent.type,
        agent.capabilities
      );

      res.json({
        success: true,
        agentId: agent.id,
        agentName: agent.name,
        response,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/chat/stream - Stream chat response (for future implementation)
router.post('/stream', (_req: CoordinatorRequest, res: Response) => {
  res.status(501).json({
    error: 'Streaming not yet implemented',
  });
});

export default router;
