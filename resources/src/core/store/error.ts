import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    show: false,
    message: '',
  },
  reducers: {
    setShowError: (state, action) => {
      const show: boolean | string = action.payload;
      if (typeof show === 'string') {
        state.show = true;
        state.message = show;
      } else {
        state.show = show;
        state.message = '';
      }
    }
  },
});

export const { setShowError } = errorSlice.actions;

export const selectError = (state: any) => state.error;

export default errorSlice.reducer;