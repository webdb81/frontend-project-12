import React, { useEffect, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { useAddChannelMutation } from '../../api/channelsApi';
import { updateCurrentChannel } from '../../slices/channelsSlice';
import { toastSuccessful } from '../../toasts';
import AuthContext from '../../contexts/AuthContext';

const generateOnSubmit = ({
  handleClose, addNewChannel, token, toastNotification, dispatch,
}) => (values, { resetForm }) => {
  addNewChannel({
    token,
    name: values.channelName,
  })
    .then(({ data }) => {
      resetForm();
      handleClose();
      dispatch(updateCurrentChannel({ id: data.id }));
      toastNotification();
    })
    .catch((err) => console.log(err.message));
};

const AddChannel = ({ handleClose, channels }) => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  useEffect(() => inputRef.current.focus(), []);
  const [addNewChannel] = useAddChannelMutation();
  const { t } = useTranslation();

  const channelNameSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, t('errors.modalsValidation.rangeLength'))
      .max(20, t('errors.modalsValidation.rangeLength'))
      .notOneOf(channels, t('errors.modalsValidation.unique'))
      .required(t('errors.modalsValidation.required')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelNameSchema,
    onSubmit: generateOnSubmit({
      handleClose,
      addNewChannel,
      token,
      toastNotification: () => toastSuccessful(t('toast.channel.created')),
      dispatch,
    }),
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
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
              variant="secondary"
              className="me-2"
              onClick={handleClose}
            >
              {t('modals.cancelButton')}
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {t('modals.submitButton')}
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
