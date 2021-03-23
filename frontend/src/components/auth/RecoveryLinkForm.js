import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import authService from '../../services/auth';
import useField from '../../hooks/useField';

import InputField from '../common/InputField';
import FormButton from '../common/FormButton';
import sharedFunctions from '../../utils/sharedFunctions';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';

// TO DO: move to styles
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

const RecoveryLinkForm = () => {
  const { t } = useTranslation();
  const focusField = useRef();
  const email = useField('email', 'email', 'forgot-email');
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });

  const handleForgotPwd = async (event) => {
    event.preventDefault();
    try {
      await authService.recoveryLink(email.value);
      setAlert({
        show: true,
        message: t('pwRecovery.checkEmail'),
        severity: 'success',
      });
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          sharedFunctions.showErrors(err.response.data.details, {
            email,
          });
          break;
        case 500:
          setAlert({
            show: true,
            message: t('error.server'),
            severity: 'error',
          });
          break;
        default:
          setAlert({
            show: true,
            message: t('error.unexpected'),
            severity: 'error',
          });
          break;
      }
    }
  };

  useEffect(() => {
    focusField.current && focusField.current.focus();
  }, []);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t('pwRecovery.title')}
        </Typography>

        <form className={classes.form} onSubmit={handleForgotPwd} noValidate>
          <InputField
            values={email}
            label={t('form.email')}
            required={true}
            inputRef={focusField}
          />
          {alert.show && (
            <Alert
              severity={alert.severity}
              onClose={() => setAlert({ ...alert, show: false })}
            >
              {alert.message}
            </Alert>
          )}
          <FormButton name={t('pwRecovery.send')} />
        </form>
        <div>{t('pwRecovery.helper')}</div>
      </div>
    </Container>
  );
};

export default RecoveryLinkForm;
