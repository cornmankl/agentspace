import { EventEmitter } from 'eventemitter3';
import { v4 as uuidv4 } from 'uuid';
import { Agent, AgentConfig, AgentStatus } from '@agentspace/types';
import { PersistenceAdapter } from './persistence/PersistenceAdapter.js';

export class AgentManager extends EventEmitter {
  private agents: Map<string, Agent> = new Map();

  constructor(private readonly persistence?: PersistenceAdapter<Agent>) {
    super();

    if (this.persistence) {
      const storedAgents = this.persistence.load() as (Agent & {
        createdAt: string;
        lastActiveAt: string;
      })[];

      storedAgents.forEach((storedAgent) => {
        const restored: Agent = {
          ...storedAgent,
          createdAt: new Date(storedAgent.createdAt),
          lastActiveAt: new Date(storedAgent.lastActiveAt),
        };
        this.agents.set(restored.id, restored);
      });
    }
  }

  private persist(): void {
    this.persistence?.save(Array.from(this.agents.values()));
  }

  createAgent(config: AgentConfig): Agent {
    const agent: Agent = {
      id: uuidv4(),
      name: config.name,
      type: config.type,
      status: AgentStatus.IDLE,
      capabilities: config.capabilities,
      metadata: config.metadata || {},
      createdAt: new Date(),
      lastActiveAt: new Date(),
    };

    this.agents.set(agent.id, agent);
    this.emit('agent:created', agent);
    this.persist();
    return agent;
  }

  getAgent(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  getAgentsByStatus(status: AgentStatus): Agent[] {
    return this.getAllAgents().filter(agent => agent.status === status);
  }

  getAgentsByCapability(capability: string): Agent[] {
    return this.getAllAgents().filter(agent => 
      agent.capabilities.includes(capability)
    );
  }

  updateAgentStatus(id: string, status: AgentStatus): boolean {
    const agent = this.agents.get(id);
    if (!agent) return false;

    agent.status = status;
    agent.lastActiveAt = new Date();
    this.emit('agent:status-changed', agent);
    this.persist();
    return true;
  }

  deleteAgent(id: string): boolean {
    const agent = this.agents.get(id);
    if (!agent) return false;

    this.agents.delete(id);
    this.emit('agent:deleted', agent);
    this.persist();
    return true;
  }

  getActiveAgentsCount(): number {
    return this.getAgentsByStatus(AgentStatus.IDLE).length + 
           this.getAgentsByStatus(AgentStatus.BUSY).length;
  }
}
