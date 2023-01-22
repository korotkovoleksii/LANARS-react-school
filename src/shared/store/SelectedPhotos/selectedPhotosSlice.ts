import { IPhoto } from './../../interfaces/photo.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




const initialState: IPhoto[] = [];

const selectedPhotosSlice = createSlice({
  name: '@@selectedPhotos',
  initialState,
  reducers: {
    clearSelectedPhotos: () => initialState,
    addToSelectedPhotos: (state, action: PayloadAction<IPhoto>) => { state.push(action.payload); },
    removeFromSelectedPhotos: (state, action: PayloadAction<IPhoto>) => { return state.filter((item) => item.id !== action.payload.id); },
  },
});

export const { clearSelectedPhotos, addToSelectedPhotos, removeFromSelectedPhotos } = selectedPhotosSlice.actions;
export default selectedPhotosSlice.reducer;
