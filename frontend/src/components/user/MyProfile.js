import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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

// TO DO move to styles
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
  alert: {
    marginTop: theme.spacing(2),
  },
}));

const MyProfile = ({ user, setUser }) => {
  const [userData, setUserData] = useState({ language: '' });

  const username = useField('text', 'username', 'update-username');
  const firstName = useField('text', 'name', 'update-firsname');
  const lastName = useField('text', 'name', 'update-lastname');
  const email = useField('email', 'email', 'update-email');
  const oldPassword = useField('password', 'password', 'update-old-password');
  const password = useField('password', 'password', 'update-password');
  const confirmPassword = useField(
    'password',
    'confirmPassword',
    'update-confirm-password'
  );
  const [lang, setLang] = useState({ label: '', code: '' });
  const [avatar, setAvatar] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });
  const [passwordAlert, setPasswordAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });
  const classes = useStyles();
  const { t } = useTranslation();

  const langOptions = [
    { label: 'English', code: 'en' },
    { label: 'German', code: 'de' },
    { label: 'Finnish', code: 'fi' },
    { label: 'Russian', code: 'ru' },
  ];

  // todo: remove when done
  const userProfileModal = useModal(<UserProfile userId={user.userId} />);

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

  const resetAlerts = () => {
    const noAlert = {
      show: false,
      message: '',
      severity: '',
    };

    setPasswordAlert(noAlert);
    setAlert(noAlert);
  };

  const alertSuccess = (alert) => {
    alert({
      show: true,
      message: 'Account successfully updated',
      severity: 'success',
    });
  };

  const handleErrorResponse = (data, alert) => {
    switch (data.statusCode) {
      case 400:
        sharedFunctions.showErrors(data.details, {
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
        alert({
          show: true,
          message: 'Server error',
          severity: 'error',
        });
        break;
      default:
        alert({
          show: true,
          message: 'Oops.. somthing went completely wrong',
          severity: 'error',
        });
        break;
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    if (!oldPassword.value || !password.value || !confirmPassword.value) return;

    resetAlerts();

    try {
      const data = {
        oldPassword: oldPassword.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      await userService.update(user.userId, data);

      setUserData({ ...userData, ...data });
      alertSuccess(setPasswordAlert);
    } catch (err) {
      handleErrorResponse(err.response.data, setPasswordAlert);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    resetAlerts();
    try {
      const data = {};
      if (username.value) data.username = username.value;
      if (email.value) data.email = email.value;
      if (firstName.value) data.firstname = firstName.value;
      if (lastName.value) data.lastname = lastName.value;
      if (lang) data.language = lang.code;
      if (userData.avatarBase64String !== avatar)
        data.avatarBase64String = avatar;

      await userService.update(user.userId, data);
      if (lang) setUser({ ...user, lang: lang });

      setUserData({ ...userData, ...data, avatarBase64String: avatar });
      alertSuccess(setAlert);
    } catch (err) {
      handleErrorResponse(err.response.data, setAlert);
    }
  };

  return (
    userData && (
      <Container component="main" className={classes.paper} maxWidth="sm">
        <CssBaseline />
        <Typography component="h2" variant="h4" gutterBottom>
          {t('myProfile.title')}
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
                label={`${t('form.username')}: ${userData.username}`}
              />
              <InputField
                values={firstName}
                label={`${t('form.firstName')}: ${userData.firstname}`}
              />
              <InputField
                values={lastName}
                label={`${t('form.lastName')}: ${userData.lastname}`}
              />
              <InputField values={email} label={`Email: ${userData.email}`} />
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
                    label={t('form.selectLanguage')}
                    variant="outlined"
                  />
                )}
              />

              {alert.show && (
                <Alert
                  className={classes.alert}
                  severity={alert.severity}
                  onClose={() => setAlert({ ...alert, show: false })}
                >
                  {alert.message}
                </Alert>
              )}
              <FormButton
                handleClick={handleUpdate}
                name={t('myProfile.update')}
              />
            </form>

            <form className={classes.form} noValidate>
              <InputField
                values={oldPassword}
                label={t('form.currentPassword')}
                autocomplete="old-pwd"
                required={true}
              />
              <InputField
                values={password}
                label={t('form.newPassword')}
                autocomplete="new-pwd"
              />
              <InputField
                values={confirmPassword}
                label={t('form.confirmPassword')}
                autocomplete="new-pwd"
              />

              {passwordAlert.show && (
                <Alert
                  className={classes.alert}
                  severity={passwordAlert.severity}
                  onClose={() => setAlert({ ...passwordAlert, show: false })}
                >
                  {passwordAlert.message}
                </Alert>
              )}
              <FormButton
                handleClick={handlePasswordUpdate}
                name={t('myProfile.updatePassword')}
              />
            </form>
          </Grid>
        </Grid>
        <CustomModal {...userProfileModal} />
      </Container>
    )
  );
};

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default MyProfile;
