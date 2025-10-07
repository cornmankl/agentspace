import { EventEmitter } from 'eventemitter3';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskInput, TaskStatus, TaskPriority } from '@agentspace/types';
import { PersistenceAdapter } from './persistence/PersistenceAdapter.js';

export class TaskManager extends EventEmitter {
  private tasks: Map<string, Task> = new Map();

  constructor(private readonly persistence?: PersistenceAdapter<Task>) {
    super();

    if (this.persistence) {
      const storedTasks = this.persistence.load() as (Task & {
        createdAt: string;
        startedAt?: string;
        completedAt?: string;
      })[];

      storedTasks.forEach((storedTask) => {
        const restored: Task = {
          ...storedTask,
          createdAt: new Date(storedTask.createdAt),
          startedAt: storedTask.startedAt ? new Date(storedTask.startedAt) : undefined,
          completedAt: storedTask.completedAt ? new Date(storedTask.completedAt) : undefined,
        };
        this.tasks.set(restored.id, restored);
      });
    }
  }

  private persist(): void {
    this.persistence?.save(Array.from(this.tasks.values()));
  }

  createTask(input: TaskInput): Task {
    const task: Task = {
      id: uuidv4(),
      name: input.name,
      description: input.description,
      status: TaskStatus.PENDING,
      priority: input.priority,
      assignedAgentId: input.assignedAgentId,
      input: input.input,
      createdAt: new Date(),
    };

    this.tasks.set(task.id, task);
    this.emit('task:created', task);
    this.persist();
    return task;
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.getAllTasks().filter(task => task.status === status);
  }

  getTasksByAgent(agentId: string): Task[] {
    return this.getAllTasks().filter(task => task.assignedAgentId === agentId);
  }

  getTasksByPriority(priority: TaskPriority): Task[] {
    return this.getAllTasks().filter(task => task.priority === priority);
  }

  assignTask(taskId: string, agentId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task || task.status !== TaskStatus.PENDING) return false;

    task.assignedAgentId = agentId;
    task.status = TaskStatus.RUNNING;
    task.startedAt = new Date();
    this.emit('task:assigned', task);
    this.persist();
    return true;
  }

  updateTaskStatus(taskId: string, status: TaskStatus, output?: any, error?: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    task.status = status;
    if (output !== undefined) task.output = output;
    if (error) task.error = error;
    
    if (status === TaskStatus.COMPLETED || status === TaskStatus.FAILED) {
      task.completedAt = new Date();
    }

    this.emit('task:status-changed', task);
    this.persist();
    return true;
  }

  completeTask(taskId: string, output: any): boolean {
    return this.updateTaskStatus(taskId, TaskStatus.COMPLETED, output);
  }

  failTask(taskId: string, error: string): boolean {
    return this.updateTaskStatus(taskId, TaskStatus.FAILED, undefined, error);
  }

  cancelTask(taskId: string): boolean {
    return this.updateTaskStatus(taskId, TaskStatus.CANCELLED);
  }

  deleteTask(taskId: string): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    this.tasks.delete(taskId);
    this.emit('task:deleted', task);
    this.persist();
    return true;
  }

  getPendingTasks(): Task[] {
    return this.getTasksByStatus(TaskStatus.PENDING)
      .sort((a, b) => {
        const priorityOrder = {
          [TaskPriority.CRITICAL]: 0,
          [TaskPriority.HIGH]: 1,
          [TaskPriority.MEDIUM]: 2,
          [TaskPriority.LOW]: 3,
        };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }
}
