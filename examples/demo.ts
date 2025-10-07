import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

async function runDemo() {
  console.log('🤖 AGENTSPACE Demo Starting...\n');

  console.log('1️⃣  Creating agents...');
  const agent1 = await axios.post(`${API_BASE}/agents`, {
    name: 'Data Processor Alpha',
    type: 'worker',
    capabilities: ['data-processing', 'analysis', 'cleaning'],
  });
  console.log(`✅ Created: ${agent1.data.name} (${agent1.data.id})`);

  const agent2 = await axios.post(`${API_BASE}/agents`, {
    name: 'Report Generator Beta',
    type: 'worker',
    capabilities: ['reporting', 'visualization', 'export'],
  });
  console.log(`✅ Created: ${agent2.data.name} (${agent2.data.id})`);

  const agent3 = await axios.post(`${API_BASE}/agents`, {
    name: 'Quality Checker Gamma',
    type: 'validator',
    capabilities: ['validation', 'quality-check', 'analysis'],
  });
  console.log(`✅ Created: ${agent3.data.name} (${agent3.data.id})\n`);

  console.log('2️⃣  Creating tasks...');
  const task1 = await axios.post(`${API_BASE}/tasks`, {
    name: 'Process Customer Data',
    description: 'Clean and analyze customer dataset',
    priority: 'high',
    input: { dataset: 'customers.csv', rows: 10000 },
  });
  console.log(`✅ Created: ${task1.data.name} (${task1.data.status})`);

  const task2 = await axios.post(`${API_BASE}/tasks`, {
    name: 'Generate Monthly Report',
    description: 'Create visualization and export monthly metrics',
    priority: 'medium',
    input: { month: 'January', year: 2024 },
  });
  console.log(`✅ Created: ${task2.data.name} (${task2.data.status})`);

  const task3 = await axios.post(`${API_BASE}/tasks`, {
    name: 'Validate Output Quality',
    description: 'Run quality checks on processed data',
    priority: 'critical',
    input: { threshold: 0.95 },
  });
  console.log(`✅ Created: ${task3.data.name} (${task3.data.status})\n`);

  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('3️⃣  Checking system metrics...');
  const metrics = await axios.get(`${API_BASE}/metrics`);
  console.log(`📊 Total Agents: ${metrics.data.totalAgents}`);
  console.log(`📊 Active Agents: ${metrics.data.activeAgents}`);
  console.log(`📊 Total Tasks: ${metrics.data.totalTasks}`);
  console.log(`📊 Running Tasks: ${metrics.data.runningTasks}\n`);

  console.log('4️⃣  Listing all agents...');
  const agents = await axios.get(`${API_BASE}/agents`);
  agents.data.forEach((agent: any) => {
    console.log(`   🤖 ${agent.name} - Status: ${agent.status} - Capabilities: ${agent.capabilities.join(', ')}`);
  });

  console.log('\n5️⃣  Listing all tasks...');
  const tasks = await axios.get(`${API_BASE}/tasks`);
  tasks.data.forEach((task: any) => {
    console.log(`   📋 ${task.name} - Priority: ${task.priority} - Status: ${task.status}`);
  });

  console.log('\n6️⃣  Completing tasks...');
  for (const task of tasks.data) {
    if (task.status === 'running') {
      await axios.post(`${API_BASE}/tasks/${task.id}/complete`, {
        output: { success: true, timestamp: new Date() }
      });
      console.log(`✅ Completed: ${task.name}`);
    }
  }

  console.log('\n7️⃣  Final metrics...');
  const finalMetrics = await axios.get(`${API_BASE}/metrics`);
  console.log(`📊 Completed Tasks: ${finalMetrics.data.completedTasks}`);
  console.log(`📊 Failed Tasks: ${finalMetrics.data.failedTasks}`);

  console.log('\n✨ Demo completed successfully!');
  console.log('👉 Open http://localhost:3000 to view the dashboard');
}

runDemo().catch(error => {
  console.error('❌ Demo failed:', error.message);
  process.exit(1);
});
