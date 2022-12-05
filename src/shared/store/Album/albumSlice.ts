import { IAlbum } from './../../interfaces/album.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import API from 'core/services/API';

type AlbumSliceT = {
  status: 'idle' | 'loading' | 'finished' | 'error';
  data: IAlbum[];

};

export const retrieveAlbum = createAsyncThunk(
  'album/retrieve',
  async () => {
    const res =  await API.get('/api/albums') as IAlbum[];
    return res;
  }
);
export const createAlbum = createAsyncThunk(
  'album/create',
  async (album: Omit<IAlbum, 'id'>) => {
    const createdAlbum  = await API.post('/api/albums', album) as IAlbum;
    return createdAlbum;
  }
);
export const updateAlbum = createAsyncThunk(
  'album/update',
  async (album: IAlbum) => {
    const updatedAlbum = await API.patch('/api/albums',album) as IAlbum;
    return updatedAlbum;
  }
);
export const deleteAlbum = createAsyncThunk(
  'album/delete',
  async (id: number) => {
    await API.delete(`/api/albums?ids=${id}`);
    return {id};
  }
);

const initialState: AlbumSliceT = {
  status: 'idle',
  data: [],
};

const albumSlice = createSlice({
  name: '@@album',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(retrieveAlbum.fulfilled,(state,action)=>{
        state.status = 'finished';
        state.data = action.payload;
      })
      .addCase(createAlbum.fulfilled, (state, action)=>{
        state.status = 'finished';
        state.data.push(action.payload);
      })
      .addCase(updateAlbum.fulfilled, (state, action)=>{
        state.status = 'finished';
        const index = state.data.findIndex(album => album.id === action.payload.id);
        state.data[index]={
          ...state.data[index],
          ...action.payload,
        };
      })
      .addCase(deleteAlbum.fulfilled, (state,action)=>{
        state.status = 'finished';
        state.data = state.data.filter((item)=>{
          return item.id !==action.payload.id;
        });
      });
  },

});

export default albumSlice.reducer;


