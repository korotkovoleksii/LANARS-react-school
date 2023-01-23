import { IPhoto } from './../../interfaces/photo.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { isShow: boolean; data: IPhoto[] } = { isShow: false, data: [] };

const selectedPhotosSlice = createSlice({
  name: '@@selectedPhotos',
  initialState,
  reducers: {
    clearSelectedPhotos: () => initialState,
    addToSelectedPhotos: (state, action: PayloadAction<IPhoto>) => { state.data.push(action.payload); },
    removeFromSelectedPhotos: (state, action: PayloadAction<IPhoto>) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    },
    toggleIsShow: (state, action: PayloadAction<boolean>) => { state.isShow = action.payload; },
  },
});

export const { clearSelectedPhotos, addToSelectedPhotos, removeFromSelectedPhotos, toggleIsShow } = selectedPhotosSlice.actions;
export default selectedPhotosSlice.reducer;
