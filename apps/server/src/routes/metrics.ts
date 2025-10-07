import { NextFunction, Response, Router } from 'express';
import { CoordinatorRequest } from '../types/CoordinatorRequest.js';

export const metricsRoutes = Router();

metricsRoutes.get('/', (req: CoordinatorRequest, res: Response, next: NextFunction) => {
  try {
    const metrics = req.coordinator.getSystemMetrics();
    res.json(metrics);
  } catch (error) {
    next(error);
  }
});
