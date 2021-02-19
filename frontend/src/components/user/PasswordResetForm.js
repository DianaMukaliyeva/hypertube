import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';

import useField from '../../hooks/useField';
import userService from '../../services/user';
import sharedFunctions from '../../utils/sharedFunctions';

import InputField from './InputField';
import FormButton from './FormButton';

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

const PasswordResetForm = () => {
  const password = useField('password', 'password');
  const confirmPassword = useField('password', 'password');
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      await userService.pwdUpdate();
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          sharedFunctions.showErrors(err.response.data.details, {
            password,
            confirmPassword,
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
          Password Reset
        </Typography>
        {alert.show && (
          <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })}>
            {alert.message}
          </Alert>
        )}
        <form className={classes.form} noValidate>
          <InputField values={password} label="New password" autocomplete="current-password" />
          <InputField
            values={confirmPassword}
            label="Confirm password"
            autocomplete="current-password"
          />
          <FormButton handleClick={handleClick} name="Save" />
        </form>
      </div>
    </Container>
  );
};

// PasswordResetForm.propTypes = {
//   setUser: PropTypes.func.isRequired,
// };

export default PasswordResetForm;
