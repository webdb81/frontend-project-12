import { toast } from 'react-toastify';

const toastSuccessful = (text) => {
  toast.success(text, {
    position: 'top-right',
    autoClose: 3000,
    draggable: true,
    progress: undefined,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'light',
  });
};

const toastErrors = (text) => {
  toast.error(text, {
    position: 'top-right',
    autoClose: 3000,
    draggable: true,
    progress: undefined,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'light',
  });
};

export { toastSuccessful, toastErrors };
