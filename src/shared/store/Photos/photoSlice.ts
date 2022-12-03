import { IPhoto } from './../../interfaces/photo.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import API from 'core/services/API';

type PhotoSliceT = {
  status: 'idle' | 'loading' | 'finished' | 'error';
  data: IPhoto[];

};

export const retrievePhotos = createAsyncThunk(
  'photos/retrieve',
  async () => {
    const res =  await API.get('/api/photos') as IPhoto[];
    return res;
  }
);
export const createPhoto = createAsyncThunk(
  'photos/create',
  async (photo: IPhoto) => {
    const createdPhoto  = await API.post('/api/photos', photo) as IPhoto;
    return createdPhoto;
  }
);
export const updatePhoto = createAsyncThunk(
  'photo/update',
  async (photo: IPhoto) => {
    const updatedPhoto = await API.patch('/api/photos',photo) as IPhoto;
    return updatedPhoto;
  }
);
export const deletePhoto = createAsyncThunk(
  'photo/delete',
  async (id: number) => {
    await API.delete(`/api/photos?${id}`);
    return {id};
  }
);

const initialState: PhotoSliceT = {
  status: 'idle',
  data: [],

};

const photoSlice = createSlice({
  name: '@@photo',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(retrievePhotos.fulfilled,(state,action)=>{
        state.status = 'finished';
        state.data = action.payload;
      })
      .addCase(createPhoto.fulfilled, (state, action)=>{
        state.data.push(action.payload);
      })
      .addCase(updatePhoto.fulfilled, (state, action)=>{
        const index = state.data.findIndex(photo => photo.id === action.payload.id);
        state.data[index]={
          ...state.data[index],
          ...action.payload,
        };
      })
      .addCase(deletePhoto.fulfilled, (state,action)=>{
        const index = state.data.findIndex(photo => photo.id === action.payload.id);
        state.data.splice(index,1);
      });


  },

});

export default photoSlice.reducer;


