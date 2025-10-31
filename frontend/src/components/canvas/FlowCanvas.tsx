import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AgentNode } from './AgentNode';
import { useAgentStore } from '../../stores/agentStore';

const nodeTypes = {
  agent: AgentNode,
};

export const FlowCanvas: React.FC = () => {
  const agents = useAgentStore((state) => state.agents);

  // Convert agents to ReactFlow nodes
  const getNodes = (): Node[] => {
    return agents.map((agent) => ({
      id: agent.id,
      type: 'agent',
      position: agent.position,
      data: agent,
    }));
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(getNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Sync nodes when agents change
  useEffect(() => {
    const newNodes = getNodes();
    setNodes(newNodes);
  }, [agents, setNodes]);

  return (
    <div className="h-full w-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
