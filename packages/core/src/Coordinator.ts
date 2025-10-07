import { EventEmitter } from 'eventemitter3';
import { AgentManager } from './AgentManager.js';
import { TaskManager } from './TaskManager.js';
import { MessageBroker } from './MessageBroker.js';
import { Agent, AgentStatus, SystemMetrics, Task, TaskPriority, TaskStatus } from '@agentspace/types';
import { PersistenceAdapter } from './persistence/PersistenceAdapter.js';

export interface CoordinatorOptions {
  autoAssignEnabled?: boolean;
  agentStorage?: PersistenceAdapter<Agent>;
  taskStorage?: PersistenceAdapter<Task>;
}

export class Coordinator extends EventEmitter {
  private agentManager: AgentManager;
  private taskManager: TaskManager;
  private messageBroker: MessageBroker;

  private autoAssignEnabled: boolean;

  constructor(options: CoordinatorOptions = {}) {
    super();
    this.agentManager = new AgentManager(options.agentStorage);
    this.taskManager = new TaskManager(options.taskStorage);
    this.messageBroker = new MessageBroker();
    this.autoAssignEnabled = options.autoAssignEnabled ?? true;

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.taskManager.on('task:created', (task) => {
      if (this.autoAssignEnabled && !task.assignedAgentId) {
        this.autoAssignTask(task.id);
      }
    });

    this.taskManager.on('task:status-changed', (task) => {
      if (task.assignedAgentId) {
        if (task.status === TaskStatus.COMPLETED || task.status === TaskStatus.FAILED) {
          this.agentManager.updateAgentStatus(task.assignedAgentId, AgentStatus.IDLE);
        }
      }
    });
  }

  private autoAssignTask(taskId: string): boolean {
    const task = this.taskManager.getTask(taskId);
    if (!task) return false;

    const idleAgents = this.agentManager.getAgentsByStatus(AgentStatus.IDLE);
    if (idleAgents.length === 0) return false;

    const suitableAgent = idleAgents.find(agent =>
      task.name && agent.capabilities.some(cap => 
        task.name.toLowerCase().includes(cap.toLowerCase())
      )
    ) || idleAgents[0];

    const assigned = this.taskManager.assignTask(taskId, suitableAgent.id);
    if (assigned) {
      this.agentManager.updateAgentStatus(suitableAgent.id, AgentStatus.BUSY);
      this.messageBroker.sendMessage('system', suitableAgent.id, 'task', { taskId });
    }
    return assigned;
  }

  getAgentManager(): AgentManager {
    return this.agentManager;
  }

  getTaskManager(): TaskManager {
    return this.taskManager;
  }

  getMessageBroker(): MessageBroker {
    return this.messageBroker;
  }

  setAutoAssign(enabled: boolean): void {
    this.autoAssignEnabled = enabled;
  }

  getSystemMetrics(): SystemMetrics {
    const allTasks = this.taskManager.getAllTasks();
    return {
      totalAgents: this.agentManager.getAllAgents().length,
      activeAgents: this.agentManager.getActiveAgentsCount(),
      totalTasks: allTasks.length,
      runningTasks: this.taskManager.getTasksByStatus(TaskStatus.RUNNING).length,
      completedTasks: this.taskManager.getTasksByStatus(TaskStatus.COMPLETED).length,
      failedTasks: this.taskManager.getTasksByStatus(TaskStatus.FAILED).length,
    };
  }

  reset(): void {
    this.agentManager.getAllAgents().forEach(agent => {
      this.agentManager.deleteAgent(agent.id);
    });
    this.taskManager.getAllTasks().forEach(task => {
      this.taskManager.deleteTask(task.id);
    });
    this.messageBroker.clearMessageHistory();
  }
}
