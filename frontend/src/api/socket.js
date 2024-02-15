/* eslint-disable no-unused-vars */
import { io } from 'socket.io-client';
import { addMessage } from '../slices/messagesSlice';
import { addChannel, removeChannel, renameChannel } from '../slices/channelsSlice';
import { toastSuccessful } from '../toasts';

const initSockets = (dispatch, t) => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    const {
      body, channelId, username, id,
    } = payload;
    dispatch(addMessage({
      body, channelId, username, id, removable: true,
    }));
  });

  socket.on('newChannel', (payload) => {
    const { name, id, removable } = payload;
    dispatch(addChannel({ name, id, removable }));
    toastSuccessful(t('toast.channel.created'));
  });

  socket.on('removeChannel', (payload) => {
    const { id } = payload;
    dispatch(removeChannel({ id }));
    toastSuccessful(t('toast.channel.removed'));
  });

  socket.on('renameChannel', (payload) => {
    const { id, name } = payload;
    dispatch(renameChannel({ id, name }));
    toastSuccessful(t('toast.channel.renamed'));
  });

  socket.on('removeMessage', (payload) => {
    const { id } = payload;
  });
};

export default initSockets;
