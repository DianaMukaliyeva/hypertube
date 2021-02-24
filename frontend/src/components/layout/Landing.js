import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import i18n from '../../i18n';
// import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import useModal from '../../hooks/useModal';
import CustomModal from '../common/CustomModal';
import LoginForm from '../user/LoginForm';
import CreateAccountForm from '../user/CreateAccountForm';
import PasswordResetForm from '../user/PasswordResetForm';

// TO DO move to styles
const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.up('xs')]: {
      width: '250px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
    },
  },
  box: {
    [theme.breakpoints.up('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
}));

const Landing = ({ user, setUser }) => {
  const history = useHistory();
  const classes = useStyles();
  // const changeLanguage = (lang) => {
  //   i18n.changeLanguage(lang);
  // };
  // const { t } = useTranslation();
  const passwordResetModal = useModal(<PasswordResetForm />);
  useEffect(() => {
    // changeLanguage('en');
    if (/^(\/recoverylink)+/.test(history.location.pathname)) {
      passwordResetModal.handleClickOpen(true);
    }
  }, []);

  const loginModal = useModal(<LoginForm setUser={setUser} />);
  const createAccountModal = useModal(<CreateAccountForm setUser={setUser} />);

  return (
    <div style={{ marginTop: '25%', textAlign: 'center' }}>
      <Typography variant="h1">HYPERTUBE</Typography>
      {!user.userId && (
        <>
          <Box mt={5} display="flex" justifyContent="center" className={classes.box}>
            <Box m={3}>
              <Button
                className={classes.button}
                type="submit"
                variant="outlined"
                color="primary"
                onClick={loginModal.handleClickOpen}>
                Login
              </Button>
            </Box>
            <Box m={3}>
              <Button
                className={classes.button}
                type="submit"
                variant="outlined"
                color="secondary"
                onClick={createAccountModal.handleClickOpen}>
                Create Account
              </Button>
            </Box>
          </Box>
        </>
      )}
      <CustomModal {...loginModal} />
      <CustomModal {...createAccountModal} />
      <CustomModal {...passwordResetModal} />
    </div>
  );
};

Landing.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Landing;
