import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, createMigrate } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import checkoutReducer from './checkout';
import errorReducer from './error';
import eventsReducer from './events';
import loaderReducer from './loader';
import plansReducer from './plans';
import signupReducer from './signup';
import appReducer from './app';

const migrations = {
  0: (state: any) => ({
    ...state,
  })
};

const reducers = combineReducers({
  checkout: checkoutReducer,
  error: errorReducer,
  events: eventsReducer,
  loader: loaderReducer,
  plans: plansReducer,
  signup: signupReducer,
  app: appReducer,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['app', 'events', 'plans', 'signup'],
  version: 0,
  migrate: createMigrate(migrations, { debug: false })
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.REACT_APP_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  }
);
export default store;
