#!/bin/bash
# Test script untuk AI Assistant

echo "🤖 Testing Personal AI Assistant..."
echo ""

# Get agent ID
AGENT_ID=$(curl -s http://localhost:3001/api/agents | jq -r '.[] | select(.name=="Personal AI Assistant") | .id')

if [ -z "$AGENT_ID" ]; then
  echo "❌ Personal AI Assistant not found!"
  exit 1
fi

echo "✅ Found AI Assistant: $AGENT_ID"
echo ""
echo "💬 Sending message to AI..."
echo ""

# Test questions
QUESTIONS=(
  "What are your capabilities?"
  "Help me plan my day effectively"
  "Give me 3 productivity tips"
)

for QUESTION in "${QUESTIONS[@]}"; do
  echo "❓ Question: $QUESTION"
  echo ""
  
  RESPONSE=$(curl -s -X POST http://localhost:3001/api/chat \
    -H "Content-Type: application/json" \
    -d "{
      \"agentId\": \"$AGENT_ID\",
      \"message\": \"$QUESTION\"
    }" | jq -r '.response')
  
  echo "🤖 AI Response:"
  echo "$RESPONSE"
  echo ""
  echo "────────────────────────────────────────"
  echo ""
done

echo "✅ All tests completed!"
echo ""
echo "💡 Try it yourself at: http://localhost:3003"
