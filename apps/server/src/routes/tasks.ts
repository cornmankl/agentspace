import { NextFunction, Response, Router } from 'express';
import { TaskStatus, TaskPriority } from '@agentspace/types';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';
import { HttpError } from '../middleware/HttpError.js';
import { CoordinatorRequest } from '../types/CoordinatorRequest.js';

export const taskRoutes = Router();

const taskInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.nativeEnum(TaskPriority),
  assignedAgentId: z.string().uuid().optional(),
  input: z.record(z.any()),
});

const taskQuerySchema = z.object({
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  agentId: z.string().uuid().optional(),
});

const assignTaskSchema = z.object({
  agentId: z.string().uuid(),
});

const completeTaskSchema = z.object({
  output: z.any(),
});

const failTaskSchema = z.object({
  error: z.string().min(1).optional(),
});

type CreateTaskBody = z.infer<typeof taskInputSchema>;
type TaskQuery = z.infer<typeof taskQuerySchema>;
type AssignTaskBody = z.infer<typeof assignTaskSchema>;
type CompleteTaskBody = z.infer<typeof completeTaskSchema>;
type FailTaskBody = z.infer<typeof failTaskSchema>;

taskRoutes.post(
  '/',
  validateRequest(taskInputSchema),
  (req: CoordinatorRequest<CreateTaskBody>, res: Response, next: NextFunction) => {
    try {
      const task = req.coordinator.getTaskManager().createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }
);

taskRoutes.get(
  '/',
  validateRequest(taskQuerySchema, 'query'),
  (req: CoordinatorRequest & { query: TaskQuery }, res: Response, next: NextFunction) => {
    try {
      const { status, priority, agentId } = req.query;
      const manager = req.coordinator.getTaskManager();

      const tasks = status
        ? manager.getTasksByStatus(status)
        : priority
          ? manager.getTasksByPriority(priority)
          : agentId
            ? manager.getTasksByAgent(agentId)
            : manager.getAllTasks();

      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }
);

taskRoutes.get('/pending', (req: CoordinatorRequest, res: Response, next: NextFunction) => {
  try {
    const tasks = req.coordinator.getTaskManager().getPendingTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

taskRoutes.get('/:id', (req: CoordinatorRequest, res: Response, next: NextFunction) => {
  try {
    const task = req.coordinator.getTaskManager().getTask(req.params.id);

    if (!task) {
      throw new HttpError(404, 'Task not found');
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

taskRoutes.post(
  '/:id/assign',
  validateRequest(assignTaskSchema),
  (req: CoordinatorRequest<AssignTaskBody>, res: Response, next: NextFunction) => {
    try {
      const assigned = req.coordinator.getTaskManager().assignTask(req.params.id, req.body.agentId);
      if (!assigned) {
        throw new HttpError(400, 'Unable to assign task');
      }

      const task = req.coordinator.getTaskManager().getTask(req.params.id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

taskRoutes.post(
  '/:id/complete',
  validateRequest(completeTaskSchema),
  (req: CoordinatorRequest<CompleteTaskBody>, res: Response, next: NextFunction) => {
    try {
      const completed = req.coordinator.getTaskManager().completeTask(req.params.id, req.body.output);
      if (!completed) {
        throw new HttpError(404, 'Task not found');
      }

      const task = req.coordinator.getTaskManager().getTask(req.params.id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

taskRoutes.post(
  '/:id/fail',
  validateRequest(failTaskSchema),
  (req: CoordinatorRequest<FailTaskBody>, res: Response, next: NextFunction) => {
    try {
      const failed = req.coordinator.getTaskManager().failTask(
        req.params.id,
        req.body.error ?? 'Unknown error'
      );
      if (!failed) {
        throw new HttpError(404, 'Task not found');
      }

      const task = req.coordinator.getTaskManager().getTask(req.params.id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

taskRoutes.delete('/:id', (req: CoordinatorRequest, res: Response, next: NextFunction) => {
  try {
    const deleted = req.coordinator.getTaskManager().deleteTask(req.params.id);

    if (!deleted) {
      throw new HttpError(404, 'Task not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
