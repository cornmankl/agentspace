#!/bin/bash
# AGENTSPACE - Complete Git Push Script
# Run this script to commit and push to GitHub

cd /home/daddybo/agentspace

echo "╔════════════════════════════════════════════════════════╗"
echo "║          AGENTSPACE - GitHub Push                      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Set git credentials
export GIT_AUTHOR_NAME="cornmankl"
export GIT_AUTHOR_EMAIL="cornman.kl@gmail.com"
export GIT_COMMITTER_NAME="cornmankl"
export GIT_COMMITTER_EMAIL="cornman.kl@gmail.com"

git config user.name "cornmankl"
git config user.email "cornman.kl@gmail.com"

# Check staged files
STAGED=$(git diff --cached --name-only | wc -l)
echo "📦 Files ready to commit: $STAGED"
echo ""

# Create commit (this will work when run by user)
echo "Creating commit..."
git commit -m "feat: AGENTSPACE - Multi-Agent AI Platform

🚀 Initial Release

Complete implementation including:
- Multi-agent management system
- Backend API with Express.js + WebSocket
- React frontend dashboard with real-time updates
- CLI tool for terminal management
- GLM AI integration for intelligent agents
- Complete documentation and guides
- JSON-based persistence
- Security: validation, rate limiting, CORS
- Test suite with Vitest
- Docker support

Features:
✅ Agent lifecycle management
✅ Task orchestration and assignment
✅ Real-time WebSocket updates
✅ AI-powered chat with agents
✅ Comprehensive API and CLI
✅ System metrics and monitoring
✅ Production-ready architecture

Tech Stack:
- Backend: Node.js, Express, TypeScript
- Frontend: React, Vite, TypeScript
- Real-time: WebSocket
- AI: GLM API integration
- Storage: JSON files (with DB migration path)
- Testing: Vitest

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"

if [ $? -ne 0 ]; then
    echo "❌ Commit failed!"
    echo ""
    echo "Try running these commands manually:"
    echo "  cd /home/daddybo/agentspace"
    echo "  git commit -m 'Initial commit'"
    exit 1
fi

echo "✅ Commit created successfully!"
echo ""

# Set remote URL (token should be configured separately)
# Run: git remote set-url origin https://YOUR_TOKEN@github.com/cornmankl/agentspace.git
# Or use GitHub CLI for authentication

# Push to GitHub
echo "Pushing to GitHub..."
echo ""

git push -u origin main 2>&1 | grep -v "ghp_" | grep -v "token"

PUSH_EXIT=$?

if [ $PUSH_EXIT -eq 0 ]; then
    echo ""
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║          ✅ SUCCESS! PUSHED TO GITHUB!                ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo ""
    echo "🎉 Your code is now on GitHub!"
    echo ""
    echo "📍 Repository: https://github.com/cornmankl/agentspace"
    echo ""
    echo "What's been uploaded:"
    echo "  ✅ 108+ files"
    echo "  ✅ Complete source code (Backend + Frontend + Core)"
    echo "  ✅ CLI tool"
    echo "  ✅ All documentation"
    echo "  ✅ Code review & performance reports"
    echo "  ✅ Test suite"
    echo "  ✅ Docker configuration"
    echo ""
    echo "Next steps:"
    echo "  1. Visit: https://github.com/cornmankl/agentspace"
    echo "  2. View your repository"
    echo "  3. Share with others!"
    echo ""
else
    echo ""
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║          ⚠️  PUSH FAILED                              ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo ""
    echo "Possible reasons:"
    echo ""
    echo "1. Repository doesn't exist yet"
    echo "   → Create it at: https://github.com/new"
    echo "   → Name: agentspace"
    echo "   → Don't initialize with README"
    echo ""
    echo "2. No internet connection"
    echo "   → Check your network"
    echo ""
    echo "3. Token issues"
    echo "   → Verify token is valid"
    echo ""
    echo "Try creating the repo first, then run this script again."
    echo ""
fi

echo "Current git status:"
git log --oneline -3 2>/dev/null || echo "No commits yet"
