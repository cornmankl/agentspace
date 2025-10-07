import { Agent, AgentStatus } from '@agentspace/types';
import { agentApi } from '../services/api';
import { useToast } from '../context/ToastContext';

interface AgentListProps {
  agents: Agent[];
  onUpdate: () => void;
}

export function AgentList({ agents, onUpdate }: AgentListProps) {
  const { showToast } = useToast();

  const handleDelete = async (id: string) => {
    if (confirm('Delete this agent?')) {
      try {
        await agentApi.delete(id);
        onUpdate();
        showToast({ title: 'Agent removed', variant: 'info' });
      } catch (error) {
        console.error('Failed to delete agent:', error);
        showToast({
          title: 'Failed to delete agent',
          message: error instanceof Error ? error.message : undefined,
          variant: 'error',
        });
      }
    }
  };

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case AgentStatus.IDLE: return '#10b981';
      case AgentStatus.BUSY: return '#f59e0b';
      case AgentStatus.ERROR: return '#ef4444';
      case AgentStatus.OFFLINE: return '#6b7280';
    }
  };

  return (
    <div className="card-list">
      {agents.length === 0 && (
        <div className="card card-muted">No agents yet. Create one to get started!</div>
      )}
      {agents.map((agent) => (
        <div key={agent.id} className="card">
          <div className="status-row" style={{ justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div className="status-row">
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{agent.name}</span>
                <span
                  className="badge"
                  style={{
                    backgroundColor: `${getStatusColor(agent.status)}20`,
                    color: getStatusColor(agent.status),
                  }}
                >
                  {agent.status}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', marginTop: '5px' }}>
                Type: {agent.type}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '5px' }}>
                Capabilities: {agent.capabilities.join(', ')}
              </div>
            </div>
            <button onClick={() => handleDelete(agent.id)} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
