import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import userService from '../../services/user';
import emptyAvatar from './emptyAvatar.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    width: '150px',
    height: '150px',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(async () => {
    const userFromDb = await userService.get(userId);
    console.log(
      '🚀 ~ file: UserProfile.js ~ line 29 ~ useEffect ~ userFromDb',
      userFromDb
    );
    if (userFromDb) setUser(userFromDb);
  }, [userId]);

  return (
    user && (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" gutterBottom>
            Profile
          </Typography>
          <Box className={classes.imageContainer}>
            <img
              className={classes.image}
              src={user.base64avatar || emptyAvatar}
              alt={user.username}
            />
          </Box>
          <Typography variant="body1">
            {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="body1">{user && user.username}</Typography>
        </div>
      </Container>
    )
  );
};

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserProfile;
