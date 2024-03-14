/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    data: [],
  },
  reducers: {
    addMessages: (state, action) => {
      state.data = [...action.payload];
    },
    addMessage: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const {
  addMessages, addMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
