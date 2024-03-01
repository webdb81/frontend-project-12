import React, { useEffect, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEditChannelMutation } from '../../api/channelsApi';
import { toastSuccessful } from '../../toasts';
import AuthContext from '../../contexts/AuthContext';

// eslint-disable-next-line
const generateOnSubmit =
  ({
    renameChannel, modalInfo, handleClose, token, toastNotification,
  }) => (values, { resetForm }) => {
    renameChannel({
      token,
      name: values.channelName,
      id: modalInfo.id,
    })
      .then(() => {
        resetForm();
        handleClose();
        toastNotification();
      })
      .catch((err) => console.log(err.message));
  };

const RenameChannel = ({ handleClose, modalInfo, channels }) => {
  const { token } = useContext(AuthContext);

  const inputRef = useRef(null);
  useEffect(() => inputRef.current.select(), []);
  const [renameChannel] = useEditChannelMutation();
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
      channelName: modalInfo.name,
    },
    validationSchema: channelNameSchema,
    onSubmit: generateOnSubmit({
      renameChannel,
      modalInfo,
      handleClose,
      token,
      toastNotification: () => toastSuccessful(t('toast.channel.renamed')),
    }),
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton onHide={handleClose}>
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
              onClick={handleClose}
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
