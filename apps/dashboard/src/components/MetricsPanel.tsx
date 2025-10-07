import { SystemMetrics } from '@agentspace/types';

interface MetricsPanelProps {
  metrics: SystemMetrics;
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  const metricCards = [
    { label: 'Total Agents', value: metrics.totalAgents, color: '#3b82f6' },
    { label: 'Active Agents', value: metrics.activeAgents, color: '#10b981' },
    { label: 'Total Tasks', value: metrics.totalTasks, color: '#8b5cf6' },
    { label: 'Running Tasks', value: metrics.runningTasks, color: '#f59e0b' },
    { label: 'Completed Tasks', value: metrics.completedTasks, color: '#22c55e' },
    { label: 'Failed Tasks', value: metrics.failedTasks, color: '#ef4444' },
  ];

  return (
    <div className="metric-grid">
      {metricCards.map((metric) => (
        <div key={metric.label} className="metric-card" style={{ borderColor: metric.color }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: metric.color }}>
            {metric.value}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '5px' }}>
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}
