import { EventEmitter } from 'eventemitter3';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@agentspace/types';

export class MessageBroker extends EventEmitter {
  private messageQueue: Message[] = [];
  private messageHistory: Map<string, Message> = new Map();

  sendMessage(fromAgentId: string, toAgentId: string | undefined, type: Message['type'], payload: any): Message {
    const message: Message = {
      id: uuidv4(),
      fromAgentId,
      toAgentId,
      type,
      payload,
      timestamp: new Date(),
    };

    this.messageQueue.push(message);
    this.messageHistory.set(message.id, message);

    if (toAgentId) {
      this.emit(`message:${toAgentId}`, message);
    } else {
      this.emit('message:broadcast', message);
    }

    this.emit('message:sent', message);
    return message;
  }

  getMessageHistory(agentId?: string): Message[] {
    const messages = Array.from(this.messageHistory.values());
    if (agentId) {
      return messages.filter(m => m.fromAgentId === agentId || m.toAgentId === agentId);
    }
    return messages;
  }

  subscribeToMessages(agentId: string, handler: (message: Message) => void): void {
    this.on(`message:${agentId}`, handler);
    this.on('message:broadcast', handler);
  }

  unsubscribeFromMessages(agentId: string, handler: (message: Message) => void): void {
    this.off(`message:${agentId}`, handler);
    this.off('message:broadcast', handler);
  }

  clearMessageHistory(): void {
    this.messageHistory.clear();
    this.messageQueue = [];
  }
}
