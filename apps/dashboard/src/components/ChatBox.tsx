import { useState, useRef, useEffect } from 'react';
import { Agent } from '@agentspace/types';
import { chatApi, ChatMessage } from '../services/chatApi';

interface Message {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  agentName?: string;
  timestamp: Date;
}

interface ChatBoxProps {
  agents: Agent[];
  onClose?: () => void;
}

export function ChatBox({ agents, onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome to AGENTSPACE Chat powered by GLM-4.6! Select an agent below and start chatting. 🤖',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !selectedAgent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Build conversation history for GLM API
      const conversationHistory: ChatMessage[] = messages
        .filter(m => m.role === 'user' || m.role === 'agent')
        .map(m => ({
          role: m.role === 'agent' ? 'assistant' : 'user',
          content: m.content
        }));

      // Call real GLM-4.6 API
      const response = await chatApi.sendMessage({
        agentId: selectedAgent.id,
        message: userInput,
        conversationHistory
      });

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: response.response,
        agentName: response.agentName,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback message on error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: '❌ Sorry, I encountered an error. Please try again or contact support if the issue persists.',
        agentName: selectedAgent.name,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <div>
          <div style={{ fontSize: '18px', fontWeight: 700 }}>💬 Agent Chat</div>
          <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>
            {selectedAgent ? `Chatting with ${selectedAgent.name}` : 'Select an agent below'}
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="chat-close-btn">
            ✕
          </button>
        )}
      </div>

      <div className="chat-agent-selector">
        <select
          value={selectedAgent?.id || ''}
          onChange={(e) => {
            const agent = agents.find(a => a.id === e.target.value);
            setSelectedAgent(agent || null);
            if (agent) {
              setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'system',
                content: `Connected to ${agent.name} (${agent.type}) - ${agent.capabilities.join(', ')}`,
                timestamp: new Date()
              }]);
            }
          }}
          className="chat-select"
        >
          <option value="">Select an agent to chat...</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name} ({agent.type}) - {agent.status}
            </option>
          ))}
        </select>
      </div>

      <div className="chatbox-body">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.role}`}>
            <div className={`chat-bubble ${message.role}`}>
              {message.role === 'agent' && message.agentName && (
                <div className="chat-bubble-header">{message.agentName}</div>
              )}
              {message.content}
              <div className="chat-timestamp">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="chat-message agent">
            <div className="chat-bubble agent">
              <div className="chat-typing-indicator">
                <div className="chat-typing-dot" />
                <div className="chat-typing-dot" />
                <div className="chat-typing-dot" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbox-footer">
        <div className="chat-input">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={selectedAgent ? "Type your message..." : "Select an agent first..."}
            disabled={!selectedAgent}
            className="chat-textarea"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || !selectedAgent}
            className="chat-send-btn"
            style={{
              background: inputValue.trim() && selectedAgent 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#e2e8f0',
              color: inputValue.trim() && selectedAgent ? '#fff' : '#94a3b8',
            }}
          >
            ⬆️
          </button>
        </div>
        <div className="chat-hint">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
