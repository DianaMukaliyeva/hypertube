import React, { useState } from 'react';
import useField from '../../hooks/useField';

import authService from '../../services/auth';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert } from '@material-ui/lab';

import InputField from './InputField';
import FormButton from './FormButton';
import emptyAvatar from './emptyAvatar.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
		padding: 0,
  },
  imageContainer: {
    width: '100%',
    height: 'auto',
    marginTop: '16px',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

const UpdatePhoto = () => {
  const classes = useStyles();

  return (
    <Container className={classes.column}>
      <Box className={classes.imageContainer}>
        <img
          className={classes.image}
          src={emptyAvatar}
          alt="current profile picture"
        />
      </Box>
    </Container>
  );
};

const UpdateAccountForm = () => {
  const username = useField('text', 'username');
  const firstName = useField('text', 'name');
  const lastName = useField('text', 'name');
  const email = useField('email', 'email');
  const password = useField('password', 'password');
  const confirmPassword = useField('password', 'confirmPassword');
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

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log('update');
  };

  return (
    <div className={classes.column}>
      <form className={classes.form} noValidate>
        <InputField values={username} label="Username" />
        <InputField values={firstName} label="First name" />
        <InputField values={lastName} label="Last name" />
        <InputField values={email} label="email" />
        <InputField
          values={password}
          label="Password"
          autocomplete="new-password"
        />
        <InputField
          values={confirmPassword}
          label="Confirm password"
          autocomplete="new-password"
        />
        <Autocomplete
          id="language"
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
			{alert.show && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, show: false })}
        >
          {alert.message}
        </Alert>
      )}
      <FormButton handleClick={handleUpdate} name="Update Account" />
    </div>
  );
};

const MyProfile = () => {
  const classes = useStyles();

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      await authService.test();
      console.log('test auth');
    } catch (exception) {
      console.log('test error');
    }
  };
  return (
    <Container component="main" className={classes.paper} maxWidth="sm">
      <CssBaseline />
      <Typography component="h1" variant="h5" gutterBottom>
        My profile
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={5}>
          <UpdatePhoto />
        </Grid>
        <Grid item xs={12} sm={7}>
          <UpdateAccountForm />
          <Button variant="outlined" color="secondary" onClick={handleClick}>
            TEST AUTH
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyProfile;
