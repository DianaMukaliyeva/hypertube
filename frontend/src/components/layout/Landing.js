import React, { useEffect } from 'react';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import useModal from '../../hooks/useModal';

import CustomModal from '../common/CustomModal';
import LoginForm from '../user/LoginForm';
import CreateAccountForm from '../user/CreateAccountForm';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import PasswordResetForm from '../user/PasswordResetForm';

/* eslint-disable react/prop-types */
const Landing = ({ user, setUser }) => {
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const { t } = useTranslation();
  useEffect(() => {
    changeLanguage('en');
  }, []);

  const history = useHistory();

  const withoutLogin = () => {
    const path = 'hypertube';
    history.push(path);
  };

  const loginModal = useModal(<LoginForm setUser={setUser} />);
  const createAccountModal = useModal(<CreateAccountForm setUser={setUser} />);
  const passwordResetModal = useModal(<PasswordResetForm />);

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <h1>{t('Welcome')}</h1>
      {!user.userId && (
        <>
          <Box display="flex" justifyContent="center">
            <Box mr={2}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                onClick={loginModal.handleClickOpen}>
                Login
              </Button>
            </Box>
            <Box>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                onClick={createAccountModal.handleClickOpen}>
                Create Account
              </Button>
            </Box>
          </Box>
          <Box mt={5}>
            <Button type="submit" variant="outlined" color="primary" onClick={withoutLogin}>
              go to next page without AUTH
            </Button>
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
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Landing;
