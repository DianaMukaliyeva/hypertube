import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import movieService from '../../services/movie';
import useAlert from '../../hooks/useAlert';

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

const AddComment = ({ imdbCode, setRefresh }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const alert = useAlert();
  const { t } = useTranslation();

  const onChangeComment = (e) => {
    const comment = e.target.value;
    setComment(comment);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      setBtnDisabled(true);
      await movieService.createComment(comment, imdbCode);
      setRefresh(true);
      alert.showSuccess(t('comment.success'), 5000);
    } catch (err) {
      if (err.response && err.response.data) {
        switch (err.response.data.statusCode) {
          case 400:
            alert.showError(t('comment.invalidFormat'), 5000);
            break;
          case 401:
            alert.showError(t('error.unauthorized'), 5000);
            break;
          case 500:
            alert.showError(t('error.server'), 5000);
            break;
          default:
            alert.showError(t('error.unexpected'), 5000);
            break;
        }
      }
    }
    setBtnDisabled(false);
  };

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        {t('comment.leaveComment')}
      </Typography>
      {alert.values.show && (
        <Alert
          className={classes.title}
          severity={alert.values.severity}
          onClose={alert.closeAlert}>
          {alert.values.message}
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
        disabled={btnDisabled}
        className={classes.buttonStyle}>
        {t('comment.post')}
      </Button>
    </div>
  );
};

AddComment.propTypes = {
  imdbCode: PropTypes.string.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default AddComment;
