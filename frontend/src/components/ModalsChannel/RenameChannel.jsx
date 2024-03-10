import React, { useEffect, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEditChannelMutation } from '../../api/channelsApi';
import { closeModal } from '../../slices/modalsSlice';
import { toastSuccessful } from '../../toasts';
import AuthContext from '../../contexts/AuthContext';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);

  const inputRef = useRef(null);
  useEffect(() => inputRef.current.select(), []);
  const [renameChannel] = useEditChannelMutation();
  const { t } = useTranslation();

  const channelsList = useSelector((state) => state.channels.data);
  const modalInfo = useSelector((state) => state.modal.setModalInfo);
  const renamedChannelId = modalInfo.targetId;
  const renamedChannel = channelsList.find((item) => item.id === renamedChannelId);
  const channelName = channelsList.map((item) => item.name);
  const hideRenameModal = () => dispatch(closeModal());

  const channelNameSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, t('errors.modalsValidation.rangeLength'))
      .max(20, t('errors.modalsValidation.rangeLength'))
      .notOneOf(channelName, t('errors.modalsValidation.unique'))
      .required(t('errors.modalsValidation.required')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: renamedChannel ? renamedChannel.name : '',
    },
    validationSchema: channelNameSchema,
    onSubmit: (values, { resetForm }) => {
      renameChannel({
        token,
        name: values.channelName,
        id: renamedChannelId,
      })
        .then(() => {
          resetForm();
          dispatch(closeModal());
          toastSuccessful(t('toast.channel.renamed'));
        })
        .catch((err) => console.log(err.message));
    },
  });

  return (
    <Modal show centered onHide={hideRenameModal}>
      <Modal.Header closeButton onHide={hideRenameModal}>
        <Modal.Title>{t('modals.renameChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              name="channelName"
              id="channelName"
              className="mb-2"
              required
              value={formik.values.channelName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.channelName}
            />
            <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
          </FormGroup>
          <FormGroup className="d-flex justify-content-end">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={hideRenameModal}
            >
              {t('modals.cancelButton')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modals.submitButton')}
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
