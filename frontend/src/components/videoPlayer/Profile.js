import React from 'react';
import PropTypes from 'prop-types';

import useModal from '../../hooks/useModal';
import UserProfile from '../profile/UserProfile';
import CustomModal from '../common/CustomModal';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const Profile = ({ user }) => {
  const userProfileModal = useModal(<UserProfile user={user} />);

  return (
  <div>
    <Button onClick={userProfileModal.handleClickOpen}>
      <Avatar alt={user.username} src={user.avatar} />
    </Button>
    <CustomModal {...userProfileModal} />
  </div>
    );
};

Profile.propTypes = {
    user: PropTypes.object.isRequired,
  };

export default Profile;