import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { useAddChannelMutation } from '../../api/channelsApi';

const generateOnSubmit = ({
  handleClose, addNewChannel, token,
}) => (values, { resetForm }) => {
  addNewChannel({
    token,
    name: values.channelName,
  })
    .then(({ data }) => {
      console.log(data);
      resetForm();
      handleClose();
    })
    .catch((err) => console.log(err.message));
};

const AddChannel = ({ handleClose, channels }) => {
  const { token } = JSON.parse(localStorage.getItem('userId'));
  const inputRef = useRef(null);
  useEffect(() => inputRef.current.focus(), []);
  // const [addNewChannel, { isLoading, error }] = useAddChannelMutation();
  const [addNewChannel] = useAddChannelMutation();

  const channelNameSchema = Yup.object().shape({
    channelName: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channels, 'Должно быть уникальным')
      .required('Обязательное поле'),
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
    }),
  });

  return (
    <Modal show centered onHide={handleClose}>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Добавить канал</Modal.Title>
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
              variant="secondary"
              className="me-2"
              onClick={handleClose}
            >
              Отменить
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Отправить
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
