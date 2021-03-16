import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

import useField from '../../hooks/useField';
import useModal from '../../hooks/useModal';
import authService from '../../services/auth';

import InputField from '../common/InputField';
import RecoveryLinkForm from './RecoveryLinkForm';
import CustomModal from '../common/CustomModal';
import FormButton from '../common/FormButton';
import OmniAuthLogin from './OmniAuthLogin';

import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';

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
  const history = useHistory();
  const email = useField('email', 'loginEmail', 'login-email');
  const password = useField('password', 'loginPassword', 'login-password');
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });

  const recoveryLinkModal = useModal(<RecoveryLinkForm />);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email.value === '') {
      email.setValues({
        ...email.values,
        helperText: 'required',
        error: true,
      });
      return;
    }

    if (password.value === '') {
      password.setValues({
        ...password.values,
        helperText: 'required',
        error: true,
      });
      return;
    }

    try {
      await authService.login(email.value, password.value);
      const decoded = jwt_decode(localStorage.getItem('token'));
      setUser({ userId: decoded.id, lang: decoded.lang });
      history.push('/');
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          setAlert({
            show: true,
            message: 'Invalid email or password',
            severity: 'error',
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
          Login
        </Typography>

        <OmniAuthLogin />

        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <InputField values={email} label="email" required={true} />
          <InputField
            values={password}
            label="Password"
            autocomplete="current-password"
            required={true}
          />
          {alert.show && (
            <Alert
              severity={alert.severity}
              onClose={() => setAlert({ ...alert, show: false })}
            >
              {alert.message}
            </Alert>
          )}
          <FormButton name="Login" />
        </form>
        <Box>
          <Link href="#" onClick={recoveryLinkModal.handleClickOpen}>
            Forgot Password?
          </Link>
        </Box>
      </div>
      <CustomModal {...recoveryLinkModal} />
    </Container>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
