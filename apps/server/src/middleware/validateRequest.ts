import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { HttpError } from './HttpError.js';

type RequestPart = 'body' | 'query' | 'params';

export const validateRequest = (schema: AnyZodObject, part: RequestPart = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse((req as any)[part]);
      (req as any)[part] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new HttpError(400, 'Validation failed', error.issues));
        return;
      }
      next(error);
    }
  };
