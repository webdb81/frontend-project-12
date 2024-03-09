/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const defaultChannelId = '1';

const initialState = {
  data: [],
  currentChannel: defaultChannelId,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      state.data = [...action.payload];
    },
    addChannel: (state, action) => {
      state.data.push(action.payload);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      state.data.find((e) => e.id === id).name = name;
    },
    updateCurrentChannel: (state, action) => {
      state.currentChannel = action.payload.id;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      if (state.currentChannel === id) {
        state.currentChannel = defaultChannelId;
      }
      state.data = state.data.filter((e) => e.id !== action.payload.id);
    },
  },
});

export const {
  addChannels, addChannel, renameChannel, updateCurrentChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
