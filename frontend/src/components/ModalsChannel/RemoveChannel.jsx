/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import {
  Modal, Button, Form, FormGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { closeModal } from '../../slices/modalsSlice';
import { toastSuccessful } from '../../toasts';
import AuthContext from '../../contexts/AuthContext';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const messages = useSelector((state) => state.messages.data);
  const { t } = useTranslation();

  const [removeChannel] = useRemoveChannelMutation();

  const modalInfo = useSelector((state) => state.modal.setModalInfo);
  const targetChannelId = modalInfo.targetId;
  const hideRemoveModal = () => dispatch(closeModal());

  const handleSubmit = (e) => {
    e.preventDefault();
    removeChannel({ token, id: targetChannelId })
      .then(({ data }) => {
        dispatch(closeModal());
        toastSuccessful(t('toast.channel.removed'));
        return data.id;
      })
      .then((id) => messages.filter((e) => e.channelId === id).map((e) => e.id))
      .catch((err) => console.log(err.message));
  };

  return (
    <Modal show centered onHide={hideRemoveModal}>
      <Modal.Header closeButton onHide={hideRemoveModal}>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.confirm')}</p>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="d-flex justify-content-end">
            <Button
              type="button"
              variant="secondary"
              onClick={hideRemoveModal}
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
