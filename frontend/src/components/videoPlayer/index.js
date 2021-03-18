import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import TitleBanner from './TitleBanner';
import MovieDetails from './MovieDetails';
import AddComment from './AddComment';
import Comments from './Comments';
import Player from './Player';
import movieService from '../../services/movie';

const Loader = () => (
  <Box p={3} textAlign="center">
    <CircularProgress />
  </Box>
);

const buildTracks = (imdbCode, subsAvailableIn) => {
  const subsLables = { en: 'English', de: 'German', fi: 'Finnish', ru: 'Russian' };
  // eslint-disable-next-line no-undef
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const token = localStorage.getItem('token');

  const tracks = subsAvailableIn.reduce((accum, lang) => {
    accum.push({
      label: subsLables[lang],
      kind: 'subtitles',
      src: baseUrl + `/api/movies/${imdbCode}/subtitles/${lang}/${token}`,
      srcLang: lang,
    });
    return accum;
  }, []);
  return tracks;
};

const VideoPlayer = (data) => {
  const [movie, setMovie] = useState({});
  const [subsTracks, setSubsTracks] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { t } = useTranslation();

  useEffect(async () => {
    await movieService
      .getMovieData(data.movie.imdbCode)
      .then((res) => {
        setMovie(res);
        setSubsTracks(buildTracks(data.movie.imdbCode, res.subtitles));
        setLoading(false);
      })
      .catch((err) => {
        switch (err.response.data.statusCode) {
          case 401:
            setAlert({
              show: true,
              message: t('error.unauthorized'),
              severity: 'error',
            });
            break;
          case 500:
            setAlert({
              show: true,
              message: t('error.server'),
              severity: 'error',
            });
            break;
          default:
            setAlert({
              show: true,
              message: t('error.unexpected'),
              severity: 'error',
            });
            break;
        }
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box m={isMobile ? 1 : 7}>
      {alert.show && (
        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })}>
          {alert.message}
        </Alert>
      )}
      <TitleBanner movie={movie} />
      <Player subsTracks={subsTracks} />
      <MovieDetails movie={movie} />
      <AddComment data={data} />
      <Comments movie={movie.comments} />
    </Box>
  );
};

export default VideoPlayer;
