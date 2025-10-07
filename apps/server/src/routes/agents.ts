import { NextFunction, Response, Router } from 'express';
import { AgentStatus } from '@agentspace/types';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { HttpError } from '../middleware/HttpError.js';
import { CoordinatorRequest } from '../types/CoordinatorRequest.js';

export const agentRoutes = Router();

const agentConfigSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  capabilities: z.array(z.string().min(1)).min(1, 'At least one capability is required'),
  metadata: z.record(z.any()).optional(),
});

const getAgentsQuerySchema = z.object({
  status: z.nativeEnum(AgentStatus).optional(),
  capability: z.string().min(1).optional(),
});

const updateAgentStatusSchema = z.object({
  status: z.nativeEnum(AgentStatus),
});

type CreateAgentBody = z.infer<typeof agentConfigSchema>;
type GetAgentsQuery = z.infer<typeof getAgentsQuerySchema>;
type UpdateAgentStatusBody = z.infer<typeof updateAgentStatusSchema>;

agentRoutes.post(
  '/',
  validateRequest(agentConfigSchema),
  (req: CoordinatorRequest<CreateAgentBody>, res: Response, next: NextFunction) => {
    try {
      const agent = req.coordinator.getAgentManager().createAgent(req.body);
      res.status(201).json(agent);
    } catch (error) {
      next(error);
    }
  }
);

agentRoutes.get(
  '/',
  validateRequest(getAgentsQuerySchema, 'query'),
  (req: CoordinatorRequest<unknown> & { query: GetAgentsQuery }, res: Response, next: NextFunction) => {
    try {
      const { status, capability } = req.query;

      const manager = req.coordinator.getAgentManager();
      const agents = status
        ? manager.getAgentsByStatus(status)
        : capability
          ? manager.getAgentsByCapability(capability)
          : manager.getAllAgents();

      res.json(agents);
    } catch (error) {
      next(error);
    }
  }
);

agentRoutes.get('/:id', (req: CoordinatorRequest, res: Response, next: NextFunction) => {
  try {
    const agent = req.coordinator.getAgentManager().getAgent(req.params.id);

    if (!agent) {
      throw new HttpError(404, 'Agent not found');
    }

    res.json(agent);
  } catch (error) {
    next(error);
  }
});

agentRoutes.patch(
  '/:id/status',
  validateRequest(updateAgentStatusSchema),
  (
    req: CoordinatorRequest<UpdateAgentStatusBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updated = req.coordinator
        .getAgentManager()
        .updateAgentStatus(req.params.id, req.body.status);

      if (!updated) {
        throw new HttpError(404, 'Agent not found');
      }

      const agent = req.coordinator.getAgentManager().getAgent(req.params.id);
      res.json(agent);
    } catch (error) {
      next(error);
    }
  }
);

agentRoutes.delete('/:id', (req: CoordinatorRequest, res: Response, next: NextFunction) => {
  try {
    const deleted = req.coordinator.getAgentManager().deleteAgent(req.params.id);

    if (!deleted) {
      throw new HttpError(404, 'Agent not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

