/* eslint-disable no-param-reassign */
import axios from 'axios';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import routes from '../utils/routes.js';

export const fetchContent = createAsyncThunk(
  'channels/fetchContent',
  async (header) => {
    const { data } = await axios.get(routes.usersData(), {
      headers: header,
    });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  defaultChannelId: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,

  reducers: {
    currentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.setOne,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchContent.fulfilled, (state, { payload }) => {
      channelsAdapter.addMany(state, payload.channels);
    });
  },
});

export const {
  currentChannel, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
