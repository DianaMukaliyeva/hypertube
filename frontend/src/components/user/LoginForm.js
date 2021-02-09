import React from 'react';
import useField from '../../hooks/useField';

import authService from '../../services/auth';

import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InputField from './InputField';
import CustomButton from './CustomButton';

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

const LoginForm = () => {
  const username = useField('text', 'username');
  const password = useField('password', 'password');

  // const recoveryLinkPopUp = useModal(<RecoveryLinkForm />);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await authService.login(username.value, password.value);
    } catch (exception) {
      username.setValues({
        ...username.values,
        error: true,
        helperText: 'serverError',
      });
      // Alert on error
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <InputField values={username} label="Username" />
          <InputField values={password} label="Password" />
          <CustomButton handleLogin={handleLogin}>Sign In</CustomButton>
          <Box>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
