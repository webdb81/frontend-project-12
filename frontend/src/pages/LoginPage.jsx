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
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import authorize from '../api/authorize.js';
import appRoutes from '../routes.js';
import { toastErrors } from '../toasts';
import img from '../assets/chat-login.svg';

const LoginPage = () => {
  const authContext = useAuth();
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    onSubmit: async (values) => {
      try {
        await authorize({
          values,
          navigate,
          authContext,
          path: appRoutes.apiLogin(),
          setErrorMessage,
          t,
        });
      } catch (error) {
        if (error.message === 'Network Error') {
          toastErrors(t('toast.error.network'));
          return;
        }
        setErrorMessage(true);
        authContext.logOut();
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={img} className="col-12" alt={t('loginForm.title')} />
              </div>

              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">{t('loginForm.title')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    ref={inputRef}
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('loginForm.username')}
                    id="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    isInvalid={errorMessage}
                  />
                  <Form.Label htmlFor="username">{t('loginForm.username')}</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('loginForm.password')}
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={errorMessage}
                  />
                  <Form.Label htmlFor="password">{t('loginForm.password')}</Form.Label>

                  <Form.Control.Feedback type="invalid">
                    {errorMessage && t('errors.loginForm.unauthorized')}
                  </Form.Control.Feedback>
                </Form.Floating>

                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  {t('loginForm.submitButton')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t('loginForm.noAccount')}
                {' '}
                <Link to={appRoutes.signupPage()}>{t('loginForm.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
