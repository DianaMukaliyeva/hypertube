/*eslint-disable */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import useModal from '../../hooks/useModal';
import CustomModal from '../common/CustomModal';
import LoginForm from '../auth/LoginForm';
import CreateAccountForm from '../auth/CreateAccountForm';
import PasswordResetForm from '../auth/PasswordResetForm';
import sample from './sample.mp4';

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
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();

  const passwordResetModal = useModal(<PasswordResetForm />);
  useEffect(() => {
    if (/^(\/recoverylink)+/.test(history.location.pathname)) {
      passwordResetModal.handleClickOpen(true);
    }
  }, []);

  const loginModal = useModal(<LoginForm setUser={setUser} />);
  const createAccountModal = useModal(<CreateAccountForm setUser={setUser} />);

  const Hyper = () => {
    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <video
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}>
          <source src={sample} type="video/mp4"></source>
        </video>
        <h2
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#fff',
            fontSize: '70vh',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: '#000',
            lineHeight: '100vh',
            mixBlendMode: 'screen',
          }}>
          Hyper
        </h2>
      </div>
    );
  };

  const clouds =
    'https://www.youtube.com/embed/bog4VzMWP20?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=bog4VzMWP20';

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
                {t('login.login')}
              </Button>
            </Box>
            <Box m={3}>
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
        </>
      )}
      <CustomModal {...loginModal} />
      <CustomModal {...createAccountModal} />
      <CustomModal {...passwordResetModal} />
    </div>
  );

  // return (
  //   <div style={{ marginTop: '25%', textAlign: 'center' }}>
  //     <Typography variant="h1">HYPERTUBE</Typography>
  //     {!user.userId && (
  //       <>
  //         <Box mt={5} display="flex" justifyContent="center" className={classes.box}>
  //           <Box m={3}>
  //             <Button
  //               className={classes.button}
  //               type="submit"
  //               variant="outlined"
  //               color="primary"
  //               onClick={loginModal.handleClickOpen}>
  //               Login
  //             </Button>
  //           </Box>
  //           <Box m={3}>
  //             <Button
  //               className={classes.button}
  //               type="submit"
  //               variant="outlined"
  //               color="secondary"
  //               onClick={createAccountModal.handleClickOpen}>
  //               Create Account
  //             </Button>
  //           </Box>
  //         </Box>
  //       </>
  //     )}
  //     <CustomModal {...loginModal} />
  //     <CustomModal {...createAccountModal} />
  //     <CustomModal {...passwordResetModal} />
  //   </div>
  // );
};

Landing.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Landing;
