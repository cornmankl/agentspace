# 📊 AGENTSPACE - Project Diagrams

Complete visual documentation of AGENTSPACE architecture and flows.

---

## 🏗️ 1. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         AGENTSPACE PLATFORM                         │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND LAYER                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ Futuristic       │  │ Dashboard        │  │ Chat Box        │ │
│  │ Landing Page     │  │ Interface        │  │ (GLM-4.6)       │ │
│  │                  │  │                  │  │                 │ │
│  │ • Hero Section   │  │ • Agent List     │  │ • Real AI Chat  │ │
│  │ • Chat Input     │  │ • Task List      │  │ • Multi-Agent   │ │
│  │ • Navigation     │  │ • Metrics Panel  │  │ • Typing UI     │ │
│  │ • Footer         │  │ • Smart Prompts  │  │ • History       │ │
│  └──────────────────┘  └──────────────────┘  └─────────────────┘ │
│                                                                     │
│  Technology: React + TypeScript + Vite                             │
│  Port: 3002                                                         │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/WebSocket
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                          BACKEND LAYER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ Express Server   │  │ WebSocket        │  │ API Routes      │ │
│  │                  │  │ Server           │  │                 │ │
│  │ • REST API       │  │                  │  │ • /api/agents   │ │
│  │ • Middleware     │  │ • Real-time      │  │ • /api/tasks    │ │
│  │ • CORS           │  │ • Broadcast      │  │ • /api/metrics  │ │
│  │ • JSON Parser    │  │ • Events         │  │ • /api/chat     │ │
│  └──────────────────┘  └──────────────────┘  └─────────────────┘ │
│                                                                     │
│  Technology: Node.js + Express + TypeScript                        │
│  Port: 3001                                                         │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                         CORE LOGIC LAYER                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ Coordinator      │  │ Agent Manager    │  │ Task Manager    │ │
│  │                  │  │                  │  │                 │ │
│  │ • System Coord   │  │ • CRUD Ops       │  │ • Task Queue    │ │
│  │ • Auto-Assign    │  │ • Status Track   │  │ • Assignment    │ │
│  │ • Metrics        │  │ • Capabilities   │  │ • Lifecycle     │ │
│  └──────────────────┘  └──────────────────┘  └─────────────────┘ │
│                                                                     │
│  ┌──────────────────┐                                              │
│  │ Message Broker   │                                              │
│  │                  │                                              │
│  │ • Pub/Sub        │                                              │
│  │ • Events         │                                              │
│  │ • History        │                                              │
│  └──────────────────┘                                              │
│                                                                     │
│  Package: @agentspace/core                                         │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                         AI INTEGRATION LAYER                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐                                              │
│  │ GLM Service      │                                              │
│  │                  │                                              │
│  │ • API Client     │ ──────────────────────┐                     │
│  │ • Context Build  │                       │                     │
│  │ • Chat Completion│                       │                     │
│  │ • Error Handling │                       │                     │
│  └──────────────────┘                       │                     │
│                                              │                     │
└──────────────────────────────────────────────┼─────────────────────┘
                                               │
                                               │ HTTPS
                                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       EXTERNAL API                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │         GLM-4.6 API (Z.AI Coding Platform)                 │   │
│  │                                                             │   │
│  │  Endpoint: https://api.z.ai/api/coding/paas/v4            │   │
│  │  Model: glm-4-plus                                         │   │
│  │  Features: Chat completion, Context awareness              │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         DATA STORAGE                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐                                              │
│  │ In-Memory Store  │                                              │
│  │                  │                                              │
│  │ • Agents Data    │                                              │
│  │ • Tasks Data     │                                              │
│  │ • Messages       │                                              │
│  │ • Metrics        │                                              │
│  └──────────────────┘                                              │
│                                                                     │
│  Note: Currently in-memory, future: PostgreSQL/MongoDB            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 2. Data Flow Diagram

```
┌─────────────┐
│   Browser   │
│   (User)    │
└──────┬──────┘
       │
       │ 1. Visit http://localhost:3002
       │
       ▼
┌─────────────────────────────────────────┐
│     Futuristic Landing Page             │
│                                         │
│  • "What should we build today?"       │
│  • Central chat input                  │
│  • [Plan] [+] buttons                  │
└──────┬──────────────────────────────────┘
       │
       │ 2. Click "Launch Dashboard" or "Plan"
       │
       ▼
┌─────────────────────────────────────────┐
│         Dashboard Interface             │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  3. Load Initial Data           │   │
│  │     GET /api/agents             │   │
│  │     GET /api/tasks              │   │
│  │     GET /api/metrics            │   │
│  └─────────────────────────────────┘   │
└──────┬──────────────────────────────────┘
       │
       │ 4. Establish WebSocket Connection
       │    ws://localhost:3001
       │
       ▼
┌─────────────────────────────────────────┐
│       Backend Server (Port 3001)        │
│                                         │
│  Express Server + WebSocket Server     │
└──────┬──────────────────────────────────┘
       │
       │ 5. Process Request
       │
       ▼
┌─────────────────────────────────────────┐
│       Coordinator Layer                 │
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ Agent Mgr   │  │ Task Mgr    │     │
│  └─────────────┘  └─────────────┘     │
└──────┬──────────────────────────────────┘
       │
       │ 6. Return Data
       │
       ▼
┌─────────────────────────────────────────┐
│         Dashboard UI Updates            │
│                                         │
│  • Agent List populated                │
│  • Task List populated                 │
│  • Metrics displayed                   │
│  • Smart Prompts shown                 │
└─────────────────────────────────────────┘

─────────────  CHAT FLOW  ─────────────

┌─────────────┐
│   User      │
└──────┬──────┘
       │
       │ 7. Click Chat Button (💬)
       │
       ▼
┌─────────────────────────────────────────┐
│         Chat Box Opens                  │
│                                         │
│  • Select Agent dropdown               │
│  • Message input                       │
└──────┬──────────────────────────────────┘
       │
       │ 8. Select Agent & Type Message
       │
       ▼
┌─────────────────────────────────────────┐
│    POST /api/chat                       │
│                                         │
│    Request Body:                        │
│    {                                    │
│      agentId: "...",                   │
│      message: "Hello!",                │
│      conversationHistory: [...]        │
│    }                                    │
└──────┬──────────────────────────────────┘
       │
       │ 9. Backend Processes
       │
       ▼
┌─────────────────────────────────────────┐
│    GLM Service Layer                    │
│                                         │
│  1. Get agent details                  │
│  2. Build agent context                │
│  3. Prepare messages                   │
└──────┬──────────────────────────────────┘
       │
       │ 10. Call GLM-4.6 API
       │
       ▼
┌─────────────────────────────────────────┐
│    GLM-4.6 API (Z.AI)                  │
│                                         │
│    POST /chat/completions              │
│    Model: glm-4-plus                   │
└──────┬──────────────────────────────────┘
       │
       │ 11. AI Response
       │
       ▼
┌─────────────────────────────────────────┐
│    Backend Returns Response             │
│                                         │
│    {                                    │
│      success: true,                    │
│      agentName: "...",                 │
│      response: "AI generated text",   │
│      timestamp: "..."                  │
│    }                                    │
└──────┬──────────────────────────────────┘
       │
       │ 12. Display in Chat
       │
       ▼
┌─────────────────────────────────────────┐
│    Chat Box Updates                     │
│                                         │
│    User: Hello!                        │
│    Agent: [AI Response appears]        │
└─────────────────────────────────────────┘

─────────────  REAL-TIME UPDATES  ─────────────

┌─────────────────────────────────────────┐
│    Task/Agent State Change              │
└──────┬──────────────────────────────────┘
       │
       │ 13. Event Triggered
       │
       ▼
┌─────────────────────────────────────────┐
│    WebSocket Broadcast                  │
│                                         │
│    Event: agent:created                │
│    Event: task:updated                 │
│    Event: task:assigned                │
└──────┬──────────────────────────────────┘
       │
       │ 14. Push to all connected clients
       │
       ▼
┌─────────────────────────────────────────┐
│    Dashboard Auto-Refresh               │
│                                         │
│    • Reload agents list                │
│    • Reload tasks list                 │
│    • Update metrics                    │
└─────────────────────────────────────────┘
```

---

## 🗂️ 3. File Structure Diagram

```
agentspace/
│
├── 📦 packages/
│   ├── types/                    # Type definitions
│   │   ├── src/
│   │   │   └── index.ts         # Agent, Task, Message types
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── core/                     # Core business logic
│       ├── src/
│       │   ├── AgentManager.ts  # Agent CRUD & management
│       │   ├── TaskManager.ts   # Task lifecycle & queue
│       │   ├── MessageBroker.ts # Event pub/sub system
│       │   ├── Coordinator.ts   # System coordination
│       │   └── index.ts         # Exports
│       ├── package.json
│       └── tsconfig.json
│
├── 🚀 apps/
│   ├── server/                   # Backend API server
│   │   ├── src/
│   │   │   ├── index.ts         # Server entry point
│   │   │   ├── routes/
│   │   │   │   ├── agents.ts    # GET/POST /api/agents
│   │   │   │   ├── tasks.ts     # GET/POST /api/tasks
│   │   │   │   ├── metrics.ts   # GET /api/metrics
│   │   │   │   └── chat.ts      # POST /api/chat
│   │   │   ├── services/
│   │   │   │   └── glm.ts       # GLM-4.6 API integration
│   │   │   └── websocket.ts     # WebSocket server
│   │   ├── .env                 # Environment variables
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── dashboard/                # Frontend React app
│       ├── src/
│       │   ├── App.tsx          # Main app component
│       │   ├── main.tsx         # Entry point
│       │   ├── components/
│       │   │   ├── FuturisticLanding.tsx   # Landing page
│       │   │   ├── Dashboard.tsx           # Main dashboard
│       │   │   ├── AgentList.tsx          # Agent display
│       │   │   ├── TaskList.tsx           # Task display
│       │   │   ├── MetricsPanel.tsx       # Metrics display
│       │   │   ├── SuggestedPrompts.tsx   # Smart prompts
│       │   │   ├── ChatBox.tsx            # Chat interface
│       │   │   ├── ChatButton.tsx         # Chat toggle button
│       │   │   ├── CreateAgentForm.tsx    # Agent creation
│       │   │   └── CreateTaskForm.tsx     # Task creation
│       │   ├── services/
│       │   │   ├── api.ts       # API client (agents, tasks)
│       │   │   └── chatApi.ts   # Chat API client
│       │   ├── hooks/
│       │   │   └── useWebSocket.ts        # WebSocket hook
│       │   └── utils/
│       │       └── promptTemplates.ts     # Prompt templates
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── 📜 scripts/
│   ├── create-sample-data.sh    # Sample data generator
│   ├── setup.sh                 # Initial setup
│   └── demo.sh                  # Demo script
│
├── 📚 Documentation/
│   ├── README.md                # Main documentation
│   ├── QUICKSTART.md            # Quick start guide
│   ├── GLM_INTEGRATION_GUIDE.md # GLM integration docs
│   ├── CHAT_BOX_GUIDE.md        # Chat feature docs
│   ├── FUTURISTIC_LANDING_GUIDE.md # Landing page docs
│   ├── DIAGRAMS.md              # This file!
│   └── [Other guides...]
│
├── 🔧 Configuration/
│   ├── package.json             # Root package.json
│   ├── turbo.json               # Turborepo config
│   ├── tsconfig.json            # TypeScript config
│   └── .env                     # Root environment
│
└── 📊 Tests/
    └── tests/
        └── comprehensive-test.ts # Test suite
```

---

## 🔌 4. API Flow Diagram

### **Agent Creation Flow**

```
Frontend                Backend              Core Layer
   │                       │                     │
   │  POST /api/agents    │                     │
   ├──────────────────────>│                     │
   │                       │                     │
   │  {                    │  Validate request   │
   │    name: "...",       ├────────────────────>│
   │    type: "...",       │                     │
   │    capabilities: []   │  coordinator        │
   │  }                    │    .getAgentManager()
   │                       │    .createAgent()   │
   │                       │                     │
   │                       │<────────────────────┤
   │                       │  Return new agent   │
   │                       │                     │
   │  Response: Agent      │  Broadcast event    │
   │<──────────────────────┤  via WebSocket      │
   │                       │                     │
   │  {                    │  ────────────────>  │
   │    id: "...",         │  agent:created      │
   │    name: "...",       │                     │
   │    status: "active"   │                     │
   │  }                    │                     │
   │                       │                     │
   │  WebSocket Update     │                     │
   │<──────────────────────┤                     │
   │                       │                     │
   │  Refresh agent list   │                     │
   │                       │                     │
```

### **Task Creation with Auto-Assignment Flow**

```
Frontend                Backend              Core Layer
   │                       │                     │
   │  POST /api/tasks     │                     │
   ├──────────────────────>│                     │
   │                       │                     │
   │  {                    │  Validate request   │
   │    name: "...",       ├────────────────────>│
   │    priority: "high"   │                     │
   │  }                    │  coordinator        │
   │                       │    .assignTask()    │
   │                       │                     │
   │                       │  1. Create task     │
   │                       │  2. Find capable    │
   │                       │     agent           │
   │                       │  3. Auto-assign     │
   │                       │                     │
   │                       │<────────────────────┤
   │                       │  Return task + agent│
   │                       │                     │
   │  Response: Task       │  Broadcast events   │
   │<──────────────────────┤                     │
   │                       │  • task:created     │
   │  {                    │  • task:assigned    │
   │    id: "...",         │  • agent:updated    │
   │    assignedTo: "..."  │                     │
   │  }                    │                     │
   │                       │                     │
   │  WebSocket Updates    │                     │
   │<──────────────────────┤                     │
   │                       │                     │
   │  • Task list refresh  │                     │
   │  • Agent list refresh │                     │
   │  • Metrics update     │                     │
   │                       │                     │
```

### **Chat Message Flow (GLM-4.6)**

```
Frontend              Backend              GLM Service         GLM API
   │                     │                      │                 │
   │  POST /api/chat    │                      │                 │
   ├────────────────────>│                      │                 │
   │                     │                      │                 │
   │  {                  │  Get agent details   │                 │
   │    agentId: "...",  ├─────────────────────>│                 │
   │    message: "...",  │                      │                 │
   │    history: [...]   │  Build context       │                 │
   │  }                  │  • Agent name        │                 │
   │                     │  • Agent type        │                 │
   │                     │  • Capabilities      │                 │
   │                     │                      │                 │
   │                     │  Call GLM API        │                 │
   │                     │─────────────────────>│                 │
   │                     │                      │                 │
   │                     │                      │  POST /chat/    │
   │                     │                      │  completions    │
   │                     │                      ├────────────────>│
   │                     │                      │                 │
   │                     │                      │  {              │
   │                     │                      │    model: "...",│
   │                     │                      │    messages: [] │
   │                     │                      │  }              │
   │                     │                      │                 │
   │                     │                      │  AI Response    │
   │                     │                      │<────────────────┤
   │                     │                      │                 │
   │                     │  Return response     │                 │
   │                     │<─────────────────────┤                 │
   │                     │                      │                 │
   │  Response           │                      │                 │
   │<────────────────────┤                      │                 │
   │                     │                      │                 │
   │  {                  │                      │                 │
   │    response: "...", │                      │                 │
   │    agentName: "..." │                      │                 │
   │  }                  │                      │                 │
   │                     │                      │                 │
   │  Display in chat    │                      │                 │
   │                     │                      │                 │
```

---

## 🎨 5. Component Hierarchy Diagram

```
App.tsx
  │
  ├─── FuturisticLanding (Initial view)
  │     │
  │     ├─── Navigation
  │     │     ├─── Logo
  │     │     ├─── Nav Links (5)
  │     │     └─── Dashboard Button
  │     │
  │     ├─── Hero Section
  │     │     ├─── Headline
  │     │     ├─── Chat Input
  │     │     │     ├─── Input Field
  │     │     │     ├─── Plan Button
  │     │     │     └─── + Button
  │     │     └─── Subtext
  │     │
  │     └─── Footer
  │           ├─── Footer Grid (4 columns)
  │           │     ├─── Product Links
  │           │     ├─── Company Links
  │           │     ├─── Legal Links
  │           │     └─── Social Links
  │           └─── Bottom Bar
  │
  └─── Dashboard (After entering)
        │
        ├─── Header
        │     ├─── Title
        │     └─── Toggle Buttons
        │
        ├─── MetricsPanel
        │     ├─── Total Agents
        │     ├─── Active Agents
        │     ├─── Total Tasks
        │     ├─── Running Tasks
        │     ├─── Completed Tasks
        │     └─── Failed Tasks
        │
        ├─── SuggestedPrompts (Conditional)
        │     ├─── Search Bar
        │     ├─── Category Tabs
        │     └─── Prompt Cards (17)
        │           ├─── Data Analysis (3)
        │           ├─── Development (4)
        │           ├─── Content (3)
        │           ├─── Automation (2)
        │           └─── Quality (5)
        │
        ├─── Main Content Grid
        │     ├─── Left Column
        │     │     ├─── AgentList
        │     │     │     ├─── Create Button
        │     │     │     ├─── CreateAgentForm (Modal)
        │     │     │     └─── Agent Items
        │     │     │           ├─── Name
        │     │     │           ├─── Type
        │     │     │           ├─── Status Badge
        │     │     │           ├─── Capabilities
        │     │     │           └─── Action Buttons
        │     │     │
        │     │     └─── Right Column
        │     │           ├─── TaskList
        │     │           │     ├─── Create Button
        │     │           │     ├─── CreateTaskForm (Modal)
        │     │           │     └─── Task Items
        │     │           │           ├─── Name
        │     │           │           ├─── Priority Badge
        │     │           │           ├─── Status Badge
        │     │           │           ├─── Assigned Agent
        │     │           │           └─── Action Buttons
        │     │           │
        │     └─── ChatButton (Floating)
        │
        └─── ChatBox (Conditional)
              ├─── Header
              │     ├─── Title
              │     ├─── Agent Name
              │     └─── Close Button
              │
              ├─── Agent Selector
              │     └─── Dropdown
              │
              ├─── Messages Container
              │     ├─── System Messages
              │     ├─── User Messages
              │     ├─── Agent Messages
              │     └─── Typing Indicator
              │
              └─── Input Area
                    ├─── Text Input
                    ├─── Send Button
                    └─── Helper Text
```

---

## 🔄 6. State Management Flow

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND STATE                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Dashboard Component                                    │
│  ┌──────────────────────────────────────────────────┐ │
│  │  useState Hooks:                                  │ │
│  │                                                    │ │
│  │  • agents: Agent[]                               │ │
│  │  • tasks: Task[]                                 │ │
│  │  • metrics: SystemMetrics                        │ │
│  │  • showAgentForm: boolean                        │ │
│  │  • showTaskForm: boolean                         │ │
│  │  • showSuggestedPrompts: boolean                 │ │
│  │  • showChat: boolean                             │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
│  ChatBox Component                                      │
│  ┌──────────────────────────────────────────────────┐ │
│  │  useState Hooks:                                  │ │
│  │                                                    │ │
│  │  • messages: Message[]                           │ │
│  │  • inputValue: string                            │ │
│  │  • selectedAgent: Agent | null                   │ │
│  │  • isTyping: boolean                             │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
│  Custom Hooks                                           │
│  ┌──────────────────────────────────────────────────┐ │
│  │  useWebSocket()                                   │ │
│  │                                                    │ │
│  │  • Connects to ws://localhost:3001               │ │
│  │  • Listens for events                            │ │
│  │  • Returns lastMessage                           │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         │ Events trigger
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  STATE UPDATE CYCLE                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. User Action                                         │
│     • Click button                                      │
│     • Submit form                                       │
│     • Type message                                      │
│                                                         │
│  2. API Call (if needed)                               │
│     • POST /api/agents                                 │
│     • POST /api/tasks                                  │
│     • POST /api/chat                                   │
│                                                         │
│  3. Backend Processing                                  │
│     • Validate                                          │
│     • Update core state                                │
│     • Broadcast WebSocket event                        │
│                                                         │
│  4. Frontend Receives                                   │
│     • HTTP response                                     │
│     • WebSocket message                                │
│                                                         │
│  5. State Update                                        │
│     • setState() called                                │
│     • React re-renders                                 │
│     • UI updates                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 7. Deployment Flow

```
┌─────────────────────────────────────────────────────────┐
│                   DEVELOPMENT                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Local Environment                                      │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Terminal 1: npm run dev (Dashboard)             │ │
│  │  → Vite dev server on port 3002                  │ │
│  │                                                    │ │
│  │  Terminal 2: npm run dev (Server)                │ │
│  │  → Express server on port 3001                   │ │
│  │                                                    │ │
│  │  Terminal 3: bash scripts/create-sample-data.sh  │ │
│  │  → Populate sample agents & tasks                │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         │ npm run build
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   PRODUCTION BUILD                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Build Process                                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │  1. TypeScript Compilation (tsc)                 │ │
│  │     packages/types → dist/                       │ │
│  │     packages/core → dist/                        │ │
│  │     apps/server → dist/                          │ │
│  │                                                    │ │
│  │  2. Vite Build (dashboard)                       │ │
│  │     → apps/dashboard/dist/                       │ │
│  │     → Optimized JS bundle                        │ │
│  │     → Minified CSS                               │ │
│  │                                                    │ │
│  │  3. Environment Setup                            │ │
│  │     → Copy .env files                            │ │
│  │     → Configure API endpoints                    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         │ Deploy
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   PRODUCTION                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Server Deployment (Node.js)                           │
│  ┌──────────────────────────────────────────────────┐ │
│  │  • Cloud platform (AWS, Azure, Railway, etc.)    │ │
│  │  • PM2 or similar process manager               │ │
│  │  • Environment variables configured              │ │
│  │  • Port 3001 (or custom)                        │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
│  Frontend Deployment (Static)                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │  • CDN (Vercel, Netlify, Cloudflare Pages)      │ │
│  │  • Serve dist/ folder                            │ │
│  │  • Configure API proxy                           │ │
│  │  • HTTPS enabled                                 │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
│  Database (Future)                                      │
│  ┌──────────────────────────────────────────────────┐ │
│  │  • PostgreSQL or MongoDB                         │ │
│  │  • Connection pooling                            │ │
│  │  • Migrations                                    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 8. Security Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   SECURITY LAYERS                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Layer 1: API Key Protection                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  GLM API Key                                            │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Storage: .env file (backend only)                │ │
│  │  Access: GLM Service only                         │ │
│  │  Exposure: NEVER sent to frontend                 │ │
│  │  Git: Ignored (.gitignore)                        │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Backend Proxy                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Request Flow                                           │
│  ┌──────────────────────────────────────────────────┐ │
│  │  Frontend → Backend → GLM API                     │ │
│  │                                                    │ │
│  │  Benefits:                                         │ │
│  │  • API key never exposed                          │ │
│  │  • Rate limiting possible                         │ │
│  │  • Request validation                             │ │
│  │  • Error handling                                 │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 3: CORS Protection                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Configuration                                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │  app.use(cors())                                  │ │
│  │                                                    │ │
│  │  Production:                                       │ │
│  │  • Whitelist specific origins                     │ │
│  │  • Restrict methods                               │ │
│  │  • Credential handling                            │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 4: Input Validation                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Request Validation                                     │
│  ┌──────────────────────────────────────────────────┐ │
│  │  • Required fields check                          │ │
│  │  • Type validation                                │ │
│  │  • Sanitization                                   │ │
│  │  • Length limits                                  │ │
│  │  • Reject malformed requests                      │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 5: Error Handling                                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Error Response                                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │  • Never expose stack traces                      │ │
│  │  • Generic error messages                         │ │
│  │  • Log details server-side                        │ │
│  │  • Return safe info to client                     │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 9. Technology Stack Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  TECHNOLOGY STACK                       │
└─────────────────────────────────────────────────────────┘

┌──────────────────  FRONTEND  ──────────────────┐
│                                                 │
│  Framework:     React 18                       │
│  Language:      TypeScript 5                   │
│  Build Tool:    Vite 5                         │
│  Styling:       Inline CSS (CSS-in-JS)        │
│  HTTP Client:   Axios                          │
│  WebSocket:     Native WebSocket API          │
│                                                 │
└─────────────────────────────────────────────────┘

┌──────────────────  BACKEND  ────────────────────┐
│                                                  │
│  Runtime:       Node.js 20                      │
│  Framework:     Express.js                      │
│  Language:      TypeScript 5                    │
│  WebSocket:     ws (WebSocket library)         │
│  Environment:   dotenv                          │
│  HTTP Client:   node-fetch                     │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────  CORE PACKAGES  ─────────────────┐
│                                                  │
│  @agentspace/types                              │
│  • Type definitions                             │
│  • Shared interfaces                            │
│                                                  │
│  @agentspace/core                               │
│  • Business logic                               │
│  • Managers & Coordinators                     │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────  BUILD TOOLS  ────────────────────┐
│                                                  │
│  Monorepo:      Turborepo                       │
│  Package Mgr:   npm workspaces                  │
│  TypeScript:    tsc (compiler)                 │
│  Bundler:       Vite (frontend)                │
│  Bundler:       tsc (backend)                  │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────  EXTERNAL APIs  ─────────────────┐
│                                                  │
│  AI Service:    GLM-4.6 (Z.AI)                 │
│  • Model:       glm-4-plus                     │
│  • Endpoint:    api.z.ai                       │
│  • Features:    Chat completion, Context       │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────  DEVELOPMENT  ────────────────────┐
│                                                  │
│  Version Control: Git                           │
│  Code Editor:     VSCode / Cursor              │
│  Package Manager: npm                           │
│  Dev Server:      tsx (TypeScript execution)   │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────  FUTURE STACK  ───────────────────┐
│                                                  │
│  Database:      PostgreSQL / MongoDB           │
│  ORM:           Prisma / TypeORM               │
│  Auth:          JWT / OAuth                    │
│  Cache:         Redis                          │
│  Queue:         Bull / BullMQ                  │
│  Logging:       Winston / Pino                 │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🎯 10. Feature Map Diagram

```
                    AGENTSPACE
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    Frontend        Backend           AI
        │               │               │
        │               │               │
┌───────┴───────┐  ┌────┴────┐  ┌──────┴──────┐
│               │  │         │  │             │
│  Landing      │  │  API    │  │  GLM-4.6    │
│  • Futuristic │  │  Server │  │  Service    │
│  • Hero       │  │         │  │             │
│  • Chat Input │  └────┬────┘  └──────┬──────┘
│               │       │              │
└───────┬───────┘       │              │
        │               │              │
┌───────┴───────┐       │              │
│               │       │              │
│  Dashboard    │       │              │
│  ├─ Agents    │───────┼──────────────┘
│  ├─ Tasks     │       │
│  ├─ Metrics   │       │
│  ├─ Prompts   │       │
│  └─ Chat Box  │───────┘
│               │
└───────────────┘

┌────────────────────────────────────────────────┐
│         CORE FEATURES                          │
├────────────────────────────────────────────────┤
│                                                │
│  Agent Management                              │
│  ├─ Create agents with capabilities           │
│  ├─ Track agent status                        │
│  ├─ Manage agent lifecycle                    │
│  └─ View agent details                        │
│                                                │
│  Task Management                               │
│  ├─ Create tasks with priorities              │
│  ├─ Auto-assign to capable agents             │
│  ├─ Track task status                         │
│  ├─ Queue management                          │
│  └─ Task completion tracking                  │
│                                                │
│  Smart Prompts                                 │
│  ├─ 17 pre-built templates                   │
│  ├─ 5 categories                              │
│  ├─ Search & filter                           │
│  ├─ One-click task creation                   │
│  └─ Capability-based suggestions              │
│                                                │
│  Real-Time Chat                                │
│  ├─ Multi-agent conversations                 │
│  ├─ GLM-4.6 AI responses                      │
│  ├─ Conversation history                      │
│  ├─ Typing indicators                         │
│  └─ Message bubbles                           │
│                                                │
│  System Monitoring                             │
│  ├─ Live metrics display                      │
│  ├─ Agent statistics                          │
│  ├─ Task statistics                           │
│  └─ WebSocket updates                         │
│                                                │
│  Modern UI                                     │
│  ├─ Futuristic landing page                   │
│  ├─ Dark theme with gradients                 │
│  ├─ Glassmorphism effects                     │
│  ├─ Smooth animations                         │
│  └─ Responsive design                         │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 📈 Summary

**Complete diagram collection for AGENTSPACE!**

✅ System Architecture  
✅ Data Flow  
✅ File Structure  
✅ API Flow  
✅ Component Hierarchy  
✅ State Management  
✅ Deployment Flow  
✅ Security Layers  
✅ Technology Stack  
✅ Feature Map  

**Use these diagrams for:**
- Understanding system design
- Onboarding new developers
- Documentation
- Presentations
- Architecture reviews

---

**Created with ❤️ for AGENTSPACE**
