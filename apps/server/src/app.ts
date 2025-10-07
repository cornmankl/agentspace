import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { Coordinator, JsonFileStore } from '@agentspace/core';
import type { Agent, Task } from '@agentspace/types';
import { agentRoutes } from './routes/agents.js';
import { taskRoutes } from './routes/tasks.js';
import { metricsRoutes } from './routes/metrics.js';
import chatRoutes from './routes/chat.js';
import { errorHandler } from './middleware/errorHandler.js';
import { HttpError } from './middleware/HttpError.js';
import { logger } from './logger.js';

export interface AppOptions {
  dataDir?: string;
  rateLimitWindowMs?: number;
  rateLimitMax?: number;
  corsOrigins?: string[];
}

export interface AppBuild {
  app: Application;
  coordinator: Coordinator;
}

export function createApp(options: AppOptions = {}): AppBuild {
  const dataDir = options.dataDir ?? process.env.DATA_DIR ?? path.resolve(process.cwd(), 'data');
  const rateLimitWindowMs = options.rateLimitWindowMs ?? Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);
  const rateLimitMax = options.rateLimitMax ?? Number(process.env.RATE_LIMIT_MAX ?? 120);
  const corsOrigins = options.corsOrigins ?? process.env.CORS_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean);

  const agentStore = new JsonFileStore<Agent>(path.join(dataDir, 'agents.json'));
  const taskStore = new JsonFileStore<Task>(path.join(dataDir, 'tasks.json'));

  const coordinator = new Coordinator({
    agentStorage: agentStore,
    taskStorage: taskStore,
  });

  const app = express();

  const limiter = rateLimit({
    windowMs: rateLimitWindowMs,
    limit: rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(helmet());
  app.use(cors({ origin: corsOrigins && corsOrigins.length > 0 ? corsOrigins : undefined }));
  app.use(limiter);
  app.use(express.json());

  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info(
        {
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
          duration,
        },
        'Request completed'
      );
    });
    next();
  });

  app.use((req, _res, next) => {
    (req as any).coordinator = coordinator;
    next();
  });

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/agents', agentRoutes);
  app.use('/api/tasks', taskRoutes);
  app.use('/api/metrics', metricsRoutes);
  app.use('/api/chat', chatRoutes);

  app.use((req, _res, next) => {
    next(new HttpError(404, `Route not found: ${req.originalUrl}`));
  });

  app.use(errorHandler);

  return { app, coordinator };
}
