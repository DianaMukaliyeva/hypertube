import React from 'react';

import authService from '../../services/auth';
import LogoButton from '../common/LogoButton';
import GoogleLogo from '../../images/google-logo.png';
import FortyTwoLogo from '../../images/42-logo.png';

const OmniAuthLogin = () => {
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
      <LogoButton
        handleClick={handleGoogleSignIn}
        name="Login with Google"
        logo={GoogleLogo}
      />
      <LogoButton
        handleClick={handle42SignIn}
        name="Login with 42"
        logo={FortyTwoLogo}
      />
    </>
  );
};

export default OmniAuthLogin;
