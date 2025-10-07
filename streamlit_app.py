"""
AGENTSPACE - Streamlit Dashboard
Simple Python-based dashboard for AGENTSPACE
"""

import streamlit as st
import requests
import json
from datetime import datetime

# Configuration
API_BASE = "http://localhost:3001/api"

st.set_page_config(
    page_title="AGENTSPACE",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        font-weight: bold;
        background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        padding: 1rem 0;
    }
    .metric-card {
        background: #f0f2f6;
        padding: 1rem;
        border-radius: 10px;
        border-left: 4px solid #667eea;
    }
    .agent-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin: 1rem 0;
    }
    .success-msg {
        color: #10b981;
        font-weight: bold;
    }
    .error-msg {
        color: #ef4444;
        font-weight: bold;
    }
</style>
""", unsafe_allow_html=True)

# Helper Functions
def get_agents():
    """Get all agents from API"""
    try:
        response = requests.get(f"{API_BASE}/agents", timeout=5)
        if response.status_code == 200:
            return response.json()
        return []
    except Exception as e:
        st.error(f"Error fetching agents: {e}")
        return []

def get_tasks():
    """Get all tasks from API"""
    try:
        response = requests.get(f"{API_BASE}/tasks", timeout=5)
        if response.status_code == 200:
            return response.json()
        return []
    except Exception as e:
        st.error(f"Error fetching tasks: {e}")
        return []

def get_metrics():
    """Get system metrics from API"""
    try:
        response = requests.get(f"{API_BASE}/metrics", timeout=5)
        if response.status_code == 200:
            return response.json()
        return {}
    except Exception as e:
        st.error(f"Error fetching metrics: {e}")
        return {}

def create_agent(name, agent_type, capabilities):
    """Create new agent"""
    try:
        response = requests.post(
            f"{API_BASE}/agents",
            json={
                "name": name,
                "type": agent_type,
                "capabilities": capabilities
            },
            timeout=5
        )
        return response.status_code == 200, response.json()
    except Exception as e:
        return False, str(e)

def create_task(name, description, priority, agent_id=None):
    """Create new task"""
    try:
        data = {
            "name": name,
            "description": description,
            "priority": priority
        }
        if agent_id:
            data["assignedAgentId"] = agent_id
        
        response = requests.post(
            f"{API_BASE}/tasks",
            json=data,
            timeout=5
        )
        return response.status_code == 200, response.json()
    except Exception as e:
        return False, str(e)

def chat_with_agent(agent_id, message, history=[]):
    """Chat with agent using GLM AI"""
    try:
        response = requests.post(
            f"{API_BASE}/chat",
            json={
                "agentId": agent_id,
                "message": message,
                "conversationHistory": history
            },
            timeout=30
        )
        if response.status_code == 200:
            return True, response.json()
        return False, response.json()
    except Exception as e:
        return False, str(e)

def delete_agent(agent_id):
    """Delete agent"""
    try:
        response = requests.delete(f"{API_BASE}/agents/{agent_id}", timeout=5)
        return response.status_code == 200
    except Exception as e:
        st.error(f"Error deleting agent: {e}")
        return False

def complete_task(task_id):
    """Complete task"""
    try:
        response = requests.post(f"{API_BASE}/tasks/{task_id}/complete", timeout=5)
        return response.status_code == 200
    except Exception as e:
        st.error(f"Error completing task: {e}")
        return False

# Main App
def main():
    # Header
    st.markdown('<h1 class="main-header">🤖 AGENTSPACE</h1>', unsafe_allow_html=True)
    st.markdown("### Multi-Agent AI Platform - Streamlit Dashboard")
    
    # Sidebar
    with st.sidebar:
        st.image("https://via.placeholder.com/200x60/667eea/ffffff?text=AGENTSPACE", use_column_width=True)
        
        page = st.radio(
            "Navigation",
            ["📊 Dashboard", "🤖 Agents", "📋 Tasks", "💬 Chat", "⚙️ Settings"],
            index=0
        )
        
        st.markdown("---")
        st.markdown("### Quick Stats")
        metrics = get_metrics()
        if metrics:
            st.metric("Total Agents", metrics.get("totalAgents", 0))
            st.metric("Active Agents", metrics.get("activeAgents", 0))
            st.metric("Total Tasks", metrics.get("totalTasks", 0))
        
        st.markdown("---")
        st.markdown("**Status:** 🟢 Online")
        st.markdown(f"**API:** `{API_BASE}`")
    
    # Main Content
    if page == "📊 Dashboard":
        show_dashboard()
    elif page == "🤖 Agents":
        show_agents()
    elif page == "📋 Tasks":
        show_tasks()
    elif page == "💬 Chat":
        show_chat()
    elif page == "⚙️ Settings":
        show_settings()

def show_dashboard():
    """Dashboard page"""
    st.header("📊 System Dashboard")
    
    # Metrics
    metrics = get_metrics()
    if metrics:
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric("Total Agents", metrics.get("totalAgents", 0), 
                     delta=metrics.get("activeAgents", 0), delta_color="normal")
        with col2:
            st.metric("Total Tasks", metrics.get("totalTasks", 0))
        with col3:
            st.metric("Running Tasks", metrics.get("runningTasks", 0), 
                     delta_color="off")
        with col4:
            st.metric("Completed", metrics.get("completedTasks", 0),
                     delta_color="normal")
    
    st.markdown("---")
    
    # Recent Activity
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("🤖 Recent Agents")
        agents = get_agents()
        if agents:
            for agent in agents[:5]:
                with st.expander(f"**{agent['name']}** ({agent['status']})"):
                    st.write(f"**Type:** {agent['type']}")
                    st.write(f"**Capabilities:** {', '.join(agent['capabilities'])}")
                    st.write(f"**Created:** {agent['createdAt'][:10]}")
        else:
            st.info("No agents yet. Create one in the Agents page!")
    
    with col2:
        st.subheader("📋 Recent Tasks")
        tasks = get_tasks()
        if tasks:
            for task in tasks[:5]:
                status_emoji = {
                    "pending": "⏳",
                    "running": "⚡",
                    "completed": "✅",
                    "failed": "❌"
                }.get(task['status'], "📝")
                
                with st.expander(f"{status_emoji} **{task['name']}**"):
                    st.write(f"**Priority:** {task['priority'].upper()}")
                    st.write(f"**Status:** {task['status']}")
                    if task.get('description'):
                        st.write(f"**Description:** {task['description']}")
        else:
            st.info("No tasks yet. Create one in the Tasks page!")

def show_agents():
    """Agents management page"""
    st.header("🤖 Agent Management")
    
    # Create Agent Form
    with st.expander("➕ Create New Agent", expanded=False):
        with st.form("create_agent_form"):
            name = st.text_input("Agent Name", placeholder="My Agent")
            agent_type = st.selectbox(
                "Agent Type",
                ["worker", "analyzer", "coordinator", "assistant"]
            )
            capabilities = st.text_input(
                "Capabilities (comma-separated)",
                placeholder="coding, testing, debugging"
            )
            
            submitted = st.form_submit_button("Create Agent")
            
            if submitted:
                if name and capabilities:
                    caps_list = [c.strip() for c in capabilities.split(",")]
                    success, result = create_agent(name, agent_type, caps_list)
                    
                    if success:
                        st.success(f"✅ Agent '{name}' created successfully!")
                        st.balloons()
                        st.rerun()
                    else:
                        st.error(f"❌ Failed to create agent: {result}")
                else:
                    st.warning("⚠️ Please fill in all fields!")
    
    # List Agents
    st.markdown("---")
    st.subheader("All Agents")
    
    agents = get_agents()
    if agents:
        for agent in agents:
            with st.container():
                col1, col2, col3 = st.columns([3, 1, 1])
                
                with col1:
                    status_color = {
                        "idle": "🟢",
                        "busy": "🟡",
                        "error": "🔴",
                        "offline": "⚫"
                    }.get(agent['status'], "⚪")
                    
                    st.markdown(f"### {status_color} {agent['name']}")
                    st.write(f"**Type:** {agent['type']} | **Status:** {agent['status']}")
                    st.write(f"**Capabilities:** {', '.join(agent['capabilities'])}")
                
                with col2:
                    st.write("")
                    st.write("")
                    if st.button("💬 Chat", key=f"chat_{agent['id']}"):
                        st.session_state.selected_agent = agent['id']
                        st.session_state.page = "💬 Chat"
                        st.rerun()
                
                with col3:
                    st.write("")
                    st.write("")
                    if st.button("🗑️ Delete", key=f"delete_{agent['id']}"):
                        if delete_agent(agent['id']):
                            st.success("Agent deleted!")
                            st.rerun()
                
                st.markdown("---")
    else:
        st.info("📭 No agents found. Create your first agent above!")

def show_tasks():
    """Tasks management page"""
    st.header("📋 Task Management")
    
    # Create Task Form
    with st.expander("➕ Create New Task", expanded=False):
        with st.form("create_task_form"):
            task_name = st.text_input("Task Name", placeholder="My Task")
            task_desc = st.text_area("Description", placeholder="Task description...")
            task_priority = st.selectbox("Priority", ["low", "medium", "high"])
            
            agents = get_agents()
            agent_options = ["None"] + [f"{a['name']} ({a['id'][:8]})" for a in agents]
            selected_agent = st.selectbox("Assign to Agent", agent_options)
            
            submitted = st.form_submit_button("Create Task")
            
            if submitted:
                if task_name:
                    agent_id = None
                    if selected_agent != "None":
                        agent_idx = agent_options.index(selected_agent) - 1
                        agent_id = agents[agent_idx]['id']
                    
                    success, result = create_task(task_name, task_desc, task_priority, agent_id)
                    
                    if success:
                        st.success(f"✅ Task '{task_name}' created!")
                        st.balloons()
                        st.rerun()
                    else:
                        st.error(f"❌ Failed to create task: {result}")
                else:
                    st.warning("⚠️ Please provide task name!")
    
    # List Tasks
    st.markdown("---")
    st.subheader("All Tasks")
    
    # Filter
    filter_status = st.multiselect(
        "Filter by Status",
        ["pending", "running", "completed", "failed"],
        default=["pending", "running"]
    )
    
    tasks = get_tasks()
    filtered_tasks = [t for t in tasks if t['status'] in filter_status]
    
    if filtered_tasks:
        for task in filtered_tasks:
            status_emoji = {
                "pending": "⏳",
                "running": "⚡",
                "completed": "✅",
                "failed": "❌"
            }.get(task['status'], "📝")
            
            priority_color = {
                "low": "🟦",
                "medium": "🟨",
                "high": "🟥"
            }.get(task['priority'], "⬜")
            
            with st.container():
                col1, col2 = st.columns([4, 1])
                
                with col1:
                    st.markdown(f"### {status_emoji} {task['name']} {priority_color}")
                    st.write(f"**Status:** {task['status']} | **Priority:** {task['priority']}")
                    if task.get('description'):
                        st.write(f"**Description:** {task['description']}")
                    if task.get('assignedAgentId'):
                        st.write(f"**Assigned to:** {task['assignedAgentId'][:8]}...")
                
                with col2:
                    st.write("")
                    if task['status'] not in ['completed', 'failed']:
                        if st.button("✅ Complete", key=f"complete_{task['id']}"):
                            if complete_task(task['id']):
                                st.success("Task completed!")
                                st.rerun()
                
                st.markdown("---")
    else:
        st.info("📭 No tasks found with selected filters!")

def show_chat():
    """Chat with agents page"""
    st.header("💬 Chat with AI Agent")
    
    agents = get_agents()
    if not agents:
        st.warning("⚠️ No agents available. Create an agent first!")
        return
    
    # Agent selection
    agent_options = [f"{a['name']} - {', '.join(a['capabilities'][:2])}" for a in agents]
    selected_idx = st.selectbox("Select Agent", range(len(agents)), 
                                format_func=lambda i: agent_options[i])
    
    selected_agent = agents[selected_idx]
    
    st.info(f"**Chatting with:** {selected_agent['name']} ({selected_agent['type']})")
    st.write(f"**Capabilities:** {', '.join(selected_agent['capabilities'])}")
    
    # Initialize chat history
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []
    
    # Display chat history
    st.markdown("---")
    chat_container = st.container()
    
    with chat_container:
        for msg in st.session_state.chat_history:
            if msg['role'] == 'user':
                st.markdown(f"**You:** {msg['content']}")
            else:
                st.markdown(f"**{selected_agent['name']}:** {msg['content']}")
            st.markdown("")
    
    # Chat input
    with st.form("chat_form", clear_on_submit=True):
        user_message = st.text_area("Your message:", placeholder="Type your message here...", height=100)
        col1, col2 = st.columns([1, 5])
        
        with col1:
            send_button = st.form_submit_button("Send 📤")
        with col2:
            if st.form_submit_button("Clear Chat 🗑️"):
                st.session_state.chat_history = []
                st.rerun()
        
        if send_button and user_message:
            # Add user message to history
            st.session_state.chat_history.append({
                "role": "user",
                "content": user_message
            })
            
            # Get AI response
            with st.spinner("Agent is thinking..."):
                success, response = chat_with_agent(
                    selected_agent['id'],
                    user_message,
                    st.session_state.chat_history
                )
            
            if success:
                # Add agent response to history
                st.session_state.chat_history.append({
                    "role": "assistant",
                    "content": response['response']
                })
                st.rerun()
            else:
                st.error(f"❌ Chat failed: {response}")

def show_settings():
    """Settings page"""
    st.header("⚙️ Settings")
    
    st.subheader("API Configuration")
    
    new_api = st.text_input("API Base URL", value=API_BASE)
    if st.button("Update API URL"):
        st.info("⚠️ API URL update requires app restart")
    
    st.markdown("---")
    
    st.subheader("System Information")
    st.write(f"**Dashboard Version:** 1.0.0")
    st.write(f"**API Endpoint:** {API_BASE}")
    st.write(f"**Framework:** Streamlit")
    
    st.markdown("---")
    
    st.subheader("Actions")
    col1, col2 = st.columns(2)
    
    with col1:
        if st.button("🔄 Refresh Data"):
            st.rerun()
    
    with col2:
        if st.button("🧪 Test Connection"):
            try:
                response = requests.get(f"{API_BASE.replace('/api', '')}/health", timeout=5)
                if response.status_code == 200:
                    st.success("✅ Connection successful!")
                else:
                    st.error("❌ Connection failed!")
            except Exception as e:
                st.error(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
