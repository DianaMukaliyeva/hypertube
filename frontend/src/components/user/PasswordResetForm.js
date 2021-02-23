import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

import useField from '../../hooks/useField';
import userService from '../../services/user';
import sharedFunctions from '../../utils/sharedFunctions';

import InputField from './InputField';
import FormButton from './FormButton';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const password = useField('password', 'password');
  const confirmPassword = useField('password', 'password');
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });

  let data = {};

  useEffect(() => {
    const token = history.location.search.split('=')[1];
    if (token) {
      try {
        const decoded = jwt_decode(token);
        data = {
          userId: decoded.id,
          resetToken: token,
        };
      } catch (err) {
        setAlert({
          show: true,
          message: 'Invalid link, please try again',
          severity: 'error',
        });
      }
    }
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      data = {
        ...data,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };
      await userService.pwdUpdate(data);
    } catch (err) {
      console.log(err.response.data);
      switch (err.response.data.statusCode) {
        case 400:
          sharedFunctions.showErrors(err.response.data.details, {
            password,
            confirmPassword,
          });
          err.response.data.details.map((detail) => {
            if (detail.param === 'userId') {
              setAlert({
                show: true,
                message: 'Link has expired, please try again',
                severity: 'error',
              });
            }
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
