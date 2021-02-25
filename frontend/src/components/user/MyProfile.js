import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert } from '@material-ui/lab';

import useField from '../../hooks/useField';
import userService from '../../services/user';
import sharedFunctions from '../../utils/sharedFunctions';
import UpdatePhoto from './UpdatePhoto';
import InputField from './InputField';
import FormButton from './FormButton';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  select: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

// todo: add translations

const MyProfile = ({ user, setUser }) => {
  // todo remove when done
  console.log('🚀  logging setUser just to do something with it', setUser);

  const [userData, setUserData] = useState({ language: '' });

  const username = useField('text', 'username');
  const firstName = useField('text', 'name');
  const lastName = useField('text', 'name');
  const email = useField('email', 'email');
  const oldPassword = useField('password', 'password');
  const password = useField('password', 'password');
  const confirmPassword = useField('password', 'confirmPassword');
  const [lang, setLang] = useState({ label: '', code: '' });
  const [avatar, setAvatar] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });
  const classes = useStyles();

  const langOptions = [
    { label: 'English', code: 'en' },
    { label: 'German', code: 'de' },
    { label: 'Finnish', code: 'fi' },
    { label: 'Russian', code: 'ru' },
  ];

  // todo: remove when done
  const userProfileModal = useModal(<UserProfile userId={user.userId} />);

  /*console.log(
    '🚀 ~ file: MyProfile.js ~ line 185 ~ MyProfile ~ userInformation',
    userInformation
  );*/

  useEffect(() => {
    userService
      .get(user.userId)
      .then((res) => {
        // const langNew = langOptions.find((lang) => lang.code === res.language);
        setLang(langOptions.find((lang) => lang.code === res.language));
        setUserData(res);
      })
      .catch((err) => {
        switch (err.response.data.statusCode) {
          case 401:
            setAlert({
              show: true,
              message: 'Unauthorized access',
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
      });
  }, []);

  useEffect(() => {
    userData &&
      userData.avatarBase64String &&
      setAvatar(userData.avatarBase64String);
  }, [userData]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const data = {};
      if (username.value) data.username = username.value;
      if (email.value) data.email = email.value;
      if (firstName.value) data.firstname = firstName.value;
      if (lastName.value) data.lastname = lastName.value;
      if (oldPassword.value) data.oldPassword = oldPassword.value;
      if (password.value) data.password = password.value;
      if (confirmPassword.value) data.confirmPassword = confirmPassword.value;
      if (lang) data.language = lang.code;
      if (userData && userData.avatarBase64String !== avatar)
        data.avatarBase64String = avatar;
      await userService.update(user.userId, data);
      setAlert({
        show: true,
        message: 'Account successfully updated',
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
            oldPassword,
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
    <Container component="main" className={classes.paper} maxWidth="sm">
      <CssBaseline />
      <Typography component="h2" variant="h4" gutterBottom>
        My profile
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} sm={5} className={classes.column}>
          <UpdatePhoto avatar={avatar} setAvatar={setAvatar} />

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            onClick={userProfileModal.handleClickOpen}
          >
            User Profile
          </Button>
          <p>(this button will be removed)</p>
        </Grid>
        <Grid item xs={12} sm={7} className={classes.column}>
          <form className={classes.form} noValidate>
            <InputField
              values={username}
              label={`username: ${userData.username}`}
            />
            <InputField
              values={firstName}
              label={`first name: ${userData.firstname}`}
            />
            <InputField
              values={lastName}
              label={`last name: ${userData.lastname}`}
            />
            <InputField values={email} label={`email: ${userData.email}`} />
            <InputField
              values={oldPassword}
              label="current password"
              autocomplete="old-pwd"
              required={true}
            />
            <InputField
              values={password}
              label="new password"
              autocomplete="new-pwd"
            />
            <InputField
              values={confirmPassword}
              label="confirm new password"
              autocomplete="new-pwd"
            />
            <Autocomplete
              id="language"
              value={lang}
              options={langOptions}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
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
          <FormButton handleClick={handleUpdate} name="Update" />
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
