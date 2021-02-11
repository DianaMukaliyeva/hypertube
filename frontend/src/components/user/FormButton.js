import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/* eslint-disable react/prop-types */
const CustomButton = ({ handleLogin }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="outlined"
      color="primary"
      className={classes.submit}
      onClick={handleLogin}>
      Sign In
    </Button>
  );
};

export default CustomButton;
