import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
import Iframe from 'react-iframe';

import useModal from '../../hooks/useModal';
import CustomModal from '../common/CustomModal';
import LoginForm from '../auth/LoginForm';
import CreateAccountForm from '../auth/CreateAccountForm';
import PasswordResetForm from '../auth/PasswordResetForm';

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.up('xs')]: {
      width: '240px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
      top: '60vh',
    },
    top: '20vh',
    zIndex: '1',
  },
  titleMobile: {
    fontWeight: 600,
    marginTop: '25vh',
  },
  box: {
    [theme.breakpoints.up('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  cover: {
    background:
      // eslint-disable-next-line
      'url(https://images.unsplash.com/photo-1519373344801-14c1f9539c9c?w=1920&h=1080&fit=crop&crop=bottom) no-repeat center',
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: '-1',
  },
  text: {
    [theme.breakpoints.up('xl')]: {
      fontSize: 'calc(5px + 9vw + 0.8vh)',
    },
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    fontSize: 'calc(5px + 13vw + 0.8vh)',
    fontWeight: 900,
    letterSpacing: '0.15em',
    margin: 'auto',
    textTransform: 'uppercase',
    userSelect: 'none',
    backgroundColor: '#060629',
    border: '1px red',
    color: '#fff',
    mixBlendMode: 'multiply',
  },
  alertContainer: {
    [theme.breakpoints.up('xs')]: {
      width: '300px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
    margin: 'auto',
  },
  alert: {
    position: 'absolute',
    top: '10vh',
    [theme.breakpoints.up('xs')]: {
      width: '300px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
  },
}));

const Landing = ({ setUser, alert }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  const passwordResetModal = useModal(<PasswordResetForm />);
  useEffect(() => {
    if (/^(\/recoverylink)+/.test(history.location.pathname)) {
      passwordResetModal.handleClickOpen(true);
    }
  }, []);

  const loginModal = useModal(<LoginForm setUser={setUser} />);
  const createAccountModal = useModal(<CreateAccountForm setUser={setUser} />);

  return (
    <div>
      {isMobile ? (
        <Typography variant="h3" className={classes.titleMobile} align="center">
          HYPERTUBE
        </Typography>
      ) : (
        <div className={classes.cover}>
          <div className={classes.video}>
            <Iframe
              // eslint-disable-next-line
              url="https://www.youtube.com/embed/y2TET3G0sJ4?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=y2TET3G0sJ4"
              width="100%"
              height="100%"
              id="myId"
              display="initial"
              position="relative"
              allowFullScreen
            />
            <h1 className={classes.text}>HYPERTUBE</h1>
          </div>
        </div>
      )}

      <Box mt={5} display="flex" justifyContent="center" className={classes.box}>
        <Box m={3} style={{ alignSelf: 'center' }}>
          <Button
            className={classes.button}
            type="submit"
            variant="outlined"
            color="primary"
            onClick={loginModal.handleClickOpen}>
            Login
            {t('login.login')}
          </Button>
        </Box>
        <Box m={3} style={{ alignSelf: 'center' }}>
          <Button
            className={classes.button}
            type="submit"
            variant="outlined"
            color="secondary"
            onClick={createAccountModal.handleClickOpen}>
            {t('createAccount.create')}
          </Button>
        </Box>
      </Box>
      {alert.values.show && (
        <Box className={classes.alertContainer}>
          <Alert
            className={classes.alert}
            severity={alert.values.severity}
            onClose={alert.closeAlert}>
            {alert.values.message}
          </Alert>
        </Box>
      )}
      <CustomModal {...loginModal} />
      <CustomModal {...createAccountModal} />
      <CustomModal {...passwordResetModal} />
    </div>
  );
};

Landing.propTypes = {
  setUser: PropTypes.func,
  alert: PropTypes.object,
};

export default Landing;
