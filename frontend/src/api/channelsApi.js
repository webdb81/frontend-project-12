import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import appRoutes from '../routes.js';

const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: appRoutes.apiChannels(),
    // baseUrl: `${appRoutes.apiChannels()}`,
  }),

  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (token) => ({
        url: '',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    addChannel: builder.mutation({
      query: ({ token, name }) => ({
        url: '',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: {
          name,
        },
      }),
    }),

    editChannel: builder.mutation({
      query: ({ token, name, id }) => ({
        url: `${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
        body: {
          name,
        },
      }),
    }),

    removeChannel: builder.mutation({
      query: ({ token, id }) => ({
        url: `${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;

export default channelsApi;
