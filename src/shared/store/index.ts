import { configureStore, combineReducers } from '@reduxjs/toolkit';
import photoReducer from './Photos/photoSlice';
import albumReducer from './Album/albumSlice';
import selectedPhotosSlice from './SelectedPhotos/selectedPhotosSlice';

const rootReducer = combineReducers({
  photo: photoReducer,
  album: albumReducer,
  selectedPhotos: selectedPhotosSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
