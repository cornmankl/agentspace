# 💻 AGENTSPACE CLI - Terminal Guide

## 🚀 Quick Start

AGENTSPACE CLI membolehkan awak manage agents dan tasks dari terminal!

### Setup (Satu kali sahaja)
```bash
cd /home/daddybo/agentspace

# Test CLI
./agentspace --help
```

### Optional: Add to PATH
```bash
# Add to ~/.bashrc or ~/.zshrc
echo 'export PATH="/home/daddybo/agentspace:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Lepas tu boleh guna dari mana-mana:
agentspace status
```

---

## 📖 COMMANDS REFERENCE

### 🔍 Status & Info

#### Check System Status
```bash
./agentspace status
# or shortcut:
./agentspace s
```
**Output:**
- Server status
- API endpoint
- Active agents count
- Running tasks count

#### View Metrics
```bash
./agentspace metrics
# or:
./agentspace m
```
**Shows:**
- Total agents
- Active agents
- Total/running/completed/failed tasks

---

### 🤖 Agent Management

#### List All Agents
```bash
./agentspace agents
# or:
./agentspace a
```

#### Create New Agent
```bash
./agentspace agent:create \
  --name "Data Analyzer" \
  --type analyzer \
  --capabilities "data-processing,analysis,reporting"

# Shortcut:
./agentspace ac -n "My Agent" -t worker -c "testing,validation"
```

**Options:**
- `-n, --name <name>` - Agent name (required)
- `-t, --type <type>` - Agent type: worker, analyzer, assistant (default: worker)
- `-c, --capabilities <caps>` - Comma-separated capabilities (default: general)

**Examples:**
```bash
# Create simple agent
./agentspace ac -n "Helper" -c "help,support"

# Create specialized agent
./agentspace ac -n "Code Reviewer" -t analyzer -c "code-review,testing,quality-assurance"

# Create assistant
./agentspace ac -n "Personal Assistant" -t assistant -c "planning,scheduling,reminders"
```

#### Delete Agent
```bash
./agentspace agent:delete <agent-id>
# or:
./agentspace ad cf9523f9-04bc-4ef4-b166-bf8f57b865cb
```

---

### 📝 Task Management

#### List All Tasks
```bash
./agentspace tasks
# or:
./agentspace t
```

#### Create New Task
```bash
./agentspace task:create \
  --name "Analyze Data" \
  --description "Process Q4 sales data and generate report" \
  --priority high \
  --agent <agent-id>

# Shortcut:
./agentspace tc -n "My Task" -d "Description" -p medium
```

**Options:**
- `-n, --name <name>` - Task name (required)
- `-d, --description <desc>` - Task description (optional)
- `-p, --priority <priority>` - Priority: low, medium, high (default: medium)
- `-a, --agent <id>` - Assign to agent ID (optional)

**Examples:**
```bash
# Simple task
./agentspace tc -n "Review Code" -p high

# Task with description
./agentspace tc -n "Write Tests" -d "Create unit tests for auth module" -p medium

# Task assigned to agent
./agentspace tc -n "Deploy App" -p high -a cf9523f9-04bc-4ef4-b166-bf8f57b865cb
```

#### Complete Task
```bash
./agentspace task:complete <task-id>
```

#### Delete Task
```bash
./agentspace task:delete <task-id>
# or:
./agentspace td <task-id>
```

---

### 💬 Chat with AI Agent

#### Interactive Chat Mode
```bash
./agentspace chat <agent-id-or-name>
# or:
./agentspace c "Personal AI Assistant"
```

**Usage:**
1. Type your message
2. Press Enter
3. Wait for AI response
4. Continue conversation
5. Press Ctrl+C to exit

**Example:**
```bash
$ ./agentspace chat "Personal AI Assistant"

✓ Connected to: Personal AI Assistant
ℹ Capabilities: general-help, task-management, information, problem-solving, planning
ℹ Type your messages (Ctrl+C to exit)

You: Help me organize my tasks
Agent is thinking...

Personal AI Assistant: I can help you organize your tasks effectively! Here's how...
[AI response continues...]

You: What should I prioritize?
...
```

#### Quick Question (Single Message)
```bash
./agentspace ask <agent-id-or-name> "Your question here"
```

**Examples:**
```bash
# Ask quick question
./agentspace ask "Personal AI Assistant" "What are your capabilities?"

# Get advice
./agentspace ask "Data Analyzer" "How should I approach data analysis?"

# Using agent ID
./agentspace ask cf9523f9 "Help me with testing strategy"
```

---

## 🎯 COMMON WORKFLOWS

### Workflow 1: Create & Manage Agent
```bash
# 1. Create agent
./agentspace ac -n "Research Agent" -t analyzer -c "research,analysis"

# 2. List agents to get ID
./agentspace agents

# 3. Create task for agent
./agentspace tc -n "Market Research" -p high -a <agent-id>

# 4. Check status
./agentspace status
```

### Workflow 2: Chat with AI Assistant
```bash
# 1. List agents to find AI assistant
./agentspace agents

# 2. Start chat
./agentspace chat "Personal AI Assistant"

# 3. Ask for help
You: Help me plan my day
# ... conversation continues ...
```

### Workflow 3: Task Management
```bash
# 1. Create multiple tasks
./agentspace tc -n "Task 1" -p high
./agentspace tc -n "Task 2" -p medium
./agentspace tc -n "Task 3" -p low

# 2. List all tasks
./agentspace tasks

# 3. Complete tasks
./agentspace task:complete <task-id>

# 4. View metrics
./agentspace metrics
```

### Workflow 4: Quick Questions
```bash
# Ask different agents
./agentspace ask "Personal AI Assistant" "Give me 3 productivity tips"
./agentspace ask "Data Analyzer" "Best practices for data validation"
./agentspace ask "Code Reviewer" "How to write clean code?"
```

---

## 💡 TIPS & TRICKS

### 1. Using Shortcuts
All commands have short aliases:
```bash
./agentspace agents      # = ./agentspace a
./agentspace tasks       # = ./agentspace t
./agentspace metrics     # = ./agentspace m
./agentspace status      # = ./agentspace s
./agentspace chat        # = ./agentspace c
./agentspace agent:create   # = ./agentspace ac
./agentspace task:create    # = ./agentspace tc
./agentspace agent:delete   # = ./agentspace ad
./agentspace task:delete    # = ./agentspace td
```

### 2. Pipe & Grep
```bash
# Find specific agent
./agentspace agents | grep "Personal"

# Count tasks
./agentspace tasks | grep -c "ID:"

# Filter by status
./agentspace tasks | grep "RUNNING"
```

### 3. Save Output
```bash
# Save agents list
./agentspace agents > my-agents.txt

# Save metrics
./agentspace metrics > metrics-report.txt

# Append to log
./agentspace status >> daily-log.txt
```

### 4. Automation Scripts
```bash
#!/bin/bash
# daily-report.sh

echo "=== Daily AGENTSPACE Report ==="
echo ""
echo "Status:"
./agentspace status
echo ""
echo "Metrics:"
./agentspace metrics
echo ""
echo "Active Tasks:"
./agentspace tasks | grep "RUNNING"
```

### 5. Quick Checks
```bash
# Check if server running
./agentspace status || echo "Server is down!"

# Count agents
AGENT_COUNT=$(./agentspace agents | grep -c "ID:")
echo "Total agents: $AGENT_COUNT"
```

---

## 🔧 ENVIRONMENT VARIABLES

### Configure API Endpoint
```bash
# Default: http://localhost:3001
export AGENTSPACE_API=http://localhost:3001

# Use different port
export AGENTSPACE_API=http://localhost:4000

# Remote server
export AGENTSPACE_API=http://192.168.1.100:3001
```

### Add to Shell Config
```bash
# Add to ~/.bashrc or ~/.zshrc
echo 'export AGENTSPACE_API=http://localhost:3001' >> ~/.bashrc
source ~/.bashrc
```

---

## 📚 EXAMPLES LIBRARY

### Example 1: Create Development Team
```bash
# Create team of specialized agents
./agentspace ac -n "Backend Dev" -t worker -c "api,database,backend"
./agentspace ac -n "Frontend Dev" -t worker -c "ui,react,frontend"
./agentspace ac -n "QA Tester" -t analyzer -c "testing,qa,automation"
./agentspace ac -n "DevOps" -t worker -c "deployment,ci-cd,monitoring"

# List team
./agentspace agents
```

### Example 2: Sprint Planning
```bash
# Create sprint tasks
./agentspace tc -n "Design Database Schema" -p high
./agentspace tc -n "Implement Auth API" -p high
./agentspace tc -n "Build User Dashboard" -p medium
./agentspace tc -n "Write Unit Tests" -p medium
./agentspace tc -n "Setup CI/CD Pipeline" -p low

# View all tasks
./agentspace tasks
```

### Example 3: Daily Standup
```bash
# Quick standup report
echo "=== Daily Standup ==="
./agentspace status
echo ""
echo "Today's Tasks:"
./agentspace tasks | grep "RUNNING"
echo ""
echo "Completed Yesterday:"
./agentspace tasks | grep "COMPLETED"
```

### Example 4: Get AI Advice
```bash
# Planning
./agentspace ask "Personal AI Assistant" "Help me prioritize my tasks for today"

# Problem solving
./agentspace ask "Personal AI Assistant" "I'm feeling overwhelmed, what should I do?"

# Tips
./agentspace ask "Personal AI Assistant" "Give me 5 time management tips"
```

---

## 🚨 TROUBLESHOOTING

### CLI Not Working?
```bash
# Check if executable
ls -l /home/daddybo/agentspace/agentspace
# Should show -rwxr-xr-x

# Make executable
chmod +x /home/daddybo/agentspace/agentspace
chmod +x /home/daddybo/agentspace/cli.js
```

### Server Not Running?
```bash
# Check status
./agentspace status

# If down, start server
cd /home/daddybo/agentspace/apps/server
node dist/index.js
```

### Cannot Find Agent/Task?
```bash
# List all agents
./agentspace agents

# List all tasks
./agentspace tasks

# Copy correct ID from output
```

### Chat Not Responding?
```bash
# Check GLM API key configured
cat /home/daddybo/agentspace/apps/server/.env | grep GLM_API_KEY

# Check server logs
tail -f /tmp/agentspace-server.log
```

---

## 🎓 LEARNING PATH

### Beginner
1. `./agentspace status` - Check system
2. `./agentspace agents` - See agents
3. `./agentspace ac -n "Test" -c "test"` - Create first agent
4. `./agentspace tasks` - See tasks

### Intermediate
1. `./agentspace tc -n "Task" -p high` - Create tasks
2. `./agentspace metrics` - Monitor system
3. `./agentspace ask <agent> "question"` - Quick questions
4. Use shortcuts (a, t, m, s, ac, tc)

### Advanced
1. `./agentspace chat <agent>` - Interactive conversations
2. Pipe output with grep/awk
3. Create automation scripts
4. Remote API configuration

---

## ⚡ QUICK REFERENCE CARD

```
COMMAND              SHORTCUT    DESCRIPTION
────────────────────────────────────────────────────────
status               s           System status
metrics              m           View metrics
agents               a           List agents
agent:create         ac          Create agent
agent:delete         ad          Delete agent
tasks                t           List tasks
task:create          tc          Create task
task:complete        -           Complete task
task:delete          td          Delete task
chat                 c           Interactive chat
ask                  -           Quick question
help                 -           Show help
```

---

## 🎉 SELAMAT GUNA CLI!

Awak sekarang boleh manage AGENTSPACE dari terminal! Cuba commands dan explore features. CLI ni powerful dan cepat untuk daily workflow.

**Need help?**
```bash
./agentspace --help
./agentspace <command> --help
```

**Happy coding! 🚀**
