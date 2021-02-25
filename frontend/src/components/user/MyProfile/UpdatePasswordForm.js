import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import useField from '../../../hooks/useField';
import FormButton from '../FormButton';
import InputField from '../InputField';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const UpdatePasswordForm = () => {
  const currentPassword = useField('password', 'currentPassword');
  const password = useField('password', 'password');
  const confirmPassword = useField('password', 'confirmPassword');
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });
  const classes = useStyles();

  const handleUpdatePw = (event) => {
    event.preventDefault();
    console.log('update password');
  };

  return (
    <>
      <form className={classes.form} noValidate>
        <InputField
          values={currentPassword}
          label="Current password"
          autocomplete="current-password"
        />
        <InputField
          values={password}
          label="New password"
          autocomplete="new-password"
        />
        <InputField
          values={confirmPassword}
          label="Confirm new password"
          autocomplete="new-password"
        />
      </form>
      {alert.show && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, show: false })}
        >
          {alert.message}
        </Alert>
      )}
      <FormButton handleClick={handleUpdatePw} name="Update Password" />
    </>
  );
};

export default UpdatePasswordForm;
