import { IDataSlice } from './../../interfaces/slice.interface';
import { IPhoto } from './../../interfaces/photo.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import API from 'core/services/API';

export const retrievePhotos = createAsyncThunk(
  'photos/retrieve',
  async (ids: number[], { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/photos${ids.length > 0 ? `?ids=${ids.join()}` : ''}`) as IPhoto[] | IPhoto;
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createPhoto = createAsyncThunk(
  'photos/create',
  async (photo: Omit<IPhoto, 'id'>, { rejectWithValue }) => {
    try {
      const newEntity = await API.post('/api/photos', photo) as IPhoto;
      return newEntity;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePhoto = createAsyncThunk(
  'photo/update',
  async (photo: IPhoto, { rejectWithValue }) => {
    try {
      const updatedPhoto = await API.patch('/api/photos', photo) as IPhoto;
      return updatedPhoto;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePhoto = createAsyncThunk(
  'photo/delete',
  async (ids: [number, ...number[]], { rejectWithValue }) => {
    try {
      await API.delete(`/api/photos?ids=${ids.join()}`);
      return { ids };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IDataSlice<IPhoto> = {
  status: 'idle',
  data: [],
  error: null,
};

const photoSlice = createSlice({
  name: '@@photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrievePhotos.fulfilled, (state, action) => {
        state.data = Array.isArray(action.payload) ? [...action.payload] : [action.payload];
      })
      .addCase(createPhoto.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        const index = state.data.findIndex(photo => photo.id === action.payload.id);
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => {
          return !action.payload.ids.includes(item.id);
        });
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.status = 'finished';
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.status = 'error';
        state.error = action.payload.message;
      });
  },
});

export default photoSlice.reducer;


