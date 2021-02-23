import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useField from '../../hooks/useField';
import userService from '../../services/user';
import sharedFunctions from '../../utils/sharedFunctions';
import InputField from './InputField';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert } from '@material-ui/lab';

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

const MyProfile = ({ user }) => {
  const username = useField('text', 'username');
  const firstName = useField('text', 'name');
  const lastName = useField('text', 'name');
  const email = useField('email', 'email');
  const password = useField('password', 'password');
  const confirmPassword = useField('password', 'confirmPassword');
  const [lang, setLang] = useState({ label: '', code: '' });
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const [userData, setUserData] = useState({});
  const classes = useStyles();

  const langOptions = [
    { label: 'English', code: 'en' },
    { label: 'German', code: 'de' },
    { label: 'Finnish', code: 'fi' },
    { label: 'Russian', code: 'ru' },
  ];

  useEffect(() => {
    userService
      .get(user.userId)
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const data = {};
      if (username.value) data.username = username.value;
      if (email.value) data.email = email.value;
      if (firstName.value) data.firstname = firstName.value;
      if (lastName.value) data.lastname = lastName.value;
      if (password.value) data.password = password.value;
      if (confirmPassword.value) data.confirmPassword = confirmPassword.value;
      if (lang) data.language = lang;
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
    <div>
      {alert.show && (
        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })}>
          {alert.message}
        </Alert>
      )}
      <Grid item xs={6}>
        <form className={classes.form} noValidate>
          <InputField values={username} label={userData.username} required={false} />
          <InputField values={firstName} label={userData.firstname} required={false} />
          <InputField values={lastName} label={userData.lastname} required={false} />
          <InputField values={email} label={userData.email} required={false} />
          <InputField
            values={password}
            label="password"
            autocomplete="new-password"
            required={false}
          />
          <InputField
            values={confirmPassword}
            label="confirm password"
            autocomplete="new-password"
            required={false}
          />
          <Autocomplete
            id="language"
            value={lang}
            // value={userData.language}
            options={langOptions}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => option.value === value.value}
            className={classes.select}
            onChange={(event, value) => {
              if (value !== null) setLang(value);
            }}
            renderInput={(params) => (
              <TextField required {...params} label="Select language" variant="outlined" />
            )}
          />
        </form>
      </Grid>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        Save
      </Button>
    </div>
  );
};

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MyProfile;
