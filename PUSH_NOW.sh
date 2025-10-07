#!/bin/bash
# AGENTSPACE - Push to GitHub Script
# This script will commit and push your code

cd /home/daddybo/agentspace

echo "╔════════════════════════════════════════════╗"
echo "║  AGENTSPACE - Pushing to GitHub            ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Check if files are staged
STAGED=$(git diff --cached --name-only | wc -l)
echo "→ Files staged: $STAGED"
echo ""

# Create commit
echo "→ Creating commit..."
git commit -m "feat: Initial commit - AGENTSPACE Multi-Agent Platform

- Multi-agent management system with AI integration
- Backend API with Express.js, WebSocket, and GLM AI
- React frontend dashboard with real-time updates
- CLI tool for terminal-based management
- Complete documentation and guides
- JSON-based persistence layer
- Security features: validation, rate limiting, CORS
- Test suite with Vitest
- Production-ready with Docker support

Features:
- Agent lifecycle management
- Task orchestration and assignment
- Real-time WebSocket updates
- AI-powered chat with agents
- Comprehensive API and CLI
- System metrics and monitoring

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"

if [ $? -eq 0 ]; then
    echo "✅ Commit created"
    echo ""
    
    # Push to GitHub
    echo "→ Pushing to GitHub..."
    echo ""
    
    git push -u origin main 2>&1 | grep -v "ghp_"
    
    PUSH_STATUS=$?
    
    if [ $PUSH_STATUS -eq 0 ]; then
        echo ""
        echo "╔════════════════════════════════════════════╗"
        echo "║  ✅ SUCCESS! Code pushed to GitHub         ║"
        echo "╚════════════════════════════════════════════╝"
        echo ""
        echo "🎉 Repository: https://github.com/cornmankl/agentspace"
        echo ""
        echo "What's uploaded:"
        echo "  ✅ 108 files"
        echo "  ✅ Complete source code"
        echo "  ✅ Documentation"
        echo "  ✅ CLI tool"
        echo "  ✅ Frontend & Backend"
        echo ""
    else
        echo ""
        echo "❌ Push failed"
        echo ""
        echo "Possible issues:"
        echo "  - Repository doesn't exist on GitHub"
        echo "  - No internet connection"
        echo "  - Token expired"
        echo ""
        echo "To create repo on GitHub:"
        echo "  1. Go to https://github.com/new"
        echo "  2. Name it: agentspace"
        echo "  3. Make it public or private"
        echo "  4. Don't initialize with README"
        echo "  5. Click 'Create repository'"
        echo "  6. Run this script again"
        echo ""
    fi
else
    echo "❌ Commit failed"
    echo ""
    echo "Try running manually:"
    echo "  cd /home/daddybo/agentspace"
    echo "  git commit -m 'Initial commit'"
    echo "  git push -u origin main"
fi
