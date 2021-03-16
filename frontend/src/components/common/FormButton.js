import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const FormButton = ({ name }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="outlined"
      color="primary"
      className={classes.submit}
    >
      {name}
    </Button>
  );
};

FormButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormButton;
