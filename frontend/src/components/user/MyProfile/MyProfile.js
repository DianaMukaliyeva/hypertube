import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import userService from '../../../services/user';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import UpdatePhoto from './UpdatePhoto';
import UpdateInformationForm from './UpdateInformationForm';
import UpdatePasswordForm from './UpdatePasswordForm';

// todo remove when done
import Button from '@material-ui/core/Button';
import CustomModal from '../../common/CustomModal';
import useModal from '../../../hooks/useModal';
import UserProfile from '../UserProfile';

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
}));

const MyProfile = ({ user, setUser }) => {
  console.log('🚀  logging setUser just to do something with it', setUser);

  const [userInformation, setUserInformation] = useState({});
  const classes = useStyles();

  // todo: remove when done
  const userProfileModal = useModal(<UserProfile userId={user.userId} />);

  /*console.log(
    '🚀 ~ file: MyProfile.js ~ line 185 ~ MyProfile ~ userInformation',
    userInformation
  );*/

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
          <UpdatePhoto user={{ userId: user.userId, ...userInformation }} />

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
