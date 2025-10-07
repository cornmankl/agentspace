#!/bin/bash

API_BASE="http://localhost:3001/api"

echo "🚀 Creating Sample Data for AGENTSPACE..."
echo ""

# Create Agents
echo "👥 Creating Agents..."
curl -s -X POST $API_BASE/agents -H "Content-Type: application/json" -d '{
  "name": "Data Analyst Pro",
  "type": "analyst",
  "capabilities": ["data-analysis", "reporting", "statistics"]
}' | jq -r '.id' > /tmp/agent1_id

curl -s -X POST $API_BASE/agents -H "Content-Type: application/json" -d '{
  "name": "Code Generator",
  "type": "developer",
  "capabilities": ["coding", "debugging", "testing"]
}' | jq -r '.id' > /tmp/agent2_id

curl -s -X POST $API_BASE/agents -H "Content-Type: application/json" -d '{
  "name": "Content Writer",
  "type": "writer",
  "capabilities": ["writing", "editing", "proofreading"]
}' | jq -r '.id' > /tmp/agent3_id

echo "✅ Created 3 agents"
echo ""

# Create Tasks
echo "📝 Creating Tasks..."
curl -s -X POST $API_BASE/tasks -H "Content-Type: application/json" -d '{
  "name": "Analyze Sales Data Q4 2024",
  "description": "Perform comprehensive analysis of Q4 sales data and generate insights",
  "priority": "high",
  "input": {"quarter": "Q4", "year": 2024, "dataset": "sales.csv"}
}' > /dev/null

curl -s -X POST $API_BASE/tasks -H "Content-Type: application/json" -d '{
  "name": "Build User Authentication Module",
  "description": "Implement secure user authentication with JWT tokens",
  "priority": "critical",
  "input": {"framework": "Express", "database": "PostgreSQL"}
}' > /dev/null

curl -s -X POST $API_BASE/tasks -H "Content-Type: application/json" -d '{
  "name": "Write Product Launch Blog Post",
  "description": "Create engaging blog post announcing new product features",
  "priority": "medium",
  "input": {"product": "AgentSpace v2.0", "target_words": 1500}
}' > /dev/null

curl -s -X POST $API_BASE/tasks -H "Content-Type: application/json" -d '{
  "name": "Debug Memory Leak Issue",
  "description": "Investigate and fix memory leak in production server",
  "priority": "critical",
  "input": {"server": "production-01", "logs": "/var/log/app.log"}
}' > /dev/null

curl -s -X POST $API_BASE/tasks -H "Content-Type: application/json" -d '{
  "name": "Create Monthly Performance Report",
  "description": "Generate comprehensive performance metrics report",
  "priority": "low",
  "input": {"month": "October", "metrics": ["cpu", "memory", "response_time"]}
}' > /dev/null

echo "✅ Created 5 tasks"
echo ""

# Get metrics
echo "📊 System Metrics:"
curl -s $API_BASE/metrics | jq .

echo ""
echo "✅ Sample data created successfully!"
echo ""
echo "🌐 Access the dashboard at: http://localhost:3002"
