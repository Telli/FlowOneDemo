import React from 'react';
import { Plus, GraduationCap, Briefcase, Heart, Code } from 'lucide-react';
import { useMutation } from '@tantml:react-query';
import { api } from '../../services/api';
import { useAgentStore } from '../../stores/agentStore';

const AGENT_TEMPLATES = [
  {
    id: 'tutor',
    name: 'Math Tutor',
    icon: GraduationCap,
    persona: 'friendly, encouraging, patient',
    systemPrompt: 'You are an encouraging math tutor who helps students understand concepts through clear explanations and positive reinforcement. Break down complex problems into simple steps. Always be supportive and celebrate progress.',
    tools: ['calculator'],
  },
  {
    id: 'sales',
    name: 'Sales Coach',
    icon: Briefcase,
    persona: 'professional, confident, persuasive',
    systemPrompt: 'You are a professional sales coach who helps salespeople improve their pitch and close more deals. Provide specific, actionable advice based on sales best practices. Be confident and motivating.',
    tools: ['crm', 'calendar'],
  },
  {
    id: 'wellness',
    name: 'Wellness Coach',
    icon: Heart,
    persona: 'empathetic, supportive, motivating',
    systemPrompt: 'You are a wellness and mindfulness coach who helps people improve their mental and physical health. Provide compassionate guidance and practical tips. Be understanding and encouraging.',
    tools: ['reminder'],
  },
  {
    id: 'developer',
    name: 'Code Reviewer',
    icon: Code,
    persona: 'technical, thorough, constructive',
    systemPrompt: 'You are an expert code reviewer who helps developers improve their code quality. Provide thorough, constructive feedback with specific examples. Be technical but approachable.',
    tools: ['github', 'linter'],
  },
];

export const AgentPalette: React.FC = () => {
  const { addAgent } = useAgentStore();

  const createMutation = useMutation({
    mutationFn: (template: typeof AGENT_TEMPLATES[0]) =>
      api.createAgent({
        name: template.name,
        persona: template.persona,
        systemPrompt: template.systemPrompt,
        voice: 'warm, friendly',
        tools: template.tools,
        tags: [template.id],
        position: { x: 250 + Math.random() * 200, y: 100 + Math.random() * 200 },
        status: 'configured',
      }),
    onSuccess: (data) => {
      addAgent(data);
    },
  });

  return (
    <div className="w-64 bg-white border-r h-full p-4 overflow-y-auto">
      <h2 className="font-semibold mb-4 flex items-center gap-2">
        <Plus size={20} />
        Agent Templates
      </h2>

      <div className="space-y-2">
        {AGENT_TEMPLATES.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => createMutation.mutate(template)}
              disabled={createMutation.isPending}
              className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border text-left transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{template.name}</h3>
                  <p className="text-xs text-gray-500 truncate">
                    {template.persona}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> Use the AI Assistant (blue button) to create custom agents with voice or chat!
        </p>
      </div>
    </div>
  );
};
