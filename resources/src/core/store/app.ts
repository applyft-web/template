import { createSlice } from '@reduxjs/toolkit';
import { defaultFlow } from '../router';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    flow: defaultFlow,
  },
  reducers: {
    setFlow: (state, action) => {
      state.flow = action.payload;
    },
  },
});

export const { setFlow } = appSlice.actions;

export const selectFlow = (state: any) => state.app.flow;

export default appSlice.reducer;