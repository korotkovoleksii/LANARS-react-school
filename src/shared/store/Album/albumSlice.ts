import { isFulfilledAction, isRejectedAction, isPendingAction, rejectedAction, pendingAction, fulfilledAction } from './../helpers';
import { IDataSlice } from './../../interfaces/slice.interface';
import { IAlbum } from './../../interfaces/album.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import API from 'core/services/API';

export const retrieveAlbum = createAsyncThunk(
  'album/retrieve',
  async (ids: number[], { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/albums${ids.length > 0 ? `?ids=${ids.join()}` : ''}`) as IAlbum[] | IAlbum;
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAlbum = createAsyncThunk(
  'album/create',
  async (album: Omit<IAlbum, 'id'>, { rejectWithValue }) => {
    try {
      const createdAlbum = await API.post('/api/albums', album) as IAlbum;
      return createdAlbum;
    } catch (error) {
      return rejectWithValue(error);
    }

  }
);

export const updateAlbum = createAsyncThunk(
  'album/update',
  async (album: IAlbum, { rejectWithValue }) => {
    try {
      const updatedAlbum = await API.patch('/api/albums', album) as IAlbum;
      return updatedAlbum;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAlbum = createAsyncThunk(
  'album/delete',
  async (ids: [number, ...number[]], { rejectWithValue }) => {
    try {
      await API.delete(`/api/albums?ids=${ids.join()}`);
      return { ids };
    } catch (error) {
      return rejectWithValue(error);
    }
  }

);

const initialState: IDataSlice<IAlbum> = {
  status: 'idle',
  data: [],
  error: null,
};

const albumSlice = createSlice({
  name: '@@album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrieveAlbum.fulfilled, (state, action) => {
        state.data = Array.isArray(action.payload) ? [...action.payload] : [action.payload];
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const index = state.data.findIndex(album => album.id === action.payload.id);
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => {
          return !action.payload.ids.includes(item.id);
        });
      })
      .addMatcher(isFulfilledAction('album/'), fulfilledAction)
      .addMatcher(isPendingAction('album/'), pendingAction)
      .addMatcher(isRejectedAction('album/'), rejectedAction);

  },

});

export default albumSlice.reducer;


