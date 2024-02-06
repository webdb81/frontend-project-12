import React, { useEffect, useRef, useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import authorize from '../api/authorize.js';
import appRoutes from '../routes.js';
import img from '../assets/chat-login.svg';

const LoginPage = () => {
  const authContext = useAuth();
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: (values) => authorize({
      values,
      navigate,
      authContext,
      path: appRoutes.apiLogin(),
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
                <Image src={img} className="col-12" alt="Войти в чат" />
              </div>

              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">Войти в чат</h1>
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
                    isInvalid={errorMessage}
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
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
                    isInvalid={errorMessage}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>

                  {errorMessage && <p>{errorMessage}</p>}
                </Form.Floating>

                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  Войти
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет aккаунта? </span>
                <Link to={appRoutes.signupPage()}>Создать аккаунт</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
