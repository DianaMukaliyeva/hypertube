import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import emptyAvatar from '../../../images/emptyAvatar.png';

const useStyles = makeStyles(() => ({
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
  input: {
    display: 'none',
  },
  deleteButton: {
    zIndex: 10,
    position: 'relative',
    left: '85px',
    top: '-35px',
  },
}));

const UpdatePhoto = ({ avatar, setAvatar }) => {
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

    if (!file) return;

    if (file.size > 350000) {
      setAlert({
        show: true,
        message: 'Max photo size is 350kb',
        severity: 'error',
      });
      return;
    }

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
    if (alert.show) setAlert({ ...alert, show: false });
  };

  const handleDelete = () => {
    setAvatar(null);
  };

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
            src={avatar || emptyAvatar}
            alt="current profile picture"
          />
        </label>
      </Box>
      {avatar && (
        <IconButton
          className={classes.deleteButton}
          variant="button"
          size="small"
          color="inherit"
          key="logout"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      )}

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

UpdatePhoto.defaultProps = {
  avatar: null,
};

UpdatePhoto.propTypes = {
  avatar: PropTypes.string,
  setAvatar: PropTypes.func.isRequired,
};

export default UpdatePhoto;
