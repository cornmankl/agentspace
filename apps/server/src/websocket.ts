import { WebSocketServer, WebSocket } from 'ws';
import { Coordinator } from '@agentspace/core';
import { logger } from './logger.js';

interface HeartbeatWebSocket extends WebSocket {
  isAlive?: boolean;
}

const HEARTBEAT_INTERVAL_MS = Number(process.env.WS_HEARTBEAT_INTERVAL_MS ?? 30_000);

export function setupWebSocket(wss: WebSocketServer, coordinator: Coordinator): void {
  const clients = new Set<HeartbeatWebSocket>();

  const broadcast = (data: any) => {
    const message = JSON.stringify(data);
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  coordinator.getAgentManager().on('agent:created', (agent) => {
    broadcast({ type: 'agent:created', data: agent });
  });

  coordinator.getAgentManager().on('agent:status-changed', (agent) => {
    broadcast({ type: 'agent:status-changed', data: agent });
  });

  coordinator.getAgentManager().on('agent:deleted', (agent) => {
    broadcast({ type: 'agent:deleted', data: agent });
  });

  coordinator.getTaskManager().on('task:created', (task) => {
    broadcast({ type: 'task:created', data: task });
  });

  coordinator.getTaskManager().on('task:assigned', (task) => {
    broadcast({ type: 'task:assigned', data: task });
  });

  coordinator.getTaskManager().on('task:status-changed', (task) => {
    broadcast({ type: 'task:status-changed', data: task });
  });

  coordinator.getTaskManager().on('task:deleted', (task) => {
    broadcast({ type: 'task:deleted', data: task });
  });

  wss.on('connection', (ws) => {
    const socket = ws as HeartbeatWebSocket;
    socket.isAlive = true;
    clients.add(socket);
    logger.info({ connections: clients.size }, 'WebSocket client connected');

    ws.send(JSON.stringify({ 
      type: 'connected', 
      message: 'Connected to AGENTSPACE',
      metrics: coordinator.getSystemMetrics()
    }));

    ws.on('pong', () => {
      socket.isAlive = true;
    });

    ws.on('close', () => {
      clients.delete(socket);
      logger.info({ connections: clients.size }, 'WebSocket client disconnected');
    });

    ws.on('error', (error) => {
      logger.error({ error }, 'WebSocket error');
      clients.delete(socket);
    });
  });

  const heartbeat = setInterval(() => {
    clients.forEach((client) => {
      if (client.readyState !== WebSocket.OPEN) {
        clients.delete(client);
        return;
      }

      if (client.isAlive === false) {
        logger.warn('Terminating stale WebSocket connection');
        clients.delete(client);
        client.terminate();
        return;
      }

      client.isAlive = false;
      client.ping();
    });
  }, HEARTBEAT_INTERVAL_MS);

  wss.on('close', () => {
    clearInterval(heartbeat);
    clients.clear();
  });
}
