import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useField from '../../../hooks/useField';
import userService from '../../../services/user';
import sharedFunctions from '../../../utils/sharedFunctions';
import UpdatePhoto from './UpdatePhoto';
import UserProfile from '../UserProfile';
import UpdatePassword from './UpdatePassword';
import UpdateInformation from './UpdateInformation';

// todo remove when done
import Button from '@material-ui/core/Button';
import CustomModal from '../../common/CustomModal';
import useModal from '../../../hooks/useModal';

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
    'update-confirm-pw'
  );
  const [avatar, setAvatar] = useState(null);
  const noAlert = { show: false, message: '', severity: '' };
  const [alert, setAlert] = useState(noAlert);
  const [passwordAlert, setPasswordAlert] = useState(noAlert);
  const classes = useStyles();
  const { t } = useTranslation();

  // todo: remove when done
  const userProfileModal = useModal(<UserProfile userId={user.userId} />);

  const handleErrorResponse = (data, showAlert) => {
    switch (data.statusCode) {
      case 401:
        showAlert({
          show: true,
          message: 'Unauthorized access',
          severity: 'error',
        });
        break;
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
        showAlert({
          show: true,
          message: 'Server error',
          severity: 'error',
        });
        break;
      default:
        showAlert({
          show: true,
          message: 'Oops.. somthing went completely wrong',
          severity: 'error',
        });
        break;
    }
  };

  const handleUpdate = async (data, showAlert) => {
		setPasswordAlert(noAlert);
    setAlert(noAlert);

    if (userData.avatarBase64String !== avatar)
      data.avatarBase64String = avatar;

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
      handleErrorResponse(err.response.data, showAlert);
    }
  };

  const updateInformationProps = {
    classes,
    userData,
    username,
    firstName,
    lastName,
    email,
    alert,
    setAlert,
    handleUpdate,
  };

  const updatePasswordProps = {
    classes,
    oldPassword,
    password,
    confirmPassword,
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
        handleErrorResponse(err.response.data, setAlert);
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
          <UpdateInformation {...updateInformationProps} />
          <UpdatePassword {...updatePasswordProps} />
        </Grid>
      </Grid>
      <CustomModal {...userProfileModal} />
    </Container>
  ) : null;
};

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default MyProfile;
