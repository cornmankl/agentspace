# 🤖 AGENTSPACE

**AI Agent Workspace Platform** - A modern, scalable system for managing and coordinating multiple AI agents with real-time monitoring and task distribution.

## ✨ Features

- **Multi-Agent Management**: Create, configure, and manage multiple AI agents with different capabilities
- **Task Coordination**: Intelligent task distribution and priority-based scheduling
- **Real-time Updates**: WebSocket-based live updates for agent status and task progress
- **Interactive Dashboard**: Modern React-based UI for monitoring and control
- **Auto-Assignment**: Automatic task assignment based on agent capabilities
- **Message Broker**: Built-in communication system for inter-agent messaging
- **RESTful API**: Complete API for programmatic access
- **Scalable Architecture**: Monorepo structure with TypeScript and modern tooling

## 🏗️ Architecture

```
agentspace/
├── apps/
│   ├── server/          # Express API server with WebSocket
│   └── dashboard/       # React frontend dashboard
└── packages/
    ├── core/           # Core agent logic and coordination
    └── types/          # Shared TypeScript types
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. **Clone and navigate to the project**
```bash
cd agentspace
```

2. **Install dependencies**
```bash
npm install
```

3. **Build packages**
```bash
npm run build
```

4. **Start development servers**
```bash
npm run dev
```

This will start:
- Server: http://localhost:3001
- Dashboard: http://localhost:3000

## 🐳 Docker Deployment

### Using Docker Compose

```bash
docker-compose up --build
```

This will start both the server and dashboard in containers.

### Individual Containers

**Server:**
```bash
docker build -f apps/server/Dockerfile -t agentspace-server .
docker run -p 3001:3001 agentspace-server
```

**Dashboard:**
```bash
docker build -f apps/dashboard/Dockerfile -t agentspace-dashboard .
docker run -p 3000:3000 agentspace-dashboard
```

## 📖 Usage

### Creating an Agent

```typescript
POST /api/agents
{
  "name": "Data Processor",
  "type": "worker",
  "capabilities": ["data-processing", "analysis"]
}
```

### Creating a Task

```typescript
POST /api/tasks
{
  "name": "Process Dataset",
  "description": "Analyze customer data",
  "priority": "high",
  "input": { "dataset": "customers.csv" }
}
```

### Querying Agents

```bash
GET /api/agents                    # All agents
GET /api/agents?status=idle        # By status
GET /api/agents?capability=analysis # By capability
```

### Querying Tasks

```bash
GET /api/tasks                     # All tasks
GET /api/tasks?status=running      # By status
GET /api/tasks?priority=high       # By priority
GET /api/tasks/pending             # Pending tasks (sorted by priority)
```

## 🔌 API Endpoints

### Agents
- `POST /api/agents` - Create agent
- `GET /api/agents` - List all agents
- `GET /api/agents/:id` - Get agent details
- `PATCH /api/agents/:id/status` - Update agent status
- `DELETE /api/agents/:id` - Delete agent

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks` - List all tasks
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks/:id/assign` - Assign task to agent
- `POST /api/tasks/:id/complete` - Mark task as completed
- `POST /api/tasks/:id/fail` - Mark task as failed
- `DELETE /api/tasks/:id` - Delete task

### Metrics
- `GET /api/metrics` - Get system metrics

### Health
- `GET /health` - Health check

## 🌐 WebSocket Events

Connect to `ws://localhost:3001` to receive real-time updates:

- `agent:created` - New agent created
- `agent:status-changed` - Agent status updated
- `agent:deleted` - Agent deleted
- `task:created` - New task created
- `task:assigned` - Task assigned to agent
- `task:status-changed` - Task status updated
- `task:deleted` - Task deleted

## 🎯 Core Concepts

### Agent Status
- `idle` - Ready for work
- `busy` - Currently processing a task
- `error` - Error state
- `offline` - Not available

### Task Status
- `pending` - Waiting for assignment
- `running` - Being processed
- `completed` - Successfully finished
- `failed` - Error occurred
- `cancelled` - Manually cancelled

### Task Priority
- `critical` - Highest priority
- `high` - High priority
- `medium` - Normal priority
- `low` - Low priority

## 🛠️ Development

### Project Structure

```
packages/
├── types/              # Shared TypeScript interfaces
│   └── src/
│       └── index.ts   # Agent, Task, Message types
│
├── core/              # Core business logic
│   └── src/
│       ├── AgentManager.ts    # Agent CRUD operations
│       ├── TaskManager.ts     # Task management
│       ├── MessageBroker.ts   # Inter-agent communication
│       └── Coordinator.ts     # System coordination

apps/
├── server/            # Backend API
│   └── src/
│       ├── index.ts           # Express app setup
│       ├── routes/            # API route handlers
│       └── websocket.ts       # WebSocket server
│
└── dashboard/         # Frontend UI
    └── src/
        ├── components/        # React components
        ├── services/          # API client
        └── hooks/            # Custom React hooks
```

### Building

```bash
npm run build          # Build all packages
npm run clean          # Clean build artifacts
```

### Running Tests

```bash
npm test
```

## 📊 System Metrics

The system tracks:
- Total agents
- Active agents (idle + busy)
- Total tasks
- Running tasks
- Completed tasks
- Failed tasks

Access via `/api/metrics` or view in the dashboard.

## 🔧 Configuration

### Server Configuration

Create `apps/server/.env`:
```env
PORT=3001
NODE_ENV=development
```

### Dashboard Configuration

The dashboard proxies API requests through Vite dev server (configured in `vite.config.ts`).

## 🚦 Auto-Assignment

AGENTSPACE features intelligent auto-assignment:

1. When a task is created without an assigned agent
2. System finds idle agents
3. Matches agent capabilities with task requirements
4. Assigns task to best-fit agent
5. Updates agent status to `busy`
6. Sends task message via message broker

## 📝 Example Workflow

1. **Create agents** with different capabilities:
   - Agent A: `["data-processing", "analysis"]`
   - Agent B: `["reporting", "visualization"]`

2. **Create tasks** with specific requirements:
   - Task 1: "data-processing" → Auto-assigned to Agent A
   - Task 2: "reporting" → Auto-assigned to Agent B

3. **Monitor progress** via:
   - Dashboard UI (real-time updates)
   - API polling
   - WebSocket events

4. **Complete tasks**:
   - Agents mark tasks as complete
   - Status changes propagate instantly
   - Agents return to `idle` state

## 🔮 Future Enhancements

- Database persistence (SQLite/PostgreSQL)
- Agent authentication and authorization
- Advanced scheduling algorithms
- Task dependencies and workflows
- Agent performance metrics
- Plugin system for custom agent types
- CLI for agent and task management
- GraphQL API option

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! This is a foundational platform for agent coordination.

---

**Built with TypeScript, Express, React, and WebSocket**

For questions or issues, please open an issue on the repository.
