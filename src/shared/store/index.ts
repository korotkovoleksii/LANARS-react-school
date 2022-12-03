import { configureStore, combineReducers } from '@reduxjs/toolkit';
import photoReducer from './Photos/photoSlice';
import albumReducer from './Album/albumSlice';
const rootReducer = combineReducers({
  photo:photoReducer,
  album:albumReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
