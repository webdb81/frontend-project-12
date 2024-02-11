import axios from 'axios';
import { toastErrors } from '../toasts';

const authorize = ({
  values, navigate, authContext, path, setErrorMessage, t,
}) => {
  axios
    .post(path, values)
    .then(({ data }) => {
      authContext.logIn();
      localStorage.setItem('userId', JSON.stringify(data));
      navigate('/');
      // console.log(`Authorize: ${data}`);
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
