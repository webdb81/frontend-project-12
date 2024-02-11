import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import initI18n from './i18n';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
initI18n();

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
