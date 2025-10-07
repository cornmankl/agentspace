#!/bin/bash
# AGENTSPACE CLI Demo Script

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI="$SCRIPT_DIR/agentspace"

echo "╔════════════════════════════════════════════╗"
echo "║   AGENTSPACE CLI - LIVE DEMO               ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Function to pause
pause() {
    echo ""
    read -p "Press Enter to continue..."
    echo ""
}

# Demo 1: Status
echo "→ Demo 1: Check System Status"
echo "$ ./agentspace status"
pause
$CLI status
pause

# Demo 2: List Agents
echo "→ Demo 2: List All Agents"
echo "$ ./agentspace agents"
pause
$CLI agents
pause

# Demo 3: View Metrics
echo "→ Demo 3: View System Metrics"
echo "$ ./agentspace metrics"
pause
$CLI metrics
pause

# Demo 4: List Tasks
echo "→ Demo 4: List All Tasks"
echo "$ ./agentspace tasks"
pause
$CLI tasks
pause

# Demo 5: Create Agent
echo "→ Demo 5: Create New Agent"
echo "$ ./agentspace agent:create -n \"Demo Agent\" -t worker -c \"demo,testing\""
pause
$CLI agent:create -n "Demo Agent" -t worker -c "demo,testing"
pause

# Demo 6: Create Task
echo "→ Demo 6: Create New Task"
echo "$ ./agentspace task:create -n \"Demo Task\" -p high -d \"This is a demo task\""
pause
$CLI task:create -n "Demo Task" -p high -d "This is a demo task"
pause

# Demo 7: Quick Question
echo "→ Demo 7: Ask Quick Question"
echo "$ ./agentspace ask \"Personal AI Assistant\" \"What are your capabilities?\""
echo ""
echo "⚠️  Note: This will call GLM AI API and may take a few seconds..."
pause
$CLI ask "Personal AI Assistant" "What are your capabilities?"
pause

# Final Status
echo "→ Final: System Status After Demo"
echo "$ ./agentspace status"
pause
$CLI status

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║   DEMO COMPLETED!                          ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "Try interactive chat:"
echo "  ./agentspace chat \"Personal AI Assistant\""
echo ""
echo "View full guide:"
echo "  cat CLI_GUIDE.md"
echo ""
echo "All commands:"
echo "  ./agentspace --help"
echo ""
