const apiPath = '/api/v1/';

export default {
  loginPage: () => '/login',
  chatPage: () => '/',
  notFoundPage: () => '*',
  signupPage: () => '/signup',
  apiLogin: () => `${apiPath}login`,
  apiSignup: () => `${apiPath}signup`,
  apiChannels: () => `${apiPath}channels`,
  apiMessages: () => `${apiPath}messages`,
};
