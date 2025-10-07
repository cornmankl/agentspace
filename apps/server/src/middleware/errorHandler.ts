import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger.js';
import { HttpError } from './HttpError.js';

export function errorHandler(
  err: Error | HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  logger.error({ err, path: req.path, method: req.method }, 'Request failed');

  res.status(statusCode).json({
    error: message,
    details: err instanceof HttpError ? err.details : undefined,
  });
}
