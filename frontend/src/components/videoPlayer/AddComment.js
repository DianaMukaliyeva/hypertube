import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import movieService from '../../services/movie';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '2rem',
  },
  intro: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  buttonStyle: {
    marginTop: '2rem',
    width: '15%',
  },
}));

const AddComment = ({ data }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });

  const onChangeComment = (e) => {
    const comment = e.target.value;
    setComment(comment);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await movieService.createComment(comment, data.movie.imdbCode);
      setAlert({
        show: true,
        message: 'Thanks for the comment!',
        severity: 'success',
      });
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          setAlert({
            show: true,
            message: 'Comment format is wrong',
            severity: 'error',
          });
          break;
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
            message: 'Oops.. something went completely wrong',
            severity: 'error',
          });
          break;
      }
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.intro}>
        Comments
      </Typography>
      {alert.show && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, show: false })}
          >
            {alert.message}
          </Alert>
        )}
      <TextField
        color="primary"
        fullWidth
        id="standard-basic"
        multiline
        rows="7"
        label="Add comment"
        values={comment}
        onChange={onChangeComment}
      />
      <Button
        onClick={handleComment}
        variant="outlined"
        color="secondary"
        className={classes.buttonStyle}>
        Send
      </Button>
    </div>
  );
};

AddComment.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AddComment;
