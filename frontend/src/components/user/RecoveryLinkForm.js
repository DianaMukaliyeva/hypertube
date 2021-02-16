import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import authService from '../../services/auth';
import useField from '../../hooks/useField';

import InputField from './InputField';
import FormButton from './FormButton';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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

  const handleForgotPwd = async (event) => {
    event.preventDefault();
    try {
      await authService.recoveryLink(email.value);
    } catch (exception) {
      // TO DO show errors
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
