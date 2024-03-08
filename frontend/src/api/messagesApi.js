import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import appRoutes from '../routes.js';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: appRoutes.apiMessages(),
  }),

  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (token) => ({
        url: '',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    sendMessage: builder.mutation({
      query: ({
        token, body, channelId, username,
      }) => ({
        url: '',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: {
          body,
          channelId,
          username,
        },
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi;

export default messagesApi;
