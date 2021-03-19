import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import userService from '../../../services/user';
import sharedFunctions from '../../../utils/sharedFunctions';
import UpdatePhoto from './UpdatePhoto';
import UpdatePassword from './UpdatePassword';
import UpdateInformation from './UpdateInformation';

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

  const [avatar, setAvatar] = useState(null);
  const noAlert = { show: false, message: '', severity: '' };
  const [alert, setAlert] = useState(noAlert);
  const [passwordAlert, setPasswordAlert] = useState(noAlert);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleErrorResponse = (data, showAlert, params) => {
    switch (data.statusCode) {
      case 401:
        showAlert({
          show: true,
          message: t('error.unauthorized'),
          severity: 'error',
        });
        break;
      case 400:
        sharedFunctions.showErrors(data.details, params);
        break;
      case 500:
        showAlert({
          show: true,
          message: t('error.server'),
          severity: 'error',
        });
        break;
      default:
        showAlert({
          show: true,
          message: t('error.unexpected'),
          severity: 'error',
        });
        break;
    }
  };

  const handleUpdate = async (data, showAlert, params) => {
    setPasswordAlert(noAlert);
    setAlert(noAlert);

    if (userData.avatarBase64String !== avatar)
      data.avatarBase64String = avatar;

    if (Object.keys(data).length === 0) return;

    try {
      await userService.update(user.userId, data);
      setUserData({ ...userData, ...data, avatarBase64String: avatar });
      if (data.language) setUser({ ...user, lang: data.language });

      showAlert({
        show: true,
        message: 'Account successfully updated',
        severity: 'success',
      });
    } catch (err) {
      handleErrorResponse(err.response.data, showAlert, params);
    }
  };

  const updateInformationProps = {
    classes,
    userData,
    alert,
    setAlert,
    handleUpdate,
  };

  const updatePasswordProps = {
    classes,
    alert: passwordAlert,
    setAlert: setPasswordAlert,
    handleUpdate,
  };

  useEffect(() => {
    userService
      .get(user.userId)
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        handleErrorResponse(err.response.data, setAlert, {});
      });
  }, []);

  useEffect(() => {
    userData &&
      userData.avatarBase64String &&
      setAvatar(userData.avatarBase64String);
  }, [userData]);

  return userData ? (
    <Container component="main" className={classes.paper} maxWidth="sm">
      <CssBaseline />
      <Typography component="h2" variant="h4" gutterBottom>
        {t('myProfile.title')}
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} sm={5} className={classes.column}>
          <UpdatePhoto avatar={avatar} setAvatar={setAvatar} />
        </Grid>
        <Grid item xs={12} sm={7} className={classes.column}>
          <UpdateInformation {...updateInformationProps} />
          {userData.hasPw && <UpdatePassword {...updatePasswordProps} />}
        </Grid>
      </Grid>
    </Container>
  ) : null;
};

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default MyProfile;
