import React from 'react';
import { useTranslation } from 'react-i18next';

import ToRemove from './ToRemove';
import useModal from '../../hooks/useModal';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CustomModal from '../common/CustomModal';
// import Movie from '../movie/Index';
import PropTypes from 'prop-types';
import VideoPlayer from '../videoPlayer/VideoPlayer';

const Hypertube = ({ user }) => {
  console.log('hypertube');
  const { t } = useTranslation();
  const movieModal = useModal(<VideoPlayer user={user} />, true);
  return (
    <div>
      <h1>{t('Welcome')} to the movie gallery</h1>
      <Box>
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          onClick={movieModal.handleClickOpen}>
          MOVIE HERE
        </Button>
      </Box>
      <Box mt={10}></Box>
      <ToRemove />
      <CustomModal {...movieModal} />
    </div>
  );
};

Hypertube.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Hypertube;
