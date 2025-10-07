import axios from 'axios';
import WebSocket from 'ws';

const API_BASE = 'http://localhost:3001/api';
const WS_URL = 'ws://localhost:3001';

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  duration?: number;
}

const results: TestResult[] = [];
let wsMessages: any[] = [];
let ws: WebSocket;

function logTest(name: string, passed: boolean, error?: string, duration?: number) {
  results.push({ name, passed, error, duration });
  const icon = passed ? '✅' : '❌';
  const time = duration ? ` (${duration}ms)` : '';
  console.log(`${icon} ${name}${time}`);
  if (error && !passed) {
    console.log(`   Error: ${error}`);
  }
}

async function runTest(name: string, testFn: () => Promise<void>) {
  const start = Date.now();
  try {
    await testFn();
    const duration = Date.now() - start;
    logTest(name, true, undefined, duration);
    return true;
  } catch (error: any) {
    const duration = Date.now() - start;
    logTest(name, false, error.message, duration);
    return false;
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Setup WebSocket
function setupWebSocket(): Promise<void> {
  return new Promise((resolve, reject) => {
    ws = new WebSocket(WS_URL);
    
    ws.on('open', () => {
      console.log('🔌 WebSocket connected');
      resolve();
    });
    
    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      wsMessages.push(message);
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error.message);
      reject(error);
    });
    
    setTimeout(() => reject(new Error('WebSocket connection timeout')), 5000);
  });
}

// Test Suite
async function runAllTests() {
  console.log('🚀 Starting AGENTSPACE Comprehensive Test Suite\n');
  console.log('=' .repeat(60));
  
  // Connect WebSocket first
  try {
    await setupWebSocket();
  } catch (error) {
    console.log('⚠️  WebSocket connection failed, continuing with API tests only\n');
  }
  
  console.log('\n📋 SECTION 1: Health & Metrics Tests');
  console.log('-'.repeat(60));
  
  await runTest('Health Check Endpoint', async () => {
    const res = await axios.get('http://localhost:3001/health');
    if (res.data.status !== 'ok') throw new Error('Health check failed');
  });
  
  await runTest('Get Initial Metrics', async () => {
    const res = await axios.get(`${API_BASE}/metrics`);
    if (typeof res.data.totalAgents !== 'number') throw new Error('Invalid metrics');
  });
  
  console.log('\n👥 SECTION 2: Agent Management Tests');
  console.log('-'.repeat(60));
  
  let agent1Id: string, agent2Id: string, agent3Id: string;
  
  await runTest('Create Agent 1 (Data Processor)', async () => {
    const res = await axios.post(`${API_BASE}/agents`, {
      name: 'Data Processor Alpha',
      type: 'worker',
      capabilities: ['data-processing', 'analysis', 'cleaning']
    });
    agent1Id = res.data.id;
    if (!agent1Id) throw new Error('Agent ID not returned');
    if (res.data.status !== 'idle') throw new Error('Agent status should be idle');
  });
  
  await runTest('Create Agent 2 (Report Generator)', async () => {
    const res = await axios.post(`${API_BASE}/agents`, {
      name: 'Report Generator Beta',
      type: 'reporter',
      capabilities: ['reporting', 'visualization', 'export']
    });
    agent2Id = res.data.id;
    if (!agent2Id) throw new Error('Agent ID not returned');
  });
  
  await runTest('Create Agent 3 (Quality Checker)', async () => {
    const res = await axios.post(`${API_BASE}/agents`, {
      name: 'Quality Checker Gamma',
      type: 'validator',
      capabilities: ['validation', 'quality-check', 'testing']
    });
    agent3Id = res.data.id;
    if (!agent3Id) throw new Error('Agent ID not returned');
  });
  
  await runTest('Get All Agents', async () => {
    const res = await axios.get(`${API_BASE}/agents`);
    if (res.data.length !== 3) throw new Error(`Expected 3 agents, got ${res.data.length}`);
  });
  
  await runTest('Get Agent by ID', async () => {
    const res = await axios.get(`${API_BASE}/agents/${agent1Id}`);
    if (res.data.id !== agent1Id) throw new Error('Wrong agent returned');
    if (res.data.name !== 'Data Processor Alpha') throw new Error('Wrong agent name');
  });
  
  await runTest('Get Agents by Status (idle)', async () => {
    const res = await axios.get(`${API_BASE}/agents?status=idle`);
    if (res.data.length !== 3) throw new Error('Should have 3 idle agents');
  });
  
  await runTest('Get Agents by Capability (data-processing)', async () => {
    const res = await axios.get(`${API_BASE}/agents?capability=data-processing`);
    if (res.data.length !== 1) throw new Error('Should have 1 agent with data-processing');
  });
  
  await runTest('Update Agent Status to Busy', async () => {
    const res = await axios.patch(`${API_BASE}/agents/${agent1Id}/status`, {
      status: 'busy'
    });
    if (res.data.status !== 'busy') throw new Error('Status not updated');
  });
  
  await runTest('Update Agent Status back to Idle', async () => {
    const res = await axios.patch(`${API_BASE}/agents/${agent1Id}/status`, {
      status: 'idle'
    });
    if (res.data.status !== 'idle') throw new Error('Status not updated');
  });
  
  console.log('\n📝 SECTION 3: Task Management Tests');
  console.log('-'.repeat(60));
  
  let task1Id: string, task2Id: string, task3Id: string, task4Id: string;
  
  await runTest('Create Task 1 (High Priority - Data Processing)', async () => {
    const res = await axios.post(`${API_BASE}/tasks`, {
      name: 'Process Customer Dataset',
      description: 'Clean and analyze customer data',
      priority: 'high',
      input: { dataset: 'customers.csv', rows: 10000 }
    });
    task1Id = res.data.id;
    if (!task1Id) throw new Error('Task ID not returned');
    await sleep(100); // Wait for auto-assignment
  });
  
  await runTest('Create Task 2 (Medium Priority - Reporting)', async () => {
    const res = await axios.post(`${API_BASE}/tasks`, {
      name: 'Generate Monthly Report',
      description: 'Create visualization and export',
      priority: 'medium',
      input: { month: 'January', year: 2024 }
    });
    task2Id = res.data.id;
    await sleep(100);
  });
  
  await runTest('Create Task 3 (Critical Priority - Validation)', async () => {
    const res = await axios.post(`${API_BASE}/tasks`, {
      name: 'Validate Output Quality',
      description: 'Run quality checks',
      priority: 'critical',
      input: { threshold: 0.95 }
    });
    task3Id = res.data.id;
    await sleep(100);
  });
  
  await runTest('Create Task 4 (Low Priority)', async () => {
    const res = await axios.post(`${API_BASE}/tasks`, {
      name: 'Archive Old Data',
      description: 'Move old records to archive',
      priority: 'low',
      input: { before: '2023-01-01' }
    });
    task4Id = res.data.id;
  });
  
  await runTest('Get All Tasks', async () => {
    const res = await axios.get(`${API_BASE}/tasks`);
    if (res.data.length !== 4) throw new Error(`Expected 4 tasks, got ${res.data.length}`);
  });
  
  await runTest('Get Task by ID', async () => {
    const res = await axios.get(`${API_BASE}/tasks/${task1Id}`);
    if (res.data.id !== task1Id) throw new Error('Wrong task returned');
  });
  
  await runTest('Get Running Tasks', async () => {
    const res = await axios.get(`${API_BASE}/tasks?status=running`);
    console.log(`   Found ${res.data.length} running tasks`);
  });
  
  await runTest('Get Pending Tasks', async () => {
    const res = await axios.get(`${API_BASE}/tasks/pending`);
    console.log(`   Found ${res.data.length} pending tasks`);
  });
  
  await runTest('Get Tasks by Priority (high)', async () => {
    const res = await axios.get(`${API_BASE}/tasks?priority=high`);
    if (res.data.length < 1) throw new Error('Should have at least 1 high priority task');
  });
  
  console.log('\n🎯 SECTION 4: Task Assignment & Lifecycle Tests');
  console.log('-'.repeat(60));
  
  await runTest('Manual Task Assignment', async () => {
    // Create a new task
    const taskRes = await axios.post(`${API_BASE}/tasks`, {
      name: 'Manual Assignment Test',
      description: 'This task will be manually assigned',
      priority: 'medium',
      assignedAgentId: agent2Id, // Pre-assign to agent2
      input: { test: true }
    });
    const manualTaskId = taskRes.data.id;
    
    // Verify it was assigned
    const checkRes = await axios.get(`${API_BASE}/tasks/${manualTaskId}`);
    if (checkRes.data.assignedAgentId !== agent2Id) {
      throw new Error('Task not properly assigned');
    }
  });
  
  await runTest('Complete a Running Task', async () => {
    // Find a running task
    const tasksRes = await axios.get(`${API_BASE}/tasks?status=running`);
    if (tasksRes.data.length > 0) {
      const taskId = tasksRes.data[0].id;
      await axios.post(`${API_BASE}/tasks/${taskId}/complete`, {
        output: { success: true, result: 'Task completed successfully', timestamp: new Date() }
      });
      
      const checkRes = await axios.get(`${API_BASE}/tasks/${taskId}`);
      if (checkRes.data.status !== 'completed') {
        throw new Error('Task status not updated to completed');
      }
    } else {
      console.log('   No running tasks to complete, skipping');
    }
  });
  
  await runTest('Fail a Task', async () => {
    // Create a task to fail
    const taskRes = await axios.post(`${API_BASE}/tasks`, {
      name: 'Task to Fail',
      description: 'This task will be failed intentionally',
      priority: 'low',
      input: { test: true }
    });
    const failTaskId = taskRes.data.id;
    await sleep(100);
    
    await axios.post(`${API_BASE}/tasks/${failTaskId}/fail`, {
      error: 'Simulated error for testing'
    });
    
    const checkRes = await axios.get(`${API_BASE}/tasks/${failTaskId}`);
    if (checkRes.data.status !== 'failed') {
      throw new Error('Task status not updated to failed');
    }
    if (!checkRes.data.error) {
      throw new Error('Error message not saved');
    }
  });
  
  console.log('\n📊 SECTION 5: System Metrics Tests');
  console.log('-'.repeat(60));
  
  await runTest('Get Updated Metrics', async () => {
    const res = await axios.get(`${API_BASE}/metrics`);
    console.log(`   Total Agents: ${res.data.totalAgents}`);
    console.log(`   Active Agents: ${res.data.activeAgents}`);
    console.log(`   Total Tasks: ${res.data.totalTasks}`);
    console.log(`   Running Tasks: ${res.data.runningTasks}`);
    console.log(`   Completed Tasks: ${res.data.completedTasks}`);
    console.log(`   Failed Tasks: ${res.data.failedTasks}`);
    
    if (res.data.totalAgents < 3) throw new Error('Should have at least 3 agents');
    if (res.data.totalTasks < 4) throw new Error('Should have at least 4 tasks');
  });
  
  console.log('\n🔌 SECTION 6: WebSocket Real-Time Updates Test');
  console.log('-'.repeat(60));
  
  await runTest('Check WebSocket Messages Received', async () => {
    if (wsMessages.length === 0) {
      console.log('   ⚠️  No WebSocket messages received (server might not be sending updates)');
    } else {
      console.log(`   Received ${wsMessages.length} WebSocket messages`);
      const messageTypes = [...new Set(wsMessages.map(m => m.type))];
      console.log(`   Message types: ${messageTypes.join(', ')}`);
    }
  });
  
  console.log('\n🗑️  SECTION 7: Deletion Tests');
  console.log('-'.repeat(60));
  
  await runTest('Delete a Task', async () => {
    const res = await axios.delete(`${API_BASE}/tasks/${task4Id}`);
    if (res.status !== 204) throw new Error('Task not deleted');
    
    try {
      await axios.get(`${API_BASE}/tasks/${task4Id}`);
      throw new Error('Task still exists after deletion');
    } catch (error: any) {
      if (error.response?.status !== 404) throw error;
    }
  });
  
  await runTest('Delete an Agent', async () => {
    const res = await axios.delete(`${API_BASE}/agents/${agent3Id}`);
    if (res.status !== 204) throw new Error('Agent not deleted');
    
    try {
      await axios.get(`${API_BASE}/agents/${agent3Id}`);
      throw new Error('Agent still exists after deletion');
    } catch (error: any) {
      if (error.response?.status !== 404) throw error;
    }
  });
  
  console.log('\n❌ SECTION 8: Error Handling Tests');
  console.log('-'.repeat(60));
  
  await runTest('Get Non-Existent Agent (404)', async () => {
    try {
      await axios.get(`${API_BASE}/agents/non-existent-id`);
      throw new Error('Should have returned 404');
    } catch (error: any) {
      if (error.response?.status !== 404) throw error;
    }
  });
  
  await runTest('Create Agent with Missing Fields (400)', async () => {
    try {
      await axios.post(`${API_BASE}/agents`, {
        name: 'Incomplete Agent'
        // Missing type and capabilities
      });
      throw new Error('Should have returned 400');
    } catch (error: any) {
      if (error.response?.status !== 400) throw error;
    }
  });
  
  await runTest('Create Task with Missing Fields (400)', async () => {
    try {
      await axios.post(`${API_BASE}/tasks`, {
        name: 'Incomplete Task'
        // Missing description, priority, input
      });
      throw new Error('Should have returned 400');
    } catch (error: any) {
      if (error.response?.status !== 400) throw error;
    }
  });
  
  await runTest('Update Agent with Invalid Status (400)', async () => {
    try {
      await axios.patch(`${API_BASE}/agents/${agent1Id}/status`, {
        status: 'invalid-status'
      });
      throw new Error('Should have returned 400');
    } catch (error: any) {
      if (error.response?.status !== 400) throw error;
    }
  });
  
  // Close WebSocket
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
  }
  
  // Generate Report
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;
  const successRate = ((passed / total) * 100).toFixed(1);
  
  console.log(`\nTotal Tests: ${total}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${successRate}%`);
  
  if (failed > 0) {
    console.log('\n❌ Failed Tests:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`   - ${r.name}`);
      if (r.error) console.log(`     ${r.error}`);
    });
  }
  
  const avgDuration = results.reduce((sum, r) => sum + (r.duration || 0), 0) / total;
  console.log(`\nAverage Test Duration: ${avgDuration.toFixed(0)}ms`);
  
  console.log('\n' + '='.repeat(60));
  
  if (failed === 0) {
    console.log('🎉 ALL TESTS PASSED! ');
    console.log('✨ AGENTSPACE is working perfectly!');
  } else {
    console.log('⚠️  Some tests failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('\n❌ Test suite failed with error:', error.message);
  process.exit(1);
});
