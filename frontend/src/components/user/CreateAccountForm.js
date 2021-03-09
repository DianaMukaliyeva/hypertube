import React, { useState } from 'react';
import useField from '../../hooks/useField';

import userService from '../../services/user';
import sharedFunctions from '../../utils/sharedFunctions';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert } from '@material-ui/lab';

import InputField from './InputField';
import FormButton from './FormButton';
import OmniAuthLogin from './OmniAuthLogin';

// TO DO move to styles
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
  select: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const CreateAccountForm = () => {
  const username = useField('text', 'username', 'create-username');
  const firstName = useField('text', 'name', 'create-firstname');
  const lastName = useField('text', 'name', 'create-lastname');
  const email = useField('email', 'email', 'create-email');
  const password = useField('password', 'password', 'create-password');
  const confirmPassword = useField(
    'password',
    'confirmPassword',
    'create-confirm-password'
  );
  const [lang, setLang] = useState({ label: '', code: '' });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });

  const langOptions = [
    { label: 'English', code: 'en' },
    { label: 'German', code: 'de' },
    { label: 'Finnish', code: 'fi' },
    { label: 'Russian', code: 'ru' },
  ];

  const classes = useStyles();

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const data = {
        username: username.value,
        email: email.value,
        firstname: firstName.value,
        lastname: lastName.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        language: lang.code,
      };
      await userService.create(data);
      setAlert({
        show: true,
        message: 'Account successfully created',
        severity: 'success',
      });
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          sharedFunctions.showErrors(err.response.data.details, {
            username,
            firstName,
            lastName,
            email,
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create account
        </Typography>
        {alert.show && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, show: false })}
          >
            {alert.message}
          </Alert>
        )}

        <OmniAuthLogin />

        <form className={classes.form} noValidate>
          <InputField values={username} label="Username" required={true} />
          <InputField values={firstName} label="First name" required={true} />
          <InputField values={lastName} label="Last name" required={true} />
          <InputField values={email} label="email" required={true} />
          <InputField
            values={password}
            label="Password"
            autocomplete="new-password"
            required={true}
          />
          <InputField
            values={confirmPassword}
            label="Confirm password"
            autocomplete="new-password"
            required={true}
          />
          <Autocomplete
            id="language"
            required={true}
            value={lang}
            options={langOptions}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => option.value === value.value}
            className={classes.select}
            onChange={(event, value) => {
              if (value !== null) setLang(value);
            }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Select language"
                variant="outlined"
              />
            )}
          />
        </form>
        <FormButton handleClick={handleCreate} name="Create Account" />
      </div>
    </Container>
  );
};

export default CreateAccountForm;
