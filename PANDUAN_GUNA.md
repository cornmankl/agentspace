# 🚀 PANDUAN GUNA AGENTSPACE - STEP BY STEP

## 1️⃣ BUKA DASHBOARD

### Langkah 1: Buka Browser
- Buka Google Chrome / Firefox / Edge
- Pergi ke: **http://localhost:3003**

### Apa Yang Awak Akan Nampak:
- Dashboard dengan 4 bahagian utama:
  1. **Agents** (Senarai AI agents)
  2. **Tasks** (Senarai tugasan)
  3. **Metrics** (Statistik sistem)
  4. **Chat Button** (Butang chat di bawah kanan)

---

## 2️⃣ CARA CREATE AGENT (AI Assistant)

### Langkah-langkah:
1. **Tekan butang "Create Agent"** (butang hijau di bahagian Agents)

2. **Isi form Create Agent:**
   - **Name**: Nama agent awak (contoh: "Data Analyzer")
   - **Type**: Jenis agent (contoh: "worker", "analyzer", "coordinator")
   - **Capabilities**: Apa yang agent boleh buat (contoh: "data-processing, analysis")

3. **Tekan "Create"**

4. **Agent baru akan muncul** dalam senarai dengan:
   - Status: IDLE (ready untuk kerja)
   - Capabilities yang awak set
   - Timestamp bila created

### Contoh Agent:
```
Name: Data Analyzer
Type: analyzer
Capabilities: data-processing, analysis, reporting
```

---

## 3️⃣ CARA CREATE TASK (Tugasan)

### Langkah-langkah:
1. **Tekan butang "Create Task"** (butang biru di bahagian Tasks)

2. **Isi form Create Task:**
   - **Task Name**: Nama tugasan (contoh: "Analyze Sales Data")
   - **Description**: Huraian detail apa nak buat
   - **Priority**: LOW / MEDIUM / HIGH
   - **Assign to Agent**: Pilih agent dari dropdown (optional)

3. **Tekan "Create Task"**

4. **Task akan muncul** dalam senarai:
   - Status: PENDING (menunggu)
   - Kalau assign to agent, status jadi RUNNING
   - Agent yang assigned statusnya bertukar jadi BUSY

### Contoh Task:
```
Name: Analyze Sales Data Q4
Description: Process and analyze Q4 2024 sales data, generate insights
Priority: HIGH
Assign to: Data Analyzer
```

---

## 4️⃣ CARA CHAT DENGAN AGENT (Guna GLM AI)

### Langkah-langkah:
1. **Tekan Chat Button** 💬 (bulatan biru di bawah kanan)

2. **Chat box akan terbuka**

3. **Select Agent:**
   - Dropdown atas chat box
   - Pilih agent yang awak nak chat dengan

4. **Type message awak:**
   - Contoh: "Hello! Can you help me analyze data?"
   - Contoh: "What are your capabilities?"
   - Contoh: "How can you help me with my tasks?"

5. **Tekan Send** atau tekan Enter

6. **Agent akan reply** menggunakan GLM AI:
   - Response akan muncul dalam chat
   - Agent reply based on capabilities dia
   - Conversation history akan disimpan

### Contoh Conversation:
```
You: Hello! What can you help me with?
Agent: Hi! I'm Data Analyzer, a specialized analyzer agent. 
       I can help you with: data-processing, analysis, reporting.
       What would you like me to help you with today?

You: Can you analyze my sales data?
Agent: Yes, I can help you analyze sales data! I can process 
       the data, identify trends, and generate insights...
```

---

## 5️⃣ CARA GUNA SUGGESTED PROMPTS

### Langkah-langkah:
1. **Tekan butang "Suggested Prompts"** (di atas dashboard)

2. **Pilih category:**
   - 📊 Data Processing
   - 🔍 Analysis & Research
   - ✍️ Content Creation
   - 🔧 Technical Tasks
   - 📝 Documentation
   - 🧪 Testing & QA

3. **Click pada prompt template**

4. **Task akan auto-created** dengan:
   - Name dari template
   - Description yang detail
   - Priority yang sesuai
   - Auto-assign ke agent yang suitable

### Contoh Templates:
```
📊 Data Processing:
- "Process Customer Data" 
- "Clean and Validate Dataset"

🔍 Analysis & Research:
- "Analyze Market Trends"
- "Research Competitors"

✍️ Content Creation:
- "Write Blog Post"
- "Create Marketing Copy"
```

---

## 6️⃣ MONITOR SISTEM

### Metrics Panel:
Dashboard akan show real-time stats:
- **Total Agents**: Berapa banyak agents
- **Active Agents**: Agents yang busy kerja
- **Total Tasks**: Semua tasks
- **Running Tasks**: Tasks yang sedang run
- **Completed Tasks**: Tasks yang dah siap
- **Failed Tasks**: Tasks yang failed

### Real-time Updates:
- Semua changes update automatic (WebSocket)
- No need refresh page
- Status berubah instant bila:
  - Agent created/deleted
  - Task created/completed
  - Agent status change (IDLE → BUSY)

---

## 7️⃣ MANAGE AGENTS & TASKS

### Delete Agent:
1. Cari agent dalam senarai
2. Click butang **Delete** (merah) sebelah agent
3. Agent akan removed dari sistem

### Complete Task:
1. Cari task dalam senarai
2. Click butang **Complete** (hijau)
3. Task status jadi COMPLETED
4. Agent assigned akan jadi IDLE balik

### Delete Task:
1. Click butang **Delete** (merah) sebelah task
2. Task removed dari sistem

---

## 8️⃣ TIPS & BEST PRACTICES

### Creating Agents:
✅ **Bagi nama yang descriptive** (contoh: "Data Processor", "Content Writer")
✅ **Set capabilities yang specific** (contoh: "data-cleaning, validation")
✅ **Create multiple agents** untuk different purposes

### Creating Tasks:
✅ **Write clear description** - agent perlu faham apa nak buat
✅ **Set priority yang betul** - HIGH untuk urgent tasks
✅ **Assign to right agent** - match dengan capabilities

### Using Chat:
✅ **Be specific** dalam questions
✅ **Ask about agent capabilities** kalau tak pasti
✅ **Use conversation history** - agent ingat previous messages

---

## 9️⃣ TROUBLESHOOTING

### Dashboard tak load?
```bash
# Check server running:
curl http://localhost:3001/health

# Restart dashboard:
cd /home/daddybo/agentspace/apps/dashboard
npm run dev
```

### Agent tak respond dalam chat?
- Check GLM API key configured dalam .env
- Check server logs: `/tmp/agentspace-server.log`
- Pastikan agent ada capabilities yang relevant

### Data hilang after restart?
- Data persisted dalam `/apps/server/data/`
- Check files: `agents.json` dan `tasks.json`

---

## 🎯 QUICK START WORKFLOW

### Workflow 1: Simple Task Management
1. Create 1-2 agents dengan different capabilities
2. Create tasks menggunakan Suggested Prompts
3. Monitor progress dalam Metrics panel
4. Complete tasks bila dah siap

### Workflow 2: AI Chat Assistant
1. Create specialized agent (contoh: "Research Assistant")
2. Open chat dan select agent
3. Ask questions atau minta help
4. Agent respond dengan GLM AI

### Workflow 3: Multi-Agent System
1. Create multiple agents (analyzer, writer, tester)
2. Create tasks dan assign ke different agents
3. Monitor semua agents dalam satu dashboard
4. Watch real-time updates

---

## 📞 NEED HELP?

### Check Logs:
```bash
# Server logs:
tail -f /tmp/agentspace-server.log

# Dashboard logs:
tail -f /tmp/agentspace-dashboard.log
```

### Check System Status:
```bash
# Backend API:
curl http://localhost:3001/api/metrics

# List agents:
curl http://localhost:3001/api/agents

# List tasks:
curl http://localhost:3001/api/tasks
```

---

## 🎉 SELAMAT MENCUBA!

Awak sekarang dah ready untuk guna AGENTSPACE! Start dengan create agent pertama, then try create task atau chat dengan agent. Sistem akan guide awak step by step.

**Have fun building with AI agents! 🚀**
