import React from 'react';
import './style.css';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
  root: {
    marginTop: '2rem',
  },
  intro: {
    marginBottom: '1rem',
    marginTop: '1rem'
  },
  buttonStyle: {
    marginTop: '2rem',
    width: '15%'
  }
}));

const AddComment = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.intro}>
        Comments
      </Typography>
      <TextField
        color='primary'
        fullWidth='true'
        id="standard-basic"
        multiline='true'
        rows='7'
        label="Add comment" />
      <Button variant="outlined" color="secondary" className={classes.buttonStyle}>
        Send
      </Button>
    </div>
  );
};

export default AddComment;