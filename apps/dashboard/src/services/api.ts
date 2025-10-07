import { Agent, AgentConfig, Task, TaskInput, SystemMetrics } from '@agentspace/types';
import { apiClient } from './apiClient';

export const agentApi = {
  getAll: () => apiClient.get<Agent[]>('/agents'),
  getById: (id: string) => apiClient.get<Agent>(`/agents/${id}`),
  create: (config: AgentConfig) => apiClient.post<Agent>('/agents', config),
  updateStatus: (id: string, status: string) => 
    apiClient.patch<Agent>(`/agents/${id}/status`, { status }),
  delete: (id: string) => apiClient.delete(`/agents/${id}`),
};

export const taskApi = {
  getAll: () => apiClient.get<Task[]>('/tasks'),
  getById: (id: string) => apiClient.get<Task>(`/tasks/${id}`),
  getPending: () => apiClient.get<Task[]>('/tasks/pending'),
  create: (input: TaskInput) => apiClient.post<Task>('/tasks', input),
  assign: (id: string, agentId: string) => 
    apiClient.post<Task>(`/tasks/${id}/assign`, { agentId }),
  complete: (id: string, output: any) => 
    apiClient.post<Task>(`/tasks/${id}/complete`, { output }),
  fail: (id: string, error: string) => 
    apiClient.post<Task>(`/tasks/${id}/fail`, { error }),
  delete: (id: string) => apiClient.delete(`/tasks/${id}`),
};

export const metricsApi = {
  get: () => apiClient.get<SystemMetrics>('/metrics'),
};
