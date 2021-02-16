import React from 'react';
import useField from '../../hooks/useField';

import authService from '../../services/auth';

import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RecoveryLinkForm from '../user/RecoveryLinkForm';

import InputField from './InputField';
import FormButton from './FormButton';
import PropTypes from 'prop-types';

import jwt_decode from 'jwt-decode';
import CustomModal from '../common/CustomModal';
import useModal from '../../hooks/useModal';

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

const LoginForm = ({ setUser }) => {
  const email = useField('email', 'email');
  const password = useField('password', 'password');

  const recoveryLinkModal = useModal(<RecoveryLinkForm />);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await authService.login(email.value, password.value);
      const decoded = jwt_decode(localStorage.getItem('token'));
      setUser({ userId: decoded.id, lang: decoded.lang });
    } catch (exception) {
      email.setValues({
        ...email.values,
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
          <InputField values={email} label="email" />
          <InputField values={password} label="Password" autocomplete="current-password" />
          <FormButton handleClick={handleLogin} name="Sign In" />
          <Box>
            <Link href="#" onClick={recoveryLinkModal.handleClickOpen}>
              Forgot Password?
            </Link>
          </Box>
        </form>
      </div>
      <CustomModal {...recoveryLinkModal} />
    </Container>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
