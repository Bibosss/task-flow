import { configureStore } from '@reduxjs/toolkit';
import flowReducer from './slices/flowSlice';

export const store = configureStore({
  reducer: {
    flow: flowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
