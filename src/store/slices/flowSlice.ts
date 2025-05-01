import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from 'reactflow';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: FlowState = {
  nodes: [],
  edges: [],
  status: 'idle',
};

export const fetchInitialFlow = createAsyncThunk(
  'flow/fetchInitialFlow',
  async () => {
    const savedFlow = localStorage.getItem('flow');
    return savedFlow ? JSON.parse(savedFlow) : { nodes: [], edges: [] };
  }
);

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<Node>) => {
      const index = state.nodes.findIndex(n => n.id === action.payload.id);
      if (index !== -1) state.nodes[index] = action.payload;
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInitialFlow.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchInitialFlow.fulfilled, (state, action) => {
        state.nodes = action.payload.nodes;
        state.edges = action.payload.edges;
        state.status = 'succeeded';
      });
  },
});

export const { addNode, updateNode, addEdge } = flowSlice.actions;
export default flowSlice.reducer;
