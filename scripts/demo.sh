#!/bin/bash

echo "🤖 Starting AGENTSPACE Demo..."
echo ""

if ! curl -s http://localhost:3001/health > /dev/null; then
    echo "❌ Server is not running!"
    echo "Please start the server first with: npm run dev"
    exit 1
fi

echo "✅ Server is running"
echo ""
echo "Running demo script..."
cd examples && npm install && npm run demo
