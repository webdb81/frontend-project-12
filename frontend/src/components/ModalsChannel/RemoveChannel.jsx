/* eslint-disable no-shadow */
import React from 'react';
import {
  Modal, Button, Form, FormGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { useRemoveMessageMutation } from '../../api/messagesApi';

const generateOnSubmit = ({
  removeChannel, removeMessage, handleClose, modalInfo, token, messages,
}) => (e) => {
  e.preventDefault();
  removeChannel({
    token,
    id: modalInfo.id,
  })
    .then(({ data }) => {
      handleClose();
      return data.id;
    })
    .then((id) => messages.filter((e) => e.channelId === id).map((e) => e.id))
    .then((messagesToDelete) => {
      messagesToDelete.forEach((msg) => removeMessage({ token, id: msg }));
    })
    .catch((err) => console.log(err.message));
};

const RemoveChannel = ({ handleClose, modalInfo }) => {
  const { token } = JSON.parse(localStorage.getItem('userId'));
  const messages = useSelector((state) => state.messages.data);

  const [
    removeChannel,
    // { isLoading: isRemovingChannelLoading, error: removingChannelError },
  ] = useRemoveChannelMutation();
  const [
    removeMessage,
    // { isLoading: isRemovingMessageLoading, error: removingMessageError },
  ] = useRemoveMessageMutation();
  const handleSubmit = generateOnSubmit({
    removeChannel,
    removeMessage,
    handleClose,
    modalInfo,
    messages,
    token,
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="d-flex justify-content-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="me-2"
            >
              Отменить
            </Button>
            <Button
              type="submit"
              variant="danger"
            >
              Удалить
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
