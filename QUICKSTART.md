# 🚀 AGENTSPACE Quick Start Guide

Get AGENTSPACE up and running in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 9+ (comes with Node.js)

## Installation

### Option 1: Quick Setup (Recommended)

```bash
cd agentspace
./scripts/setup.sh
```

This script will:
1. Check Node.js and npm versions
2. Install all dependencies
3. Build all packages
4. Verify the installation

### Option 2: Manual Setup

```bash
cd agentspace

# Install dependencies
npm install

# Build packages
npm run build
```

## Running AGENTSPACE

### Development Mode

Start both server and dashboard in development mode:

```bash
npm run dev
```

This will start:
- **Server**: http://localhost:3001 (API + WebSocket)
- **Dashboard**: http://localhost:3000 (Web UI)

The dashboard will automatically proxy API requests to the server.

### Production Mode

```bash
# Build everything
npm run build

# Start in production mode
npm start
```

## First Steps

### 1. Open the Dashboard

Navigate to http://localhost:3000 in your browser.

### 2. Create Your First Agent

Click **"+ New Agent"** and fill in:
- **Name**: "My First Agent"
- **Type**: "worker"
- **Capabilities**: "data-processing, analysis"

### 3. Create Your First Task

Click **"+ New Task"** and fill in:
- **Name**: "Process Data"
- **Description**: "Analyze customer dataset"
- **Priority**: "High"
- **Assign to Agent**: Select your agent or leave blank for auto-assignment

### 4. Watch It Work!

The dashboard will update in real-time showing:
- Agent status changes
- Task assignments
- Completion status

## Running the Demo

After starting the server, run the included demo:

```bash
./scripts/demo.sh
```

Or manually:

```bash
cd examples
npm install
npm run demo
```

The demo will:
1. Create 3 agents with different capabilities
2. Create 3 tasks with different priorities
3. Show auto-assignment in action
4. Display system metrics
5. Complete the tasks

## Using the API

### Create an Agent

```bash
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Data Processor",
    "type": "worker",
    "capabilities": ["data-processing", "analysis"]
  }'
```

### Create a Task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Process Dataset",
    "description": "Analyze customer data",
    "priority": "high",
    "input": {"dataset": "customers.csv"}
  }'
```

### Get System Metrics

```bash
curl http://localhost:3001/api/metrics
```

### List All Agents

```bash
curl http://localhost:3001/api/agents
```

### List All Tasks

```bash
curl http://localhost:3001/api/tasks
```

## Docker Deployment

### Using Docker Compose

```bash
docker-compose up --build
```

Access:
- Dashboard: http://localhost:3000
- API: http://localhost:3001

### Stop Docker Services

```bash
docker-compose down
```

## WebSocket Connection

Connect to real-time updates:

```javascript
const ws = new WebSocket('ws://localhost:3001');

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Update:', message);
};
```

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

1. Stop the conflicting service
2. Or modify the ports in:
   - Server: `apps/server/.env` → `PORT=3002`
   - Dashboard: `apps/dashboard/vite.config.ts` → `port: 3003`

### Dependencies Not Installing

Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Clean and rebuild:
```bash
npm run clean
npm install
npm run build
```

### Server Not Starting

Check Node.js version:
```bash
node --version  # Should be 18+
```

## Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Explore the [API endpoints](README.md#-api-endpoints)
3. Check out [examples/demo.ts](examples/demo.ts) for code examples
4. Read [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    AGENTSPACE                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐         ┌──────────────┐         │
│  │   Dashboard  │────────▶│   API Server │         │
│  │   (React)    │◀────────│   (Express)  │         │
│  └──────────────┘         └──────────────┘         │
│         │                        │                  │
│         │                        │                  │
│         ▼                        ▼                  │
│  ┌──────────────┐         ┌──────────────┐         │
│  │  WebSocket   │◀───────▶│  Coordinator │         │
│  │   Client     │         │    (Core)    │         │
│  └──────────────┘         └──────────────┘         │
│                                  │                  │
│                     ┌────────────┼────────────┐    │
│                     ▼            ▼            ▼    │
│              ┌───────────┐ ┌──────────┐ ┌────────┐│
│              │   Agent   │ │   Task   │ │Message ││
│              │  Manager  │ │ Manager  │ │ Broker ││
│              └───────────┘ └──────────┘ └────────┘│
└─────────────────────────────────────────────────────┘
```

## Features You Can Build

With AGENTSPACE, you can create:
- Multi-agent task processing systems
- Distributed computing workflows
- Agent-based simulations
- Task orchestration platforms
- AI agent coordination systems
- Automated workflow management

## Support

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/yourusername/agentspace/issues)
- 💬 [Discussions](https://github.com/yourusername/agentspace/discussions)

---

**Happy Building! 🚀**
