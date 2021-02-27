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
    width: '200px',
    height: '200px',
    overflow: 'hidden',
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '200px',
    maxHeight: '200px',
    display: 'block',
    cursor: 'pointer',
  },
  username: {
    marginTop: theme.spacing(2),
  },
}));

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(async () => {
    const userFromDb = await userService.get(userId);
    if (userFromDb) setUser(userFromDb);
  }, [userId]);

  return (
    user && (
      <Container component="main" className={classes.paper} maxWidth="xs">
        <CssBaseline />
        <Typography component="h2" variant="h5" gutterBottom>
          Profile
        </Typography>
        <Box className={classes.imageContainer}>
          <img
            className={classes.image}
            src={user.avatarBase64String || emptyAvatar}
            alt={user.username}
          />
        </Box>

        <Typography variant="body1" className={classes.username}>
          {user.firstname} {user.lastname}
        </Typography>
        <Typography variant="body1">{user && user.username}</Typography>
      </Container>
    )
  );
};

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserProfile;
