import { Node, Edge } from 'reactflow';

export interface NodeData {
  label: string;
}

export interface FlowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

export interface SidebarProps {
  selectedNode: Node | null;
  onClose: () => void;
}
