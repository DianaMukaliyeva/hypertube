import React from 'react';
// import i18n from './../../i18n';
// import { useTranslation } from 'react-i18next';

import { withRouter } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VideocamIcon from '@material-ui/icons/Videocam';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Container from '@material-ui/core/Container';

const NavBar = () => {
  //   const { t } = useTranslation();

  //   useEffect(() => {
  //     i18n.changeLanguage(lang);
  //   }, [lang]);

  const handleClick = (url) => {
    console.log('url', url);
    // handleNavigation(url);
  };

  return (
    <AppBar style={{ padding: 0, backgroundColor: '#1b1d2f' }}>
      <Toolbar>
        <div style={{ width: '100%' }}>
          <Box display="flex">
            <Box p={1} flexGrow={1}>
              <IconButton
                variant="button"
                size="small"
                color="inherit"
                key="hypertube"
                onClick={() => handleClick('/')}>
                <Typography style={{ color: 'white' }}>
                  <VideocamIcon />
                  Hypertube
                </Typography>
              </IconButton>
            </Box>
            <Box p={1}>
              <IconButton
                variant="button"
                color="inherit"
                size="small"
                key="profile"
                onClick={() => handleClick('/')}>
                <Typography style={{ color: 'white' }}>
                  <AccountCircle />
                  Profile
                </Typography>
              </IconButton>
            </Box>
            <Box p={1}>
              <IconButton
                variant="button"
                size="small"
                color="inherit"
                key="logout"
                onClick={() => handleClick('/')}>
                <Typography style={{ color: 'white' }}>
                  <ExitToAppIcon />
                  Logout
                </Typography>
              </IconButton>
            </Box>
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(NavBar);
