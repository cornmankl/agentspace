#!/bin/bash

echo "🚀 Setting up AGENTSPACE..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🔨 Building packages..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build packages"
    exit 1
fi

echo ""
echo "✨ Setup completed successfully!"
echo ""
echo "To start the development servers, run:"
echo "  npm run dev"
echo ""
echo "To start with Docker:"
echo "  docker-compose up --build"
echo ""
echo "Dashboard will be available at: http://localhost:3000"
echo "API server will be available at: http://localhost:3001"
