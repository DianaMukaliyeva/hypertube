import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode';

import useField from '../../hooks/useField';
import userService from '../../services/user';
import sharedFunctions from '../../utils/sharedFunctions';

import InputField from '../common/InputField';
import FormButton from '../common/FormButton';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const PasswordResetForm = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const focusField = useRef();
  const password = useField('password', 'password', 'reset-password');
  const confirmPassword = useField('password', 'password', 'reset-confirm-password');
  const alert = useAlert();
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = location.search.split('=')[1];
    if (!token) return alert.showError(t('pwRecovery.invalidLink'));

    try {
      const decoded = jwt_decode(token);
      setUser({
        userId: decoded.id,
        resetToken: token,
      });
    } catch (err) {
      alert.showError(t('pwRecovery.invalidLink'));
    }

    focusField.current && focusField.current.focus();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const data = {
        ...user,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      await userService.pwdUpdate(data);
      alert.showSuccess(t('pwRecovery.success'));
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          sharedFunctions.showErrors(err.response.data.details, {
            password,
            confirmPassword,
          });
          err.response.data.details.map((detail) => {
            if (detail.param === 'userId' || detail.param === 'resetToken') {
              alert.showError(t('pwRecovery.invalidLink'));
            }
          });

          break;
        case 500:
          alert.showError(t('error.server'));
          break;
        default:
          alert.showError(t('error.unexpected'));
          break;
      }
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t('pwRecovery.pwResetTitle')}
        </Typography>
        <form className={classes.form} onSubmit={handleClick} noValidate>
          <InputField
            values={password}
            label={t('form.newPassword')}
            autocomplete="new-password"
            required={true}
            inputRef={focusField}
          />
          <InputField
            values={confirmPassword}
            label={t('form.confirmPassword')}
            autocomplete="confirm-password"
            required={true}
          />
          {alert.values.show && (
            <Alert severity={alert.values.severity} onClose={alert.closeAlert}>
              {alert.values.message}
            </Alert>
          )}
          <FormButton name={t('pwRecovery.save')} />
        </form>
      </div>
    </Container>
  );
};

export default PasswordResetForm;
