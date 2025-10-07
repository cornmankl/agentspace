import { Request } from 'express';
import { Coordinator } from '@agentspace/core';

export type CoordinatorRequest<T = any> = Request & {
  coordinator: Coordinator;
  body: T;
};
