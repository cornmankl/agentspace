import { useState } from 'react';
import { agentApi } from '../services/api';
import { useToast } from '../context/ToastContext';

interface CreateAgentFormProps {
  onSuccess: () => void;
}

export function CreateAgentForm({ onSuccess }: CreateAgentFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [capabilities, setCapabilities] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await agentApi.create({
        name,
        type,
        capabilities: capabilities.split(',').map(c => c.trim()).filter(Boolean),
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to create agent:', error);
      showToast({
        title: 'Could not create agent',
        message: error instanceof Error ? error.message : undefined,
        variant: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '15px' }}>
      <div className="form-group">
        <label>Name</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <input 
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          placeholder="e.g., worker, analyzer, coordinator"
        />
      </div>
      <div className="form-group">
        <label>Capabilities (comma-separated)</label>
        <input 
          type="text"
          value={capabilities}
          onChange={(e) => setCapabilities(e.target.value)}
          required
          placeholder="e.g., data-processing, analysis, reporting"
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        Create Agent
      </button>
    </form>
  );
}
