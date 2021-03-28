import { useState } from 'react';

const useAlert = () => {
  const [values, setValues] = useState({ show: false, severity: '', message: '' });

  const showError = (message) => {
    setValues({
      show: true,
      severity: 'error',
      message,
    });
  };

  const showSuccess = (message) => {
    setValues({
      show: true,
      severity: 'success',
      message: message,
    });
  };

  const closeAlert = () => {
    setValues({
      show: false,
      severity: 'info',
      message: '',
    });
  };

  return {
    values,
    showError,
    showSuccess,
    closeAlert,
  };
};

export default useAlert;
