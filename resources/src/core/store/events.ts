import { createSlice } from '@reduxjs/toolkit';

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    eventsData: {},
    analyticsData: {},
  },
  reducers: {
    setEventData: (state, action) => {
      Object.assign(state.eventsData, action.payload);
    },
    setAnalyticsData: (state, action) => {
      Object.assign(state.analyticsData, action.payload);
    },
  },
});

export const { setEventData, setAnalyticsData } = eventsSlice.actions;

export const selectEventsData = (state: any) => state.events.eventsData;
export const selectAnalyticsData = (state: any) => state.events.analyticsData;

export default eventsSlice.reducer;
