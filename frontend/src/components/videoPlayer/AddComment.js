import React, { useState, useEffect } from 'react';
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
  const mountedRef = React.useRef(true);

  useEffect(() => {
    return () => (mountedRef.current = false);
  }, []);

  const handleComment = async () => {
    try {
      setBtnDisabled(true);
      await movieService.createComment({ comment }, imdbCode);
      if (mountedRef.current === false) return null;
      setComment('');
      setRefresh(true);
      alert.showSuccess(t('comment.success'));
    } catch (err) {
      if (err.response && err.response.data && mountedRef.current === true) {
        switch (err.response.data.statusCode) {
          case 400:
            alert.showError(t('comment.invalidFormat'));
            break;
          case 401:
            alert.showError(t('error.unauthorized'));
            break;
          case 500:
            alert.showError(t('error.server'));
            break;
          default:
            alert.showError(t('error.unexpected'));
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
          onClose={alert.closeAlert}
        >
          {alert.values.message}
        </Alert>
      )}
      <OutlinedInput
        fullWidth
        multiline
        rows="7"
        label="Leave your comment here"
        value={comment}
        className={classes.input}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        onClick={handleComment}
        variant="outlined"
        color="secondary"
        size="small"
        disabled={btnDisabled}
        className={classes.buttonStyle}
      >
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
