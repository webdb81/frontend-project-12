import axios from 'axios';

const authorize = ({
  values, navigate, authContext, path, setErrorMessage,
}) => {
  axios
    .post(path, values)
    .then(({ data }) => {
      authContext.logIn();
      localStorage.setItem('userId', JSON.stringify(data));
      navigate('/');
      // console.log(`Authorize: ${data}`);
    })
    .catch(({ response }) => {
      const errorText = response.statusText === 'Conflict' ? 'Пользователь с таким именем уже существует' : 'Неверный логин или пароль';
      setErrorMessage(errorText);
      authContext.logOut();
    });
};

export default authorize;
