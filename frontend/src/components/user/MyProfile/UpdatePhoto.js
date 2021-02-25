import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';

import emptyAvatar from '../emptyAvatar.png';

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
  input: {
    display: 'none',
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

  const handleUpload = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file) return; // is this needed??

    if (file.size > 350000) {
      setAlert(true, 'Max photo size is 350kb', 'error');
      return;
    }

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  console.log('🚀  photo', photo);
  return (
    <>
      <Box className={classes.imageContainer}>
        <input
          accept="image/*"
          className={classes.input}
          id="upload-input"
          type="file"
          onChange={handleUpload}
        />

        <label htmlFor="upload-input">
          <img
            className={classes.image}
            src={photo || emptyAvatar}
            alt="current profile picture"
          />
        </label>
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

export default UpdatePhoto;
