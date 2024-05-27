import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    show: false,
    message: '',
  },
  reducers: {
    setShowLoader: (state, action) => {
      const show: boolean | string = action.payload;
      if (typeof show === 'string') {
        state.show = true;
        state.message = show;
      } else {
        state.show = show;
        state.message = '';
      }
    },
  },
});

export const { setShowLoader } = loaderSlice.actions;

export const selectLoader = (state: any) => state.loader;

export default loaderSlice.reducer;