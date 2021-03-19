import { useState } from 'react';

const useAlert = () => {
  const [values, setValues] = useState({ show: false, severity: '', message: '' });

  const showError = (message, timeout) => {
    setValues({
      show: true,
      severity: 'error',
      message,
    });
    if (timeout) {
      setTimeout(() => {
        setValues({
          show: false,
          severity: '',
          message: '',
        });
      }, timeout);
    }
  };

  const showSuccess = (message, timeout) => {
    setValues({
      show: true,
      severity: 'success',
      message: message,
    });
    if (timeout) {
      setTimeout(() => {
        setValues({
          show: false,
          severity: '',
          message: '',
        });
      }, timeout);
    }
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
