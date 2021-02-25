import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import useModal from '../../hooks/useModal';
import galleryService from '../../services/gallery';
import CustomModal from '../common/CustomModal';
import VideoPlayer from '../videoPlayer/VideoPlayer';

const Hypertube = ({ user }) => {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // const [page, setPage] = React.useState(0);
  const { t } = useTranslation();
  const movieModal = useModal(<VideoPlayer user={user} />, true);

  const getMovies = async () => {
    setLoading(true);
    const moviesData = await galleryService.getMovies();
    setMovies(moviesData);
    setLoading(false);
  };

  console.log('movies', movies);

  React.useEffect(() => {
    getMovies();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

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
      <CustomModal {...movieModal} />
    </div>
  );
};

Hypertube.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Hypertube;
