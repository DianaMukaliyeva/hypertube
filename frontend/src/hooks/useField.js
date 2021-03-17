import { useState } from 'react';

import schema from '../utils/validationSchema';
import { useTranslation } from 'react-i18next';

const useField = (type, field, id) => {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    value: '',
    helperText: '',
    error: false,
    isValid: '',
    isInvalid: '',
  });

  const onChange = (event) => {
    const newValue = event.target.value;

    schema
      .validate({ [field]: newValue })
      .then(() => {
        setValues({
          value: newValue,
          error: false,
          helperText: newValue ? t('form.correct') : '',
        });
      })
      .catch((err) => {
        setValues({
          value: newValue,
          error: true,
          helperText: t(err.errors),
        });
      });
  };

  const setError = (text) => {
    setValues({ ...values, helperText: t(text), error: true });
  };

  return {
    type,
    onChange,
    helperText: values.helperText,
    value: values.value,
    error: values.error,
    values,
    setValues,
    id,
    setError,
  };
};

export default useField;
