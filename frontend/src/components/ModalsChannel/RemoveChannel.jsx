/* eslint-disable no-shadow */
import React from 'react';
import {
  Modal, Button, Form, FormGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.confirm')}</p>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="d-flex justify-content-end">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="me-2"
            >
              {t('modals.cancelButton')}
            </Button>
            <Button
              type="submit"
              variant="danger"
            >
              {t('modals.removeChannel.submitButton')}
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
