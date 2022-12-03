import { configureStore, combineReducers } from '@reduxjs/toolkit';
import photoReducer from './Photos/photoSlice';
const rootReducer = combineReducers({
  photo:photoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
