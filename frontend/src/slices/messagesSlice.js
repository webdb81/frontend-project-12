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
    changeMessage: (state, action) => {
      const { id, newBody } = action.payload;
      state.data.find((e) => e.id === id).body = newBody;
    },
  },
});

export const {
  addMessages, addMessage, changeMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
