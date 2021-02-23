import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import authService from '../../services/auth';
import useField from '../../hooks/useField';

import InputField from './InputField';
import FormButton from './FormButton';
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
  const email = useField('email', 'email');
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });

  const handleForgotPwd = async (event) => {
    event.preventDefault();
    try {
      await authService.recoveryLink(email.value);
      setAlert({
        show: true,
        message: 'Check your email for further instructions',
        severity: 'success',
      });
    } catch (err) {
      // console.log('err', err.response.data);
      switch (err.response.data.statusCode) {
        case 400:
          sharedFunctions.showErrors(err.response.data.details, {
            email,
          });
          break;
        case 500:
          setAlert({
            show: true,
            message: 'Server error',
            severity: 'error',
          });
          break;
        default:
          setAlert({
            show: true,
            message: 'Oops.. somthing went completely wrong',
            severity: 'error',
          });
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
          Recovery link
        </Typography>
        {alert.show && (
          <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })}>
            {alert.message}
          </Alert>
        )}
        <form className={classes.form} noValidate>
          <InputField values={email} label="email" />
          <FormButton handleClick={handleForgotPwd} name="Send" />
        </form>
        <div>We will send a recover link to your email</div>
      </div>
    </Container>
  );
};

export default RecoveryLinkForm;
