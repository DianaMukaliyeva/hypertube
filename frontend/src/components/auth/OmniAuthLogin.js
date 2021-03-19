import React from 'react';
import { useTranslation } from 'react-i18next';

import authService from '../../services/auth';
import LogoButton from '../common/LogoButton';
import GoogleLogo from '../../images/google-logo.png';
import FortyTwoLogo from '../../images/42-logo.png';

const OmniAuthLogin = () => {
  const { t } = useTranslation();
  const handleGoogleSignIn = async () => {
    try {
      const data = await authService.googleUrl();
      window.location = data.url;
    } catch (e) {
      console.log(e);
    }
  };

  const handle42SignIn = async () => {
    try {
      const data = await authService.fortytwoUrl();
      window.location = data.url;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <LogoButton handleClick={handleGoogleSignIn} name={t('login.google')} logo={GoogleLogo} />
      <LogoButton handleClick={handle42SignIn} name={t('login.42')} logo={FortyTwoLogo} />
    </>
  );
};

export default OmniAuthLogin;
