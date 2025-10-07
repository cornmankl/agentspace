#!/usr/bin/env node

import fetch from 'node-fetch';
import readline from 'readline';
import { program } from 'commander';

const API_BASE = process.env.AGENTSPACE_API || 'http://localhost:3001';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) {
  log(`✓ ${message}`, 'green');
}

function error(message) {
  log(`✗ ${message}`, 'red');
}

function info(message) {
  log(`ℹ ${message}`, 'blue');
}

function header(message) {
  log(`\n${message}`, 'bright');
  log('═'.repeat(message.length), 'cyan');
}

// API Helper
async function apiCall(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (err) {
    error(`API Error: ${err.message}`);
    process.exit(1);
  }
}

// Commands

// List Agents
async function listAgents() {
  header('📋 AGENTS');
  const agents = await apiCall('/api/agents');

  if (agents.length === 0) {
    info('No agents found. Create one with: agentspace agent:create');
    return;
  }

  agents.forEach((agent, index) => {
    log(`\n${index + 1}. ${agent.name}`, 'bright');
    log(`   ID: ${agent.id}`, 'cyan');
    log(`   Type: ${agent.type}`, 'blue');
    log(`   Status: ${agent.status.toUpperCase()}`, agent.status === 'idle' ? 'green' : 'yellow');
    log(`   Capabilities: ${agent.capabilities.join(', ')}`, 'magenta');
  });
  console.log();
}

// Create Agent
async function createAgent(options) {
  header('🤖 CREATE AGENT');

  const capabilities = options.capabilities 
    ? options.capabilities.split(',').map(c => c.trim())
    : ['general'];

  const agent = await apiCall('/api/agents', 'POST', {
    name: options.name,
    type: options.type || 'worker',
    capabilities,
  });

  success(`Agent created: ${agent.name} (${agent.id})`);
  info(`Capabilities: ${agent.capabilities.join(', ')}`);
}

// Delete Agent
async function deleteAgent(agentId) {
  header('🗑️  DELETE AGENT');
  await apiCall(`/api/agents/${agentId}`, 'DELETE');
  success(`Agent ${agentId} deleted`);
}

// List Tasks
async function listTasks() {
  header('📝 TASKS');
  const tasks = await apiCall('/api/tasks');

  if (tasks.length === 0) {
    info('No tasks found. Create one with: agentspace task:create');
    return;
  }

  tasks.forEach((task, index) => {
    log(`\n${index + 1}. ${task.name}`, 'bright');
    log(`   ID: ${task.id}`, 'cyan');
    log(`   Status: ${task.status.toUpperCase()}`, 
        task.status === 'completed' ? 'green' : 
        task.status === 'running' ? 'yellow' : 'blue');
    log(`   Priority: ${task.priority.toUpperCase()}`, 'magenta');
    if (task.description) {
      log(`   Description: ${task.description}`, 'reset');
    }
    if (task.assignedAgentId) {
      log(`   Assigned to: ${task.assignedAgentId}`, 'cyan');
    }
  });
  console.log();
}

// Create Task
async function createTask(options) {
  header('📝 CREATE TASK');

  const taskData = {
    name: options.name,
    description: options.description || '',
    priority: options.priority || 'medium',
  };

  if (options.agent) {
    taskData.assignedAgentId = options.agent;
  }

  const task = await apiCall('/api/tasks', 'POST', taskData);
  success(`Task created: ${task.name} (${task.id})`);
  info(`Priority: ${task.priority}`);
  if (task.assignedAgentId) {
    info(`Assigned to: ${task.assignedAgentId}`);
  }
}

// Complete Task
async function completeTask(taskId) {
  header('✓ COMPLETE TASK');
  const task = await apiCall(`/api/tasks/${taskId}/complete`, 'POST');
  success(`Task completed: ${task.name}`);
}

// Delete Task
async function deleteTask(taskId) {
  header('🗑️  DELETE TASK');
  await apiCall(`/api/tasks/${taskId}`, 'DELETE');
  success(`Task ${taskId} deleted`);
}

// View Metrics
async function viewMetrics() {
  header('📊 SYSTEM METRICS');
  const metrics = await apiCall('/api/metrics');

  log(`\n  Total Agents:      ${metrics.totalAgents}`, 'blue');
  log(`  Active Agents:     ${metrics.activeAgents}`, 'green');
  log(`  Total Tasks:       ${metrics.totalTasks}`, 'blue');
  log(`  Running Tasks:     ${metrics.runningTasks}`, 'yellow');
  log(`  Completed Tasks:   ${metrics.completedTasks}`, 'green');
  log(`  Failed Tasks:      ${metrics.failedTasks}`, 'red');
  console.log();
}

// Interactive Chat
async function interactiveChat(agentId) {
  header('💬 CHAT WITH AGENT');

  // Get agent info
  const agents = await apiCall('/api/agents');
  const agent = agents.find(a => a.id === agentId || a.name === agentId);

  if (!agent) {
    error(`Agent not found: ${agentId}`);
    info('List agents with: agentspace agents');
    return;
  }

  success(`Connected to: ${agent.name}`);
  info(`Capabilities: ${agent.capabilities.join(', ')}`);
  info('Type your messages (Ctrl+C to exit)\n');

  const conversationHistory = [];
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = () => {
    rl.question(`${colors.green}You: ${colors.reset}`, async (message) => {
      if (!message.trim()) {
        askQuestion();
        return;
      }

      try {
        log('Agent is thinking...', 'yellow');

        const response = await apiCall('/api/chat', 'POST', {
          agentId: agent.id,
          message,
          conversationHistory,
        });

        conversationHistory.push({ role: 'user', content: message });
        conversationHistory.push({ role: 'assistant', content: response.response });

        log(`\n${agent.name}: ${colors.cyan}${response.response}${colors.reset}\n`);
        askQuestion();
      } catch (err) {
        error(`Chat error: ${err.message}`);
        askQuestion();
      }
    });
  };

  askQuestion();
}

// Quick Chat (one message)
async function quickChat(agentId, message) {
  const agents = await apiCall('/api/agents');
  const agent = agents.find(a => a.id === agentId || a.name === agentId);

  if (!agent) {
    error(`Agent not found: ${agentId}`);
    return;
  }

  info(`Asking ${agent.name}...`);
  
  const response = await apiCall('/api/chat', 'POST', {
    agentId: agent.id,
    message,
  });

  log(`\n${colors.cyan}${response.response}${colors.reset}\n`);
}

// CLI Program Setup
program
  .name('agentspace')
  .description('AGENTSPACE CLI - Manage AI agents from terminal')
  .version('1.0.0');

// Agent commands
program
  .command('agents')
  .alias('a')
  .description('List all agents')
  .action(listAgents);

program
  .command('agent:create')
  .alias('ac')
  .description('Create a new agent')
  .requiredOption('-n, --name <name>', 'Agent name')
  .option('-t, --type <type>', 'Agent type (worker, analyzer, assistant)', 'worker')
  .option('-c, --capabilities <caps>', 'Comma-separated capabilities', 'general')
  .action(createAgent);

program
  .command('agent:delete <agentId>')
  .alias('ad')
  .description('Delete an agent')
  .action(deleteAgent);

// Task commands
program
  .command('tasks')
  .alias('t')
  .description('List all tasks')
  .action(listTasks);

program
  .command('task:create')
  .alias('tc')
  .description('Create a new task')
  .requiredOption('-n, --name <name>', 'Task name')
  .option('-d, --description <desc>', 'Task description', '')
  .option('-p, --priority <priority>', 'Priority (low, medium, high)', 'medium')
  .option('-a, --agent <agentId>', 'Assign to agent ID')
  .action(createTask);

program
  .command('task:complete <taskId>')
  .description('Mark task as completed')
  .action(completeTask);

program
  .command('task:delete <taskId>')
  .alias('td')
  .description('Delete a task')
  .action(deleteTask);

// Metrics
program
  .command('metrics')
  .alias('m')
  .description('View system metrics')
  .action(viewMetrics);

// Chat commands
program
  .command('chat <agentId>')
  .alias('c')
  .description('Start interactive chat with agent')
  .action(interactiveChat);

program
  .command('ask <agentId> <message>')
  .description('Send single message to agent')
  .action(quickChat);

// Status command
program
  .command('status')
  .alias('s')
  .description('Show system status')
  .action(async () => {
    header('🚀 AGENTSPACE STATUS');
    try {
      const health = await apiCall('/health');
      success('Server is running');
      info(`API: ${API_BASE}`);
      info(`Time: ${health.timestamp}`);
      
      const metrics = await apiCall('/api/metrics');
      log(`\nAgents: ${metrics.activeAgents}/${metrics.totalAgents} active`, 'blue');
      log(`Tasks: ${metrics.runningTasks}/${metrics.totalTasks} running`, 'blue');
      console.log();
    } catch (err) {
      error('Server is not running');
      info(`Expected at: ${API_BASE}`);
    }
  });

// Parse arguments
program.parse();
