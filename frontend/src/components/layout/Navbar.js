import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { withRouter } from 'react-router-dom';

import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MyProfile from '../profile/MyProfile';
import useModal from '../../hooks/useModal';
import CustomModal from '../common/CustomModal';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    '&:hover': {
      background: 'inherit',
      color: theme.palette.primary.main,
    },
  },
}));

const NavBar = ({ user, setUser, clearFilter, setClearFilter }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleClick = () => {
    setClearFilter(!clearFilter);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({ userId: '', lang: '' });
  };

  const profile = useModal(<MyProfile user={user} setUser={setUser} />, 'sm');

  const options = [
    { icon: <PlayCircleFilledWhiteIcon />, onClick: handleClick, text: 'Hypertube' },
    { icon: <AccountCircle />, onClick: profile.handleClickOpen, text: t('navbar.profile') },
    { icon: <ExitToAppIcon />, onClick: handleLogout, text: t('navbar.logout') },
  ];

  return (
    <AppBar style={{ padding: 0, backgroundColor: '#1b1d2f' }}>
      <Toolbar>
        <div style={{ width: '100%' }}>
          <Box display="flex">
            {options.map((option, index) => {
              return (
                <Box
                  key={`nav-${index}`}
                  p={1}
                  m={isMobile ? 'auto' : ''}
                  flexGrow={!isMobile && index === 0 ? 1 : ''}>
                  <Button
                    startIcon={option.icon}
                    size="large"
                    color="inherit"
                    className={classes.button}
                    onClick={option.onClick}>
                    {isMobile ? '' : option.text}
                  </Button>
                </Box>
              );
            })}
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
  clearFilter: PropTypes.bool.isRequired,
  setClearFilter: PropTypes.func.isRequired,
};

export default withRouter(NavBar);
