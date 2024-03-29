import React, { useEffect, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalsSlice';
import { useAddChannelMutation } from '../../api/channelsApi';
import { updateCurrentChannel } from '../../slices/channelsSlice';
import showToast from '../../toasts';
import AuthContext from '../../contexts/AuthContext';

const AddChannel = ({ channels }) => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  useEffect(() => inputRef.current.focus(), []);
  const [addNewChannel] = useAddChannelMutation();
  const { t } = useTranslation();

  const hideAddModal = () => dispatch(closeModal());

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
    onSubmit: (values, { resetForm }) => {
      addNewChannel({
        token,
        name: values.channelName,
      })
        .then(({ data }) => {
          resetForm();
          dispatch(closeModal());
          dispatch(updateCurrentChannel({ id: data.id }));
          showToast(t('toast.channel.created'), 'success');
        })
        .catch((err) => console.log(err.message));
    },
  });

  return (
    <Modal show centered onHide={hideAddModal}>
      <Modal.Header closeButton onHide={hideAddModal}>
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
              onClick={hideAddModal}
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
