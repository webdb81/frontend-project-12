import { configureStore } from '@reduxjs/toolkit';
import channelsApi from '../api/channelsApi';
import messagesApi from '../api/messagesApi';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalsReducer from './modalsSlice';

const store = configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    messages: messagesReducer,
    channels: channelsReducer,
    modal: modalsReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messagesApi.middleware),
});

export default store;
