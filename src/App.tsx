import ReactFlow, {
  Background,
  Controls,
  Connection,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useState } from 'react';
import TaskNode from './components/TaskNode/TaskNode';
import Sidebar from './components/Sidebar/Sidebar';
import ControlsPanel from './components/ControlsPanel/ControlsPanel';
import { connectNodes, setNodes, setEdges } from './store/slices/flowSlice';
import './App.css';

const nodeTypes = {
  task: TaskNode,
};

const Flow = () => {
  const dispatch = useAppDispatch();
  const { nodes, edges } = useAppSelector(state => state.flow);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  const onConnect = (connection: Connection) => {
    dispatch(connectNodes(connection));
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  };

  const onPaneClick = () => {
    setSelectedNodeId(null);
  };

  const onNodesChange = (changes: NodeChange[]) => {
    dispatch(setNodes(applyNodeChanges(changes, nodes)));
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    dispatch(setEdges(applyEdgeChanges(changes, edges)));
  };

  return (
    <div className="app-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <ControlsPanel />
      <Sidebar
        selectedNode={selectedNode}
        onClose={() => setSelectedNodeId(null)}
      />
    </div>
  );
};

const App = () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);

export default App;
