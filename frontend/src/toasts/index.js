import { toast } from 'react-toastify';

const defaultToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  draggable: true,
  progress: undefined,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'light',
};

const toastTypes = {
  success: (text) => toast.success(text, defaultToastOptions),
  error: (text) => toast.error(text, defaultToastOptions),
};

const showToast = (text, type = 'success') => {
  const handleToast = toastTypes[type];
  if (handleToast) {
    handleToast(text);
  } else {
    console.error(`Тип уведомления "${type}" не поддерживается.`);
  }
};

export default showToast;
