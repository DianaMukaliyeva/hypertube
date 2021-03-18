import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import emptyAvatar from '../../images/emptyAvatar.png';

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

const UserProfile = ({ user }) => {
  const classes = useStyles();

  return user ? (
    <Container component="main" className={classes.paper} maxWidth="xs">
      <CssBaseline />
      <Typography component="h2" variant="h5" gutterBottom>
        Profile
      </Typography>
      <Box className={classes.imageContainer}>
        <img
          className={classes.image}
<<<<<<< HEAD
          src={user.avatar || emptyAvatar}
=======
          src={user.avatar || user.avatarBase64String || emptyAvatar}
>>>>>>> 02c0af2857215cfe586a51bbb547b69e70ca2523
          alt={user.username}
        />
      </Box>

      <Typography variant="body1" className={classes.username}>
        {user.firstname} {user.lastname}
      </Typography>
      <Typography variant="body1">{user.username}</Typography>
    </Container>
  ) : null;
};

UserProfile.defaultProps = {
  user: PropTypes.shape({
    username: '',
    firstname: '',
    lastname: '',
    avatar: null,
  }),
};

UserProfile.propTypes = {
  user: PropTypes.shape({
		username: PropTypes.string,
		firstname: PropTypes.string,
		lastname: PropTypes.string,
		avatarBase64String: PropTypes.string,
    avatar: PropTypes.string,
	})
};

export default UserProfile;
