import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { useEditChannelMutation } from '../../api/channelsApi';

// eslint-disable-next-line
const generateOnSubmit =
  (renameChannel, modalInfo, handleClose, token) => (values, { resetForm }) => {
    renameChannel({
      token,
      name: values.channelName,
      id: modalInfo.id,
    })
      // .then((_) => {
      .then(() => {
        resetForm();
        handleClose();
      })
      .catch((err) => console.log(err.message));
  };

const RenameChannel = ({ handleClose, modalInfo, channels }) => {
  const { token } = JSON.parse(localStorage.getItem('userId'));

  const inputRef = useRef(null);
  useEffect(() => inputRef.current.select(), []);
  // const [renameChannel, { isLoading, error }] = useEditChannelMutation();
  const [renameChannel] = useEditChannelMutation();

  const channelNameSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channels, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      channelName: modalInfo.name,
    },
    validationSchema: channelNameSchema,
    onSubmit: generateOnSubmit(renameChannel, modalInfo, handleClose, token),
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputRef}
              name="channelName"
              className="mb-2"
              required
              value={formik.values.channelName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // data-testid="input-channelName"
              isInvalid={!!formik.errors.channelName}
            />
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
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
