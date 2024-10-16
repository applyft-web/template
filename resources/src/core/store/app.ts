import { createSlice } from '@reduxjs/toolkit';
import { defaultFlow } from '../router';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    flow: defaultFlow,
    timerSeconds: null,
  },
  reducers: {
    setFlow: (state, action) => {
      state.flow = action.payload;
    },
    setTimerSeconds: (state, action) => {
      state.timerSeconds = action.payload;
    },
  },
});

export const { setFlow, setTimerSeconds } = appSlice.actions;

export const selectFlow = (state: any) => state.app.flow;
export const selectTimerSeconds = (state: any) => state.app.timerSeconds;

export default appSlice.reducer;