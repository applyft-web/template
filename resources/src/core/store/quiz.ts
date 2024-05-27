import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    age: '',
    currentAge: '',
    goal: [],
    discover: [],
    forgetfulness: '',
    sluggishness: '',
    daily: '',
  },
  reducers: {
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setCurrentAge: (state, action) => {
      state.currentAge = action.payload;
    },
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
    setDiscover: (state, action) => {
      state.discover = action.payload;
    },
    setForgetfulness: (state, action) => {
      state.forgetfulness = action.payload;
    },
    setSluggishness: (state, action) => {
      state.sluggishness = action.payload;
    },
    setDaily: (state, action) => {
      state.daily = action.payload;
    },
  },
});

export const {
  setAge,
  setCurrentAge,
  setGoal,
  setDiscover,
  setForgetfulness,
  setSluggishness,
  setDaily,
} = quizSlice.actions;

export const selectAge = (state: any) => state.quiz.age;
export const selectCurrentAge = (state: any) => state.quiz.currentAge;
export const selectGoal = (state: any) => state.quiz.goal;
export const selectDiscover = (state: any) => state.quiz.discover;
export const selectForgetfulness = (state: any) => state.quiz.forgetfulness;
export const selectSluggishness = (state: any) => state.quiz.sluggishness;
export const selectDaily = (state: any) => state.quiz.daily;

export default quizSlice.reducer;