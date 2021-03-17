import React from 'react';
import { useTranslation } from 'react-i18next';

import { withRouter } from 'react-router-dom';

// import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import VideocamIcon from '@material-ui/icons/Videocam';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MyProfile from '../profile/MyProfile';
import useModal from '../../hooks/useModal';
import CustomModal from '../common/CustomModal';

import PropTypes from 'prop-types';

const NavBar = ({ user, setUser }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    // TO DO reset hypertube gallery
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({ userId: '', lang: '' });
  };

  // TO DO add responsiveness: move navbar to bottom, center icons
  const profile = useModal(<MyProfile user={user} setUser={setUser} />);

  return (
    <AppBar style={{ padding: 0, backgroundColor: '#1b1d2f' }}>
      <Toolbar>
        <div style={{ width: '100%' }}>
          <Box display="flex">
            <Box p={1} flexGrow={1}>
              <Button
                startIcon={<PlayCircleFilledWhiteIcon />}
                variant="button"
                size="small"
                color="inherit"
                key="hypertube"
                onClick={() => handleClick()}>
                Hypertube
              </Button>
            </Box>
            <Box p={1}>
              <Button
                startIcon={<AccountCircle />}
                variant="button"
                color="inherit"
                size="small"
                key="profile"
                onClick={profile.handleClickOpen}>
                {t('navbar.profile')}
              </Button>
            </Box>
            <Box p={1}>
              <Button
                startIcon={<ExitToAppIcon />}
                variant="button"
                size="small"
                color="inherit"
                key="logout"
                onClick={() => handleLogout()}>
                {t('navbar.logout')}
              </Button>
            </Box>
          </Box>
        </div>
      </Toolbar>
      <CustomModal {...profile} />
    </AppBar>
  );
};

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default withRouter(NavBar);
