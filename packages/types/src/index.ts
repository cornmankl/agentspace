export enum AgentStatus {
  IDLE = 'idle',
  BUSY = 'busy',
  ERROR = 'error',
  OFFLINE = 'offline',
}

export enum TaskStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: AgentStatus;
  capabilities: string[];
  metadata: Record<string, any>;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedAgentId?: string;
  input: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface Message {
  id: string;
  fromAgentId: string;
  toAgentId?: string;
  type: 'task' | 'response' | 'broadcast' | 'status';
  payload: any;
  timestamp: Date;
}

export interface AgentConfig {
  name: string;
  type: string;
  capabilities: string[];
  metadata?: Record<string, any>;
}

export interface TaskInput {
  name: string;
  description: string;
  priority: TaskPriority;
  assignedAgentId?: string;
  input: Record<string, any>;
}

export interface SystemMetrics {
  totalAgents: number;
  activeAgents: number;
  totalTasks: number;
  runningTasks: number;
  completedTasks: number;
  failedTasks: number;
}
