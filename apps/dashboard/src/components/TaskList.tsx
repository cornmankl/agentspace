import { Task, TaskStatus } from '@agentspace/types';
import { taskApi } from '../services/api';
import { useToast } from '../context/ToastContext';

interface TaskListProps {
  tasks: Task[];
  onUpdate: () => void;
}

export function TaskList({ tasks, onUpdate }: TaskListProps) {
  const { showToast } = useToast();

  const handleComplete = async (id: string) => {
    try {
      await taskApi.complete(id, { result: 'Manual completion' });
      onUpdate();
      showToast({ title: 'Task marked complete', variant: 'success' });
    } catch (error) {
      console.error('Failed to complete task:', error);
      showToast({
        title: 'Failed to complete task',
        message: error instanceof Error ? error.message : undefined,
        variant: 'error',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this task?')) {
      try {
        await taskApi.delete(id);
        onUpdate();
        showToast({ title: 'Task deleted', variant: 'info' });
      } catch (error) {
        console.error('Failed to delete task:', error);
        showToast({
          title: 'Failed to delete task',
          message: error instanceof Error ? error.message : undefined,
          variant: 'error',
        });
      }
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING: return '#6b7280';
      case TaskStatus.RUNNING: return '#f59e0b';
      case TaskStatus.COMPLETED: return '#10b981';
      case TaskStatus.FAILED: return '#ef4444';
      case TaskStatus.CANCELLED: return '#94a3b8';
    }
  };

  return (
    <div className="card-list">
      {tasks.length === 0 && (
        <div className="card card-muted">No tasks yet. Create one to get started!</div>
      )}
      {tasks.map((task) => (
        <div key={task.id} className="card">
          <div className="status-row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div className="status-row">
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{task.name}</span>
                <span
                  className="badge"
                  style={{
                    backgroundColor: `${getStatusColor(task.status)}20`,
                    color: getStatusColor(task.status),
                  }}
                >
                  {task.status}
                </span>
                <span
                  className="badge"
                  style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}
                >
                  {task.priority}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', marginTop: '5px' }}>
                {task.description}
              </div>
              {task.assignedAgentId && (
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '5px' }}>
                  Agent: {task.assignedAgentId.slice(0, 8)}...
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {task.status === TaskStatus.RUNNING && (
                <button onClick={() => handleComplete(task.id)} className="btn btn-muted">
                  Complete
                </button>
              )}
              <button onClick={() => handleDelete(task.id)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
