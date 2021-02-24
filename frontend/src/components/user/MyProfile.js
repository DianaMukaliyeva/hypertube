import React, { useState, useEffect } from 'react';
import useField from '../../hooks/useField';
import PropTypes from 'prop-types';

import userService from '../../services/user';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert } from '@material-ui/lab';

import InputField from './InputField';
import FormButton from './FormButton';
import emptyAvatar from './emptyAvatar.png';

// todo remove when done
import Button from '@material-ui/core/Button';
import CustomModal from '../common/CustomModal';
import useModal from '../../hooks/useModal';
import UserProfile from './UserProfile';

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

const UpdatePhoto = ({ user }) => {
  const [photo, setPhoto] = useState(user.avatarBase64);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });
  const classes = useStyles();

  console.log('🚀  log setPhoto just to do something with it', setPhoto);
  return (
    <>
      <Box className={classes.imageContainer}>
        <img
          className={classes.image}
          src={photo || emptyAvatar}
          alt="current profile picture"
        />
      </Box>
      {alert.show && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, show: false })}
        >
          {alert.message}
        </Alert>
      )}
    </>
  );
};

UpdatePhoto.propTypes = {
  user: PropTypes.object.isRequired,
};

const UpdatePasswordForm = () => {
  const currentPassword = useField('password', 'currentPassword');
  const password = useField('password', 'password');
  const confirmPassword = useField('password', 'confirmPassword');
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });
  const classes = useStyles();

  const handleUpdatePw = (event) => {
    event.preventDefault();
    console.log('update password');
  };

  return (
    <>
      <form className={classes.form} noValidate>
        <InputField
          values={currentPassword}
          label="Current password"
          autocomplete="current-password"
        />
        <InputField
          values={password}
          label="New password"
          autocomplete="new-password"
        />
        <InputField
          values={confirmPassword}
          label="Confirm new password"
          autocomplete="new-password"
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
      <FormButton handleClick={handleUpdatePw} name="Update Password" />
    </>
  );
};

const UpdateInformationForm = () => {
  const username = useField('text', 'username');
  const firstName = useField('text', 'name');
  const lastName = useField('text', 'name');
  const email = useField('email', 'email');
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
    console.log('update information');
  };

  return (
    <>
      <form className={classes.form} noValidate>
        <InputField values={username} label="Username" />
        <InputField values={firstName} label="First name" />
        <InputField values={lastName} label="Last name" />
        <InputField values={email} label="email" />
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
      <FormButton handleClick={handleUpdate} name="Update Information" />
    </>
  );
};

const MyProfile = ({ user, setUser }) => {
  console.log('🚀  logging setUser just to do something with it', setUser);

  const [userInformation, setUserInformation] = useState({});
  const classes = useStyles();

  // todo: remove when done
  const userProfileModal = useModal(<UserProfile userId={user.userId} />);

  console.log(
    '🚀 ~ file: MyProfile.js ~ line 185 ~ MyProfile ~ userInformation',
    userInformation
  );

  useEffect(async () => {
    try {
      const info = await userService.get(user.userId);
      setUserInformation(info);
    } catch (exception) {
      console.log('Error getting user information at user profile');
    }
  }, [user.userId]);

  return (
    <Container component="main" className={classes.paper} maxWidth="sm">
      <CssBaseline />
      <Typography component="h2" variant="h4" gutterBottom>
        My profile
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} sm={5} className={classes.column}>
          <UpdatePhoto user={userInformation} />

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={userProfileModal.handleClickOpen}
          >
            User Profile
          </Button>
        </Grid>
        <Grid item xs={12} sm={7} className={classes.column}>
          <UpdateInformationForm />
          <UpdatePasswordForm />
        </Grid>
      </Grid>
      <CustomModal {...userProfileModal} />
    </Container>
  );
};

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default MyProfile;
