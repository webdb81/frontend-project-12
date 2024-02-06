/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    data: [],
    currentChannel: '1',
  },
  reducers: {
    addChannels: (state, action) => {
      console.log(action);
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
        state.currentChannel = '1';
      }
      state.data = state.data.filter((e) => e.id !== action.payload.id);
    },
  },
});

export const {
  addChannels, addChannel, renameChannel, updateCurrentChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
