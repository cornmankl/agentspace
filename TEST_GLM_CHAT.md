# 🧪 Test GLM Chat Integration

## Quick Test Commands

### **1. Test Server Health**
```bash
curl http://localhost:3001/health
```

Expected:
```json
{
  "status": "ok",
  "timestamp": "2025-10-07T..."
}
```

### **2. Get Available Agents**
```bash
curl http://localhost:3001/api/agents | jq .
```

Expected: Array of 5 agents

### **3. Test Chat API Directly**
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "put-actual-agent-id-here",
    "message": "Hello! Can you help me?"
  }' | jq .
```

Expected response structure:
```json
{
  "success": true,
  "agentId": "...",
  "agentName": "Agent Name",
  "response": "AI generated response from GLM-4.6...",
  "timestamp": "..."
}
```

---

## 🌐 Browser Test

### **Step 1: Open Dashboard**
```
http://localhost:3002
```

### **Step 2: Launch Dashboard**
Click "Launch Dashboard" button

### **Step 3: Open Chat**
Click 💬 button (bottom-right)

### **Step 4: Select Agent**
Choose any agent from dropdown

### **Step 5: Send Test Message**
Type: "Hello! What can you help me with?"

### **Step 6: Verify Response**
- Should see typing indicator (• • •)
- Should get AI response in 1-3 seconds
- Response should be contextual and agent-specific

---

## ✅ Expected Results

### **System Status**
- ✅ Server running on port 3001
- ✅ Dashboard running on port 3002
- ✅ 5 agents available
- ✅ GLM API configured
- ✅ Chat endpoint active

### **Chat Features**
- ✅ Agent selection works
- ✅ Messages send successfully
- ✅ Typing indicator appears
- ✅ AI responses are contextual
- ✅ Conversation history maintained
- ✅ Error handling works

---

## 🔍 Debugging

### **Check Server Logs**
```bash
tail -f /tmp/agentspace-server-new.log
```

Look for:
```
🚀 AGENTSPACE Server running on http://localhost:3001
🔌 WebSocket server ready on ws://localhost:3001
🤖 GLM-4.6 API integrated: https://api.z.ai/api/coding/paas/v4
```

When chat message sent, should see:
```
💬 Chat request for agent: [Agent Name] ([type])
📝 User message: [Your message]
🤖 Calling GLM-4.6 API...
Endpoint: https://api.z.ai/api/coding/paas/v4/chat/completions
Messages: X
✅ GLM Response received: [Response preview]...
```

### **Check Browser Console**
Open DevTools (F12) → Console

Should see:
```
POST http://localhost:3001/api/chat
Status: 200 OK
```

No errors should appear.

---

## 🎯 Test Scenarios

### **Test 1: Simple Greeting**
```
Message: "Hello!"
Expected: Friendly greeting with agent capabilities
```

### **Test 2: Agent-Specific Query**
```
Agent: Data Analyst Pro
Message: "Help me analyze sales data"
Expected: Data analysis-focused response
```

### **Test 3: Code Request**
```
Agent: Code Generator X
Message: "Write a sorting function"
Expected: Code snippet with explanation
```

### **Test 4: Conversation Context**
```
Message 1: "What is React?"
Message 2: "Show me an example"
Expected: Second response builds on first
```

### **Test 5: Error Handling**
```
1. Disconnect internet
2. Send message
Expected: Error message shown, no crash
```

---

## 📊 Performance Check

### **Response Times**
- Typical: 1-3 seconds
- Fast queries: <1 second
- Complex queries: 3-5 seconds

### **Token Usage**
Monitor in server logs:
```
Usage: {
  prompt_tokens: ~100-500,
  completion_tokens: ~100-500,
  total_tokens: ~200-1000
}
```

---

## ✨ Success Indicators

✅ **Server starts without errors**  
✅ **GLM API URL shown in logs**  
✅ **Chat button visible in dashboard**  
✅ **Can select agents**  
✅ **Messages send successfully**  
✅ **Typing indicator appears**  
✅ **Receive AI responses**  
✅ **Responses are contextual**  
✅ **No console errors**  
✅ **Conversation flows naturally**  

---

## 🚀 Ready!

If all tests pass, GLM-4.6 integration is successful! 🎉

**Start chatting**: http://localhost:3002
