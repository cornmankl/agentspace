import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { config } from 'dotenv';
import { createApp } from './app.js';
import { setupWebSocket } from './websocket.js';
import { logger } from './logger.js';

// Load environment variables
config();

const PORT = Number(process.env.PORT ?? 3001);
const { app, coordinator } = createApp();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

setupWebSocket(wss, coordinator);

httpServer.listen(PORT, () => {
  logger.info(`AGENTSPACE Server running on http://localhost:${PORT}`);
  logger.info(`WebSocket server ready on ws://localhost:${PORT}`);
});

export { app, coordinator, httpServer, wss };
