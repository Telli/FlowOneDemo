import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';
import { useAgentStore } from '../../stores/agentStore';
import { VoiceInput } from '../voice/VoiceInput';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../services/api';
import { ConversationMessage } from '../../types';

export const AIConfigAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const { addAgent } = useAgentStore();

  const configMutation = useMutation({
    mutationFn: (message: string) =>
      api.configChat(message, messages),
    onSuccess: (data) => {
      // Add assistant response
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);

      // If agent was created, add it to store
      if (data.action === 'create' && data.agent) {
        addAgent(data.agent);
      }
    },
    onError: (error) => {
      console.error('Config chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    },
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');

    configMutation.mutate(userMessage);
  };

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript);
  };

  return (
    <>
      {/* Floating toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center z-50"
          >
            <Bot size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Assistant panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="text-blue-500" />
                <h2 className="font-semibold">AI Configuration Assistant</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mode toggle */}
            <div className="p-4 border-b flex gap-2">
              <button
                onClick={() => setMode('chat')}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  mode === 'chat'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setMode('voice')}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
                  mode === 'voice'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🎤 Voice
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <Bot size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-sm font-medium mb-2">
                    Tell me what agent you'd like to create!
                  </p>
                  <p className="text-xs text-gray-400">
                    Try: "Create a friendly math tutor"
                  </p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {configMutation.isPending && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex gap-1">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce delay-100">●</span>
                      <span className="animate-bounce delay-200">●</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              {mode === 'chat' ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Describe your agent..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || configMutation.isPending}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              ) : (
                <VoiceInput onTranscript={handleVoiceInput} />
              )}

              {mode === 'voice' && input && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                  <p className="text-gray-700">{input}</p>
                  <button
                    onClick={handleSend}
                    disabled={configMutation.isPending}
                    className="mt-2 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
