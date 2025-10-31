import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Bot, Settings, Play } from 'lucide-react';
import { useAgentStore } from '../../stores/agentStore';
import { Agent } from '../../types';

export const AgentNode: React.FC<NodeProps<Agent>> = ({ data }) => {
  const { selectAgent, setTestingMode } = useAgentStore();

  const statusColors = {
    new: 'border-gray-300 bg-gray-50',
    configured: 'border-green-500 bg-green-50',
    testing: 'border-blue-500 bg-blue-50',
    error: 'border-red-500 bg-red-50',
  };

  const handleTest = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectAgent(data);
    setTestingMode(true);
  };

  const handleConfigure = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectAgent(data);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative px-4 py-3 rounded-lg border-2 shadow-lg min-w-[200px] ${
        statusColors[data.status as keyof typeof statusColors]
      }`}
      data-id={data.id}
    >
      <Handle type="target" position={Position.Top} />

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <Bot size={20} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{data.name}</h3>
          <p className="text-xs text-gray-600 truncate">{data.persona}</p>

          {data.tools && data.tools.length > 0 && (
            <div className="flex gap-1 mt-1 flex-wrap">
              {data.tools.map((tool: string) => (
                <span
                  key={tool}
                  className="text-xs bg-white px-1.5 py-0.5 rounded border"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleConfigure}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50 transition-colors"
        >
          <Settings size={12} />
          Configure
        </button>
        <button
          onClick={handleTest}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Play size={12} />
          Test
        </button>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </motion.div>
  );
};
