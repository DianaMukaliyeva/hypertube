import React, { useState } from 'react';
import PropTypes from 'prop-types';

import movieService from '../../services/movie';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles(() => ({
  title: {
    marginBottom: '2rem',
  },
  buttonStyle: {
    marginTop: '2rem',
    width: '15%',
    borderColor: '#292b3c',
    padding: '0.7rem',
  },
  input: {
    '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#292b3c',
    },
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
    <div>
      <Typography variant="h5" className={classes.title}>
        Leave a Comment
      </Typography>
      {alert.show && (
        <Alert
          className={classes.title}
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, show: false })}>
          {alert.message}
        </Alert>
      )}
      <OutlinedInput
        fullWidth
        multiline
        rows="7"
        label="Leave your comment here"
        values={comment}
        className={classes.input}
        onChange={onChangeComment}
      />
      <Button
        onClick={handleComment}
        variant="outlined"
        color="secondary"
        size="small"
        className={classes.buttonStyle}>
        Post comment
      </Button>
    </div>
  );
};

AddComment.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AddComment;
