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
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import authorize from '../api/authorize.js';
import appRoutes from '../routes.js';
import img from '../assets/chat-signup.svg';

const SignupPage = () => {
  const authContext = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const signupValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.signupForm.rangeLength'))
      .max(20, t('errors.signupForm.rangeLength'))
      .required(t('errors.signupForm.required')),
    password: Yup.string()
      .min(6, t('errors.signupForm.minLength', { count: 6 }))
      .required(t('errors.signupForm.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('errors.signupForm.matchingPasswords'))
      .required(t('errors.signupForm.required')),
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
      t,
    }),
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={img} className="col-12" alt="Зарегистрироваться в чате" />
              </div>

              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">{t('signupForm.title')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    ref={inputRef}
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('signupForm.username')}
                    id="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!formik.errors.username || errorMessage}
                  />
                  <Form.Label htmlFor="username">{t('signupForm.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username ?? t('errors.signupForm.userExists')}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('signupForm.password')}
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Label htmlFor="password">{t('signupForm.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder={t('signupForm.confirmPassword')}
                    id="confirm-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.confirmPassword}
                  />
                  <Form.Label htmlFor="confirm-password">{t('signupForm.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword ?? t('errors.signupForm.matchingPasswords') }
                  </Form.Control.Feedback>
                </Form.Floating>

                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                >
                  {t('signupForm.signupButton')}
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
