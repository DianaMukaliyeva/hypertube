import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

import useField from '../../hooks/useField';
import useModal from '../../hooks/useModal';
import authService from '../../services/auth';
import sharedFunctions from '../../utils/sharedFunctions';

import InputField from './InputField';
import RecoveryLinkForm from '../user/RecoveryLinkForm';
import CustomModal from '../common/CustomModal';
import FormButton from './FormButton';

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
  const email = useField('email', 'email');
  const password = useField('password', 'password');
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });

  const recoveryLinkModal = useModal(<RecoveryLinkForm />);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await authService.login(email.value, password.value);
      const decoded = jwt_decode(localStorage.getItem('token'));
      setUser({ userId: decoded.id, lang: decoded.lang });
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          sharedFunctions.showErrors(err.response.data.details, {
            email,
            password,
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
          Sign in
        </Typography>
        {alert.show && (
          <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })}>
            {alert.message}
          </Alert>
        )}
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
