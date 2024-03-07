import axios from 'axios';
import appRoutes from '../routes.js';

const authorize = ({
  values, navigate, authContext, path,
}) => axios
  .post(path, values)
  .then(({ data }) => {
    authContext.logIn(data.token, data.username);
    navigate(appRoutes.chatPage());
  })
  .catch((error) => Promise.reject(error));

export default authorize;
