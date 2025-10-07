import { useCallback, useEffect, useState } from 'react';
import { Agent, Task, SystemMetrics } from '@agentspace/types';
import { agentApi, taskApi, metricsApi } from '../services/api';
import { useWebSocket } from '../hooks/useWebSocket';
import { AgentList } from './AgentList';
import { TaskList } from './TaskList';
import { MetricsPanel } from './MetricsPanel';
import { CreateAgentForm } from './CreateAgentForm';
import { CreateTaskForm } from './CreateTaskForm';
import { SuggestedPrompts } from './SuggestedPrompts';
import { ChatBox } from './ChatBox';
import { ChatButton } from './ChatButton';
import { PromptTemplate } from '../utils/promptTemplates';
import { useToast } from '../context/ToastContext';

export function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showSuggestedPrompts, setShowSuggestedPrompts] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const websocketUrl = import.meta.env.VITE_WS_URL ?? 'ws://localhost:3001';
  const { lastMessage } = useWebSocket(websocketUrl);
  const { showToast } = useToast();

  const loadData = useCallback(async (withSpinner = false) => {
    if (withSpinner) {
      setIsLoading(true);
    }
    try {
      const [agentsRes, tasksRes, metricsRes] = await Promise.all([
        agentApi.getAll(),
        taskApi.getAll(),
        metricsApi.get(),
      ]);
      setAgents(agentsRes.data);
      setTasks(tasksRes.data);
      setMetrics(metricsRes.data);
      setError(null);
    } catch (error) {
      console.error('Failed to load data:', error);
      setError('Failed to load workspace data. Please try again.');
      showToast({
        title: 'Failed to load data',
        message: error instanceof Error ? error.message : undefined,
        variant: 'error',
      });
    }
    if (withSpinner) {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData(true);
  }, [loadData]);

  useEffect(() => {
    if (lastMessage) {
      loadData();
    }
  }, [lastMessage, loadData]);

  const handleSelectPrompt = async (template: PromptTemplate) => {
    setShowSuggestedPrompts(false);
    
    // Auto-create task from template
    try {
      await taskApi.create({
        name: template.taskName,
        description: template.taskDescription,
        priority: template.priority,
        input: template.input
      });
      await loadData();
      showToast({
        title: 'Task created',
        message: `Task "${template.taskName}" created successfully.`,
        variant: 'success',
      });
    } catch (error) {
      console.error('Failed to create task from template:', error);
      showToast({
        title: 'Task creation failed',
        message: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'error',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="loading-spinner" />
          <div>Loading workspace data…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">🤖 AGENTSPACE</h1>
          <p className="dashboard-subtitle">AI Agent Workspace Platform with Smart Prompts</p>
        </div>
        <button
          onClick={() => setShowSuggestedPrompts(!showSuggestedPrompts)}
          className={`btn ${showSuggestedPrompts ? 'btn-danger' : 'btn-primary'}`}
        >
          {showSuggestedPrompts ? '✕ Hide Prompts' : '⚡ Show Quick Actions'}
        </button>
      </header>

      {error && (
        <div className="card" style={{ borderLeft: `4px solid #ef4444` }}>
          <strong>We hit a snag.</strong>
          <p style={{ color: '#dc2626' }}>{error}</p>
          <button className="btn btn-primary" onClick={() => loadData(true)}>Retry</button>
        </div>
      )}

      {metrics && <MetricsPanel metrics={metrics} />}

      {showSuggestedPrompts && (
        <SuggestedPrompts onSelectPrompt={handleSelectPrompt} />
      )}

      <div className="grid-two-column">
        <div>
          <div className="toolbar">
            <h2>Agents</h2>
            <button
              onClick={() => setShowAgentForm(!showAgentForm)}
              className="btn btn-secondary"
            >
              {showAgentForm ? 'Cancel' : '+ New Agent'}
            </button>
          </div>
          {showAgentForm && (
            <CreateAgentForm
              onSuccess={async () => {
                setShowAgentForm(false);
                await loadData();
                showToast({
                  title: 'Agent created',
                  variant: 'success',
                });
              }}
            />
          )}
          <AgentList agents={agents} onUpdate={loadData} />
        </div>

        <div>
          <div className="toolbar">
            <h2>Tasks</h2>
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="btn btn-secondary"
            >
              {showTaskForm ? 'Cancel' : '+ New Task'}
            </button>
          </div>
          {showTaskForm && (
            <CreateTaskForm
              agents={agents}
              onSuccess={async () => {
                setShowTaskForm(false);
                await loadData();
                showToast({
                  title: 'Task created',
                  variant: 'success',
                });
              }}
            />
          )}
          <TaskList tasks={tasks} onUpdate={loadData} />
        </div>
      </div>

      {!showChat && <ChatButton onClick={() => setShowChat(true)} />}
      {showChat && <ChatBox agents={agents} onClose={() => setShowChat(false)} />}
    </div>
  );
}
