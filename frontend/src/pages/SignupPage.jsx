import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import authorize from '../api/authorize.js';
import appRoutes from '../routes.js';
import img from '../assets/chat-signup.svg';

const SignupPage = () => {
  const authContext = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const signupValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => authorize({
      values,
      navigate,
      authContext,
      path: appRoutes.apiSignup(),
      setErrorMessage,
    }),
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={7} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={img} className="col-12" alt="Зарегистрироваться в чате" />
              </div>

              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    ref={inputRef}
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Имя пользователя"
                    id="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!formik.errors.username || errorMessage}
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username ?? errorMessage}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="Подтвердите пароль"
                    id="confirm-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.confirmPassword}
                  />
                  <Form.Label htmlFor="confirm-password">Подтвердите пароль</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Floating>

                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
