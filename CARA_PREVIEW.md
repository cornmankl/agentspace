# 🌐 Cara Preview AGENTSPACE

## ✅ Server Sudah Running!

AGENTSPACE sekarang sudah berjalan dan siap untuk di-preview!

---

## 🔗 URL Access

### **Dashboard (Frontend)**
```
http://localhost:3002
```

### **API Server (Backend)**
```
http://localhost:3001
```

---

## 🖥️ Cara Akses dari Windows

### **Metode 1: Browser Langsung (Paling Mudah)**

1. **Buka browser favorit Anda** (Chrome, Edge, Firefox)

2. **Ketik di address bar**:
   ```
   http://localhost:3002
   ```

3. **Dashboard AGENTSPACE akan muncul!** 🎉

---

### **Metode 2: Akses via WSL IP (Jika Method 1 Gagal)**

1. **Cari IP WSL2**:
   ```bash
   ip addr show eth0 | grep "inet " | awk '{print $2}' | cut -d/ -f1
   ```

2. **Gunakan IP tersebut di browser**:
   ```
   http://[IP_ADDRESS]:3002
   ```
   Contoh: `http://172.28.160.1:3002`

---

## 🎨 Yang Bisa Anda Lihat di Dashboard

### 1. **📊 System Metrics (Atas)**
- Total Agents: 5
- Active Agents: 5  
- Total Tasks: 10
- Running Tasks: 6
- Completed Tasks: 1
- Failed Tasks: 1

### 2. **👥 Agents Panel (Kiri)**
**5 Agents yang sudah dibuat**:
- ✅ Data Analyst Pro (analyst)
  - Capabilities: data-analysis, reporting, statistics
  
- ✅ Code Generator (developer)
  - Capabilities: coding, debugging, testing
  
- ✅ Content Writer (writer)
  - Capabilities: writing, editing, proofreading

Plus 2 agents lagi dari testing sebelumnya.

### 3. **📝 Tasks Panel (Kanan)**
**10 Tasks yang sudah dibuat**:
- 🔥 Build User Authentication Module (CRITICAL)
- 🔥 Debug Memory Leak Issue (CRITICAL)
- ⚡ Analyze Sales Data Q4 2024 (HIGH)
- 📊 Write Product Launch Blog Post (MEDIUM)
- 📋 Create Monthly Performance Report (LOW)

Plus 5 tasks lagi dari testing sebelumnya.

---

## 🎮 Fitur Yang Bisa Dicoba

### **1. Create New Agent**
1. Klik tombol **"+ New Agent"**
2. Isi form:
   - Name: "Image Processor"
   - Type: "processor"
   - Capabilities: "image-processing, compression, resize"
3. Klik **"Create Agent"**
4. Agent baru akan muncul di list! ✨

### **2. Create New Task**
1. Klik tombol **"+ New Task"**
2. Isi form:
   - Name: "Optimize Product Images"
   - Description: "Compress and resize all product images"
   - Priority: "High"
   - Assign to: Pilih agent atau biarkan kosong untuk auto-assign
3. Klik **"Create Task"**
4. Task baru akan muncul dan auto-assign ke agent yang sesuai! 🎯

### **3. Real-Time Updates**
- Buat agent/task di satu browser tab
- Buka tab baru dengan URL yang sama
- Lihat update real-time via WebSocket! ⚡

### **4. Complete Task**
- Cari task dengan status "Running"
- Klik tombol **"Complete"**
- Task akan berubah status menjadi "Completed" ✅

### **5. Delete Agent/Task**
- Klik tombol **"Delete"** pada agent atau task
- Confirm deletion
- Item akan dihapus dari list 🗑️

---

## 🔍 Test API dengan cURL

### **Get All Agents**
```bash
curl http://localhost:3001/api/agents | jq
```

### **Get All Tasks**
```bash
curl http://localhost:3001/api/tasks | jq
```

### **Get System Metrics**
```bash
curl http://localhost:3001/api/metrics | jq
```

### **Create New Agent**
```bash
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Video Editor",
    "type": "editor",
    "capabilities": ["video-editing", "trimming", "effects"]
  }' | jq
```

### **Create New Task**
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Edit Marketing Video",
    "description": "Add transitions and music to marketing video",
    "priority": "high",
    "input": {"video": "marketing_raw.mp4"}
  }' | jq
```

---

## 🎯 Features Yang Bisa Dilihat

### ✅ **Working Features**
- [x] **Agent Management** - Create, view, delete agents
- [x] **Task Management** - Create, view, complete, delete tasks
- [x] **Auto-Assignment** - Tasks otomatis di-assign ke agent yang tepat
- [x] **Real-Time Updates** - Dashboard update langsung via WebSocket
- [x] **System Metrics** - Live tracking of system status
- [x] **Priority System** - Tasks sorted by priority (Critical → High → Medium → Low)
- [x] **Status Badges** - Color-coded status indicators
- [x] **Responsive UI** - Clean, modern interface

### 🔄 **Real-Time Features**
- **WebSocket Connection** - Terkoneksi otomatis saat dashboard dibuka
- **Live Agent Updates** - Status agent update real-time
- **Live Task Updates** - Task creation, assignment, completion update langsung
- **Live Metrics** - Angka metrics update otomatis

---

## 🎨 UI Preview

### **Dashboard Layout**
```
┌─────────────────────────────────────────────────────────┐
│  🤖 AGENTSPACE                                          │
│  AI Agent Workspace Platform                            │
├─────────────────────────────────────────────────────────┤
│  [Metrics Panel]                                        │
│  Total: 5  Active: 5  Tasks: 10  Running: 6  ...      │
├──────────────────────┬──────────────────────────────────┤
│  👥 Agents           │  📝 Tasks                        │
│  [+ New Agent]       │  [+ New Task]                    │
│                      │                                  │
│  🤖 Data Analyst Pro │  🔥 Build User Auth (CRITICAL)   │
│     Status: idle     │     Status: running              │
│     [Delete]         │     [Complete] [Delete]          │
│                      │                                  │
│  🤖 Code Generator   │  🔥 Debug Memory Leak (CRITICAL) │
│     Status: busy     │     Status: running              │
│     [Delete]         │     [Complete] [Delete]          │
│                      │                                  │
│  ... (more)          │  ... (more)                      │
└──────────────────────┴──────────────────────────────────┘
```

---

## 📱 Status Indicators

### **Agent Status**
- 🟢 **Idle** - Ready for work (green)
- 🟡 **Busy** - Working on task (orange)
- 🔴 **Error** - Something went wrong (red)
- ⚫ **Offline** - Not available (gray)

### **Task Status**
- ⚪ **Pending** - Waiting for assignment (gray)
- 🟡 **Running** - Being processed (orange)
- 🟢 **Completed** - Finished successfully (green)
- 🔴 **Failed** - Error occurred (red)

### **Task Priority**
- 🔥 **Critical** - Urgent, highest priority
- ⚡ **High** - Important
- 📊 **Medium** - Normal
- 📋 **Low** - Can wait

---

## 🛠️ Troubleshooting

### **Dashboard tidak bisa diakses**
```bash
# Check if dashboard is running
lsof -i :3002

# If not running, restart it
cd /home/daddybo/agentspace/apps/dashboard
npm run dev
```

### **API tidak response**
```bash
# Check if server is running
curl http://localhost:3001/health

# If not running, restart it
cd /home/daddybo/agentspace/apps/server
node dist/index.js
```

### **Port sudah dipakai**
```bash
# Kill process using port 3002
lsof -ti:3002 | xargs kill -9

# Then restart dashboard
```

---

## 🎬 Demo Workflow

### **Skenario: Processing Data Analysis Task**

1. **Buat Agent Baru**:
   - Name: "Data Scientist AI"
   - Type: "analyst"
   - Capabilities: "data-analysis, machine-learning, visualization"

2. **Buat Task**:
   - Name: "Analyze Customer Behavior"
   - Priority: "High"
   - Biarkan kosong (auto-assign)

3. **Observe**:
   - Task otomatis di-assign ke "Data Scientist AI" karena match capability "data-analysis"
   - Status agent berubah dari idle → busy
   - Task status berubah dari pending → running

4. **Complete Task**:
   - Klik "Complete" button
   - Status task berubah → completed
   - Status agent kembali → idle
   - Metrics update otomatis

5. **See Real-Time**:
   - Semua perubahan muncul instant di dashboard
   - WebSocket mengirim event untuk setiap action
   - No need refresh page!

---

## 🎉 Selamat Mencoba!

Dashboard AGENTSPACE sudah siap dan berjalan dengan:
- ✅ 5 Agents ready
- ✅ 10 Tasks created
- ✅ Real-time updates working
- ✅ Auto-assignment active
- ✅ All features functional

**Akses sekarang**: http://localhost:3002

---

## 📞 Need Help?

Jika ada masalah:
1. Check server logs: `cat /tmp/agentspace-server.log`
2. Check dashboard logs: `cat /tmp/agentspace-dashboard.log`
3. Restart services jika perlu

**Enjoy exploring AGENTSPACE!** 🚀
