import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3, 0, 0),
    borderColor: '#1b1d2f',
    background: '#1b1d2f',
    // borderColor: theme.palette.text.primary,
    // background: theme.palette.background.default,
  },
  buttonIcon: {
    position: 'absolute',
    left: '1px',
    width: '32px',
    height: '32px',
    background: 'white',
    padding: '7px',
    borderRadius: '3px',
    marginRight: '15px',
  },
}));

const LogoButton = ({ handleClick, name, logo }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      variant="outlined"
      fullWidth
      color="secondary"
      className={classes.button}
      onClick={handleClick}>
      <img className={classes.buttonIcon} src={logo} alt={name} title={name} />
      {name}
    </Button>
  );
};

LogoButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

export default LogoButton;
