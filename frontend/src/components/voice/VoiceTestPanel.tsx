import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Zap } from 'lucide-react';
import { useAgentStore } from '../../stores/agentStore';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../services/api';
import { VoiceInput } from './VoiceInput';
import { ConversationMessage } from '../../types';

const PERSONA_PRESETS = [
  { id: 'friendly', label: 'Friendly & Warm', emoji: '😊' },
  { id: 'professional', label: 'Professional', emoji: '💼' },
  { id: 'casual', label: 'Casual & Relaxed', emoji: '😎' },
  { id: 'technical', label: 'Technical Expert', emoji: '🤓' },
  { id: 'encouraging', label: 'Encouraging', emoji: '🌟' },
  { id: 'authoritative', label: 'Authoritative', emoji: '👔' },
];

export const VoiceTestPanel: React.FC = () => {
  const { selectedAgent, isTestingMode, setTestingMode, updateAgent } = useAgentStore();
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string>();
  const [mode, setMode] = useState<'text' | 'voice'>('text');

  const testMutation = useMutation({
    mutationFn: (message: string) =>
      api.testAgent(selectedAgent!.id, message, conversationId),
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);
      setConversationId(data.conversationId);
    },
    onError: (error) => {
      console.error('Test error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error.' },
      ]);
    },
  });

  const personaMutation = useMutation({
    mutationFn: (newPersona: string) =>
      api.adaptPersona(selectedAgent!.id, newPersona),
    onSuccess: (data) => {
      if (data.agent) {
        updateAgent(data.agent.id, data.agent);

        // Flash animation on canvas node
        const node = document.querySelector(`[data-id="${data.agent.id}"]`);
        if (node) {
          node.classList.add('persona-flash');
          setTimeout(() => node.classList.remove('persona-flash'), 500);
        }

        // Add notification message
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `✨ Persona updated to: ${data.agent.persona}`,
          },
        ]);
      }
    },
  });

  const handleSend = () => {
    if (!input.trim() || !selectedAgent) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');

    testMutation.mutate(userMessage);
  };

  const handlePersonaChange = (persona: string) => {
    if (!selectedAgent) return;
    personaMutation.mutate(persona);
  };

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript);
  };

  if (!isTestingMode || !selectedAgent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-40 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Testing: {selectedAgent.name}</h2>
            <button
              onClick={() => setTestingMode(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-600">{selectedAgent.persona}</p>
        </div>

        {/* Mode toggle */}
        <div className="p-4 border-b flex gap-2">
          <button
            onClick={() => setMode('text')}
            className={`flex-1 py-2 px-4 rounded transition-colors ${
              mode === 'text'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            💬 Text
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

        {/* Persona switcher */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-yellow-500" />
            <span className="text-sm font-medium">Quick Persona Switch</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PERSONA_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePersonaChange(preset.label)}
                disabled={personaMutation.isPending}
                className="p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-left transition-colors disabled:opacity-50"
              >
                <span className="mr-1">{preset.emoji}</span>
                {preset.label}
              </button>
            ))}
          </div>
          {personaMutation.isPending && (
            <p className="text-xs text-blue-500 mt-2">Updating persona...</p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-sm">Start a conversation!</p>
              <p className="text-xs mt-2 text-gray-400">
                Try asking a question or switching the persona
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

          {testMutation.isPending && (
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
          {mode === 'text' ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || testMutation.isPending}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          ) : (
            <>
              <VoiceInput onTranscript={handleVoiceInput} />
              {input && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                  <p className="text-gray-700">{input}</p>
                  <button
                    onClick={handleSend}
                    disabled={testMutation.isPending}
                    className="mt-2 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    Send
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
