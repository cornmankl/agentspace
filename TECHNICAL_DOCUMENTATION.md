# 📚 AGENTSPACE - Technical Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Installation & Setup](#installation--setup)
4. [API Reference](#api-reference)
5. [CLI Reference](#cli-reference)
6. [Components](#components)
7. [Development Guide](#development-guide)
8. [Deployment](#deployment)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### What is AGENTSPACE?
AGENTSPACE is a multi-agent coordination platform that enables creation, management, and orchestration of AI agents. It provides a complete solution for building autonomous agent systems with real-time monitoring, task management, and AI-powered chat capabilities.

### Key Features
- 🤖 **Multi-Agent Management**: Create and coordinate multiple specialized AI agents
- 📋 **Task Orchestration**: Assign, track, and complete tasks across agents
- 💬 **AI Chat Integration**: Real-time chat with agents powered by GLM AI
- 🔄 **Real-time Updates**: WebSocket-based live updates
- 💾 **Data Persistence**: JSON file-based storage with automatic backups
- 🛡️ **Security**: Request validation, rate limiting, and environment-based configuration
- 🖥️ **Multi-Interface**: Web dashboard, CLI, and REST API
- 📊 **Monitoring**: Real-time metrics and system health monitoring

### Technology Stack
**Backend:**
- Node.js 20+ with TypeScript
- Express.js for REST API
- WebSocket (ws) for real-time communication
- Zod for schema validation
- Pino for structured logging
- Helmet for security headers
- GLM AI API integration

**Frontend:**
- React 18+ with TypeScript
- Vite for build tooling
- Axios for HTTP client
- React Context for state management
- CSS3 with custom properties

**Core:**
- EventEmitter3 for event handling
- Custom persistence layer
- Monorepo with Turborepo

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENTSPACE SYSTEM                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Web UI     │    │     CLI      │    │   REST API   │ │
│  │  (React)     │    │  (Commander) │    │   Clients    │ │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘ │
│         │                   │                    │          │
│         └───────────────────┴────────────────────┘          │
│                             │                               │
│         ┌───────────────────▼───────────────────┐          │
│         │         Express Server                │          │
│         │  (REST API + WebSocket)               │          │
│         └───────────────┬───────────────────────┘          │
│                         │                                   │
│         ┌───────────────▼───────────────────┐              │
│         │      Coordinator Service          │              │
│         │  ┌──────────────────────────────┐ │              │
│         │  │  Agent Manager               │ │              │
│         │  │  Task Manager                │ │              │
│         │  │  Message Broker              │ │              │
│         │  └──────────────────────────────┘ │              │
│         └───────────┬──────────┬────────────┘              │
│                     │          │                            │
│         ┌───────────▼──┐  ┌───▼────────────┐              │
│         │ Persistence  │  │  GLM AI API    │              │
│         │ (JSON Files) │  │  Integration   │              │
│         └──────────────┘  └────────────────┘              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
agentspace/
├── apps/
│   ├── server/              # Backend API Server
│   │   ├── src/
│   │   │   ├── index.ts     # Server entry point
│   │   │   ├── app.ts       # Express app factory
│   │   │   ├── routes/      # API route handlers
│   │   │   ├── services/    # Business logic (GLM)
│   │   │   ├── middleware/  # Express middleware
│   │   │   └── utils/       # Helper utilities
│   │   └── data/            # JSON storage
│   │
│   └── dashboard/           # Frontend React App
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── services/    # API clients
│       │   ├── hooks/       # Custom React hooks
│       │   ├── context/     # React Context
│       │   └── styles/      # CSS files
│       └── dist/            # Production build
│
├── packages/
│   ├── core/                # Core business logic
│   │   ├── AgentManager     # Agent lifecycle management
│   │   ├── TaskManager      # Task orchestration
│   │   ├── MessageBroker    # Inter-agent messaging
│   │   ├── Coordinator      # System coordinator
│   │   └── persistence/     # Storage adapters
│   │
│   └── types/               # Shared TypeScript types
│       └── index.ts         # Type definitions
│
├── cli.js                   # CLI implementation
└── agentspace              # CLI wrapper script
```

### Data Flow

```
1. User Action (Web/CLI/API)
   ↓
2. HTTP Request → Express Server
   ↓
3. Middleware (Validation, Rate Limit)
   ↓
4. Route Handler
   ↓
5. Coordinator Service
   ↓
6. AgentManager / TaskManager
   ↓
7. Persistence Layer (Save to JSON)
   ↓
8. Event Emitter (Trigger events)
   ↓
9. WebSocket Broadcast
   ↓
10. Frontend Real-time Update
```

---

## Installation & Setup

### Prerequisites
```bash
# Required
- Node.js 20.x or higher
- npm 9.x or higher
- Git

# Optional
- Docker (for containerized deployment)
```

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/yourusername/agentspace.git
cd agentspace

# 2. Install dependencies
npm install

# 3. Configure environment
cp apps/server/.env.example apps/server/.env
# Edit .env and add your GLM_API_KEY

# 4. Build packages
npm run build

# 5. Start backend server
cd apps/server
node dist/index.js

# 6. Start frontend (new terminal)
cd apps/dashboard
npm run dev

# 7. Access application
# Dashboard: http://localhost:5173
# API: http://localhost:3001
```

### Environment Configuration

**Backend (.env):**
```env
# Server
PORT=3001
NODE_ENV=development

# GLM AI API
GLM_API_KEY=your-api-key-here
GLM_API_URL=https://api.z.ai/api/coding/paas/v4
GLM_MODEL=glm-4-plus

# Storage
DATA_DIR=./data

# Security
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=120
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# WebSocket
WS_HEARTBEAT_INTERVAL_MS=30000
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=/api
VITE_API_TIMEOUT_MS=10000
VITE_WS_URL=ws://localhost:3001
```

---

## API Reference

### Base URL
```
http://localhost:3001
```

### Authentication
Currently no authentication required. JWT authentication planned for v2.0.

### Endpoints

#### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-07T09:00:00.000Z"
}
```

---

#### Agents

##### List All Agents
```http
GET /api/agents
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Agent Name",
    "type": "worker",
    "status": "idle",
    "capabilities": ["capability1", "capability2"],
    "metadata": {},
    "createdAt": "ISO-8601",
    "lastActiveAt": "ISO-8601"
  }
]
```

##### Get Agent by ID
```http
GET /api/agents/:id
```

**Response:** Single agent object

##### Create Agent
```http
POST /api/agents
Content-Type: application/json

{
  "name": "My Agent",
  "type": "worker",
  "capabilities": ["coding", "testing"]
}
```

**Types:** worker, analyzer, coordinator, assistant
**Status:** idle, busy, error, offline

##### Update Agent
```http
PUT /api/agents/:id
Content-Type: application/json

{
  "status": "busy"
}
```

##### Delete Agent
```http
DELETE /api/agents/:id
```

---

#### Tasks

##### List All Tasks
```http
GET /api/tasks
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Task Name",
    "description": "Task description",
    "status": "pending",
    "priority": "high",
    "assignedAgentId": "uuid",
    "input": {},
    "output": {},
    "createdAt": "ISO-8601",
    "startedAt": "ISO-8601",
    "completedAt": "ISO-8601"
  }
]
```

##### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "name": "Task Name",
  "description": "Description",
  "priority": "high",
  "assignedAgentId": "uuid"
}
```

**Priority:** low, medium, high
**Status:** pending, running, completed, failed

##### Complete Task
```http
POST /api/tasks/:id/complete
Content-Type: application/json

{
  "output": {
    "result": "Task completed successfully"
  }
}
```

##### Delete Task
```http
DELETE /api/tasks/:id
```

---

#### Chat

##### Send Chat Message
```http
POST /api/chat
Content-Type: application/json

{
  "agentId": "uuid",
  "message": "Your message here",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "agentId": "uuid",
  "agentName": "Agent Name",
  "response": "AI generated response...",
  "timestamp": "ISO-8601"
}
```

---

#### Metrics

##### Get System Metrics
```http
GET /api/metrics
```

**Response:**
```json
{
  "totalAgents": 5,
  "activeAgents": 3,
  "totalTasks": 10,
  "runningTasks": 2,
  "completedTasks": 7,
  "failedTasks": 1
}
```

---

### WebSocket Events

**Connection:**
```javascript
const ws = new WebSocket('ws://localhost:3001');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Event:', data.type, data.data);
};
```

**Event Types:**
- `connected` - Initial connection
- `agent:created` - New agent created
- `agent:status-changed` - Agent status updated
- `agent:deleted` - Agent deleted
- `task:created` - New task created
- `task:assigned` - Task assigned to agent
- `task:status-changed` - Task status updated
- `task:deleted` - Task deleted

---

## CLI Reference

### Installation
```bash
cd /home/daddybo/agentspace
chmod +x agentspace cli.js

# Add to PATH (optional)
echo 'export PATH="/home/daddybo/agentspace:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Commands

#### Status & Info
```bash
agentspace status              # System status
agentspace metrics             # System metrics
agentspace --help              # Show help
```

#### Agent Management
```bash
agentspace agents              # List agents
agentspace agent:create -n "Name" -t worker -c "cap1,cap2"
agentspace agent:delete <id>   # Delete agent
```

#### Task Management
```bash
agentspace tasks               # List tasks
agentspace task:create -n "Name" -p high
agentspace task:complete <id>  # Complete task
agentspace task:delete <id>    # Delete task
```

#### Chat
```bash
agentspace chat <agent-name>   # Interactive chat
agentspace ask <agent> "question"  # Quick question
```

### Examples

```bash
# Create specialized agent
agentspace agent:create \
  --name "Code Reviewer" \
  --type analyzer \
  --capabilities "code-review,testing,security"

# Create high priority task
agentspace task:create \
  --name "Review PR #123" \
  --priority high \
  --description "Review pull request changes"

# Chat with AI
agentspace chat "Personal AI Assistant"
You: Help me organize my tasks
Agent: [AI responds...]

# Quick question
agentspace ask "Personal AI Assistant" \
  "What should I prioritize today?"
```

---

## Components

### Core Components

#### Coordinator
Central orchestration service that manages agents, tasks, and messaging.

**Responsibilities:**
- Agent lifecycle management
- Task distribution and assignment
- Event coordination
- System metrics aggregation

**Example:**
```typescript
import { Coordinator, JsonFileStore } from '@agentspace/core';

const coordinator = new Coordinator({
  agentStorage: new JsonFileStore('agents.json'),
  taskStorage: new JsonFileStore('tasks.json'),
  autoAssignEnabled: true
});
```

#### AgentManager
Manages agent lifecycle and state.

**Methods:**
- `createAgent(data)` - Create new agent
- `getAgent(id)` - Get agent by ID
- `getAllAgents()` - Get all agents
- `updateAgentStatus(id, status)` - Update status
- `deleteAgent(id)` - Delete agent

**Events:**
- `agent:created`
- `agent:status-changed`
- `agent:deleted`

#### TaskManager
Handles task orchestration and assignment.

**Methods:**
- `createTask(data)` - Create new task
- `getTask(id)` - Get task by ID
- `getAllTasks()` - Get all tasks
- `assignTask(taskId, agentId)` - Assign task
- `completeTask(id, output)` - Complete task
- `deleteTask(id)` - Delete task

**Events:**
- `task:created`
- `task:assigned`
- `task:status-changed`
- `task:deleted`

#### MessageBroker
Inter-agent message passing.

**Methods:**
- `sendMessage(from, to, type, payload)`
- `getMessageHistory(agentId)`
- `clearMessageHistory()`

### Frontend Components

#### Dashboard
Main container component with real-time updates.

**Features:**
- Agent list with status indicators
- Task list with priority badges
- System metrics panel
- Real-time WebSocket updates
- Error handling and loading states

#### ChatBox
AI chat interface component.

**Features:**
- Agent selection
- Message history
- Real-time AI responses
- Conversation context management
- Loading indicators

#### Forms
- CreateAgentForm - Agent creation
- CreateTaskForm - Task creation
- Validation and error handling

---

## Development Guide

### Project Structure
```
agentspace/
├── apps/
│   ├── server/          # Backend
│   └── dashboard/       # Frontend
├── packages/
│   ├── core/           # Core logic
│   └── types/          # Shared types
├── cli.js              # CLI tool
└── turbo.json          # Turborepo config
```

### Build & Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Development mode (all packages)
npm run dev

# Build specific workspace
npm run build --workspace @agentspace/server

# Run tests
npm test

# Run tests for specific package
npm test --workspace @agentspace/server
```

### Adding New Features

#### 1. Add New Agent Capability
```typescript
// packages/core/src/AgentManager.ts
export const AGENT_CAPABILITIES = [
  'existing-cap',
  'new-capability'  // Add here
];
```

#### 2. Add New Task Priority
```typescript
// packages/types/src/index.ts
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'  // Add here
}
```

#### 3. Add New API Endpoint
```typescript
// apps/server/src/routes/custom.ts
import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

const schema = z.object({
  field: z.string()
});

router.post('/', validateRequest(schema), async (req, res) => {
  // Implementation
  res.json({ success: true });
});

export { router as customRoutes };
```

```typescript
// apps/server/src/app.ts
import { customRoutes } from './routes/custom';
app.use('/api/custom', customRoutes);
```

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/routes.test.ts

# Watch mode
npm test -- --watch
```

**Test Example:**
```typescript
import { describe, it, expect } from 'vitest';
import { createApp } from '../src/app';
import request from 'supertest';

describe('API Tests', () => {
  const { app } = createApp();

  it('should create agent', async () => {
    const response = await request(app)
      .post('/api/agents')
      .send({
        name: 'Test Agent',
        type: 'worker',
        capabilities: ['testing']
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Test Agent');
  });
});
```

---

## Deployment

### Production Build

```bash
# Build all packages
npm run build

# Build outputs:
# - apps/server/dist/
# - apps/dashboard/dist/
# - packages/core/dist/
```

### Docker Deployment

**Dockerfile (Backend):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/server/package.json apps/server/
RUN npm install --production
COPY apps/server/dist apps/server/dist
EXPOSE 3001
CMD ["node", "apps/server/dist/index.js"]
```

**Dockerfile (Frontend):**
```dockerfile
FROM nginx:alpine
COPY apps/dashboard/dist /usr/share/nginx/html
EXPOSE 80
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - GLM_API_KEY=${GLM_API_KEY}
    volumes:
      - ./data:/app/data

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.dashboard
    ports:
      - "80:80"
    depends_on:
      - backend
```

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=3001
GLM_API_KEY=prod-key
DATA_DIR=/app/data
RATE_LIMIT_MAX=60
CORS_ORIGINS=https://yourdomain.com
```

### Monitoring

**Health Check:**
```bash
curl http://localhost:3001/health
```

**Logs:**
```bash
# Server logs
tail -f /var/log/agentspace/server.log

# Application logs (PM2)
pm2 logs agentspace
```

---

## Best Practices

### Code Quality
1. **TypeScript Strict Mode**: Enable strict type checking
2. **Linting**: Use ESLint for code quality
3. **Testing**: Maintain >80% code coverage
4. **Code Review**: Require reviews for all PRs

### Security
1. **Environment Variables**: Never commit secrets
2. **Input Validation**: Validate all user inputs with Zod
3. **Rate Limiting**: Implement on all public endpoints
4. **HTTPS**: Use HTTPS in production
5. **CORS**: Configure allowed origins

### Performance
1. **Caching**: Cache frequently accessed data
2. **Database Indexes**: Index commonly queried fields
3. **WebSocket**: Use for real-time updates
4. **Compression**: Enable gzip compression
5. **CDN**: Use CDN for static assets

### Monitoring
1. **Logging**: Use structured logging (Pino)
2. **Metrics**: Track key performance indicators
3. **Error Tracking**: Use error tracking service
4. **Health Checks**: Implement comprehensive health checks

---

## Troubleshooting

### Common Issues

#### Server Won't Start
```bash
# Check port availability
lsof -i :3001

# Kill existing process
kill -9 $(lsof -t -i:3001)

# Check environment variables
cat apps/server/.env
```

#### WebSocket Connection Fails
```bash
# Check firewall
sudo ufw status

# Test WebSocket
wscat -c ws://localhost:3001
```

#### GLM API Errors
```bash
# Verify API key
curl -H "Authorization: Bearer $GLM_API_KEY" \
  https://api.z.ai/api/coding/paas/v4/models

# Check logs
tail -f apps/server/logs/app.log
```

#### Build Errors
```bash
# Clean and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Tests Failing
```bash
# Clear test cache
npm test -- --clearCache

# Run tests in isolation
npm test -- --no-coverage --maxWorkers=1
```

### Debug Mode

```bash
# Enable debug logging
DEBUG=* node apps/server/dist/index.js

# Node.js inspector
node --inspect apps/server/dist/index.js
```

### Performance Issues

```bash
# Monitor memory
node --max-old-space-size=4096 apps/server/dist/index.js

# Profile performance
node --prof apps/server/dist/index.js
node --prof-process isolate-*.log > processed.txt
```

---

## Appendix

### Glossary
- **Agent**: Autonomous entity that performs tasks
- **Task**: Work unit assigned to agents
- **Coordinator**: Central orchestration service
- **GLM**: AI language model API
- **WebSocket**: Real-time bidirectional communication

### Resources
- [GLM API Documentation](https://docs.z.ai)
- [Express.js Docs](https://expressjs.com)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Version History
- **v1.0.0** (2025-10-07): Initial release
  - Multi-agent management
  - Task orchestration
  - GLM AI integration
  - Web dashboard
  - CLI tool
  - REST API
  - WebSocket support

---

**Documentation Version:** 1.0.0
**Last Updated:** 2025-10-07
**Author:** AGENTSPACE Team
