import { Coordinator } from '@agentspace/core';

declare global {
  namespace Express {
    interface Request {
      coordinator: Coordinator;
    }
  }
}

export {};
