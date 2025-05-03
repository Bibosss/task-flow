import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge, Connection } from 'reactflow';

interface NodeData {
  label: string;
}

interface FlowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

const loadFromLocalStorage = (): FlowState => {
  try {
    const saved = localStorage.getItem('flow-state');
    return saved ? JSON.parse(saved) : { nodes: [], edges: [] };
  } catch {
    return { nodes: [], edges: [] };
  }
};

const saveState = (state: FlowState) => {
  try {
    localStorage.setItem('flow-state', JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
};

const initialState: FlowState = loadFromLocalStorage();

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node<NodeData>>) => {
      console.log('Додаємо вузол:', action.payload);
      state.nodes.push(action.payload);
      saveState(state);
    },
    updateNode: (
      state,
      action: PayloadAction<{ id: string; data: Partial<NodeData> }>
    ) => {
      const node = state.nodes.find(n => n.id === action.payload.id);
      if (node) {
        node.data = { ...node.data, ...action.payload.data };
        saveState(state);
      }
    },
    connectNodes: (state, action: PayloadAction<Connection>) => {
      const { source, target } = action.payload;
      if (!source || !target) return;
      const newEdge: Edge = {
        id: `edge-${source}-${target}`,
        source,
        target,
      };
      state.edges.push(newEdge);
      saveState(state);
    },
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
      saveState(state);
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
      saveState(state);
    },
  },
});

export const { addNode, updateNode, connectNodes, setNodes, setEdges } =
  flowSlice.actions;
export default flowSlice.reducer;
