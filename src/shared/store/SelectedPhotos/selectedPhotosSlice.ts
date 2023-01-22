import { IPhoto } from './../../interfaces/photo.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




const initialState: IPhoto[] = [];

const selectedPhotosSlice = createSlice({
  name: '@@photo',
  initialState,
  reducers: {
    clearSelectedPhoto: () => initialState,
    addToSelectedPhoto: (state, action: PayloadAction<IPhoto>) => { state.push(action.payload); },
    removeFromSelectedPhoto: (state, action: PayloadAction<IPhoto>) => { return state.filter((item) => item.id !== action.payload.id); },
  },
});

export const { clearSelectedPhoto, addToSelectedPhoto, removeFromSelectedPhoto } = selectedPhotosSlice.actions;
export default selectedPhotosSlice.reducer;
