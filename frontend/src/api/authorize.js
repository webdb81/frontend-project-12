import axios from 'axios';
import appRoutes from '../routes.js';
import { toastErrors } from '../toasts';

const authorize = ({
  values, navigate, authContext, path, setErrorMessage, t,
}) => {
  axios
    .post(path, values)
    .then(({ data }) => {
      authContext.logIn();
      localStorage.setItem('userId', JSON.stringify(data));
      navigate(appRoutes.chatPage());
    })
    .catch((error) => {
      if (error.message === 'Network Error') {
        toastErrors(t('toast.error.network'));
        return;
      }
      setErrorMessage(true);
      authContext.logOut();
    });
};

export default authorize;
