import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { rmSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { createApp } from '../src/app.js';

const dataDir = path.resolve('.test-data');

describe('API routes', () => {
  let app: ReturnType<typeof createApp>['app'];
  let coordinator: ReturnType<typeof createApp>['coordinator'];

  beforeAll(() => {
    rmSync(dataDir, { recursive: true, force: true });
    const build = createApp({ dataDir, rateLimitMax: 1000 });
    app = build.app;
    coordinator = build.coordinator;
    mkdirSync(dataDir, { recursive: true });
  });

  afterEach(() => {
    coordinator.reset();
    rmSync(dataDir, { recursive: true, force: true });
    mkdirSync(dataDir, { recursive: true });
  });

  afterAll(() => {
    rmSync(dataDir, { recursive: true, force: true });
  });

  it('rejects invalid agent payloads with validation error', async () => {
    const response = await request(app).post('/api/agents').send({ name: 'Incomplete Agent' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toBeDefined();
  });

  it('creates an agent and persists it to disk', async () => {
    const res = await request(app).post('/api/agents').send({
      name: 'Test Agent',
      type: 'worker',
      capabilities: ['testing'],
    });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test Agent');

    const agentsFile = path.join(dataDir, 'agents.json');
    expect(existsSync(agentsFile)).toBe(true);
    const savedAgents = JSON.parse(readFileSync(agentsFile, 'utf-8'));
    expect(savedAgents).toHaveLength(1);
    expect(savedAgents[0].name).toBe('Test Agent');
  });

  it('rejects invalid task payloads', async () => {
    const response = await request(app).post('/api/tasks').send({ name: 'Bad Task' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  it('creates a task and returns task list', async () => {
    const createResponse = await request(app).post('/api/tasks').send({
      name: 'Process Data',
      description: 'Clean dataset',
      priority: 'high',
      input: { dataset: 'users.csv' },
    });

    expect(createResponse.status).toBe(201);

    const listResponse = await request(app).get('/api/tasks');
    expect(listResponse.status).toBe(200);
    expect(Array.isArray(listResponse.body)).toBe(true);
    expect(listResponse.body.length).toBe(1);
    expect(listResponse.body[0].name).toBe('Process Data');
  });

  it('returns system metrics', async () => {
    const response = await request(app).get('/api/metrics');
    expect(response.status).toBe(200);
    expect(typeof response.body.totalAgents).toBe('number');
    expect(typeof response.body.totalTasks).toBe('number');
  });
});
