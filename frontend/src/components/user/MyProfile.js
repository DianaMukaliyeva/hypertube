import React from 'react';
import authService from '../../services/auth';
import Button from '@material-ui/core/Button';

const MyProfile = () => {
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      await authService.test();
      console.log('test auth');
    } catch (exception) {
      console.log('test error');
    }
  };
  return (
    <div>
      My profile component
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        TEST AUTH
      </Button>
    </div>
  );
};

export default MyProfile;
