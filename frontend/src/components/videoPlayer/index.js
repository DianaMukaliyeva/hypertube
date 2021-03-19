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
import useAlert from '../../hooks/useAlert';

const Loader = () => (
  <Box p={3} textAlign="center">
    <CircularProgress />
  </Box>
);

const buildTracks = (imdbCode, subsAvailableIn, t) => {
  const subsLables = { en: t('form.en'), de: t('form.de'), fi: t('form.fi'), ru: t('form.ru') };
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
  const alert = useAlert();
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);
  const mountedRef = React.useRef(true);

  const getMovieData = async () => {
    try {
      const res = await movieService.getMovieData(data.movie.imdbCode);
      if (!mountedRef.current) return null;
      setMovie(res);
      setSubsTracks(buildTracks(data.movie.imdbCode, res.subtitles, t));
      setLoading(false);
      setRefresh(false);
    } catch (err) {
      if (err.response && err.response.data) {
        switch (err.response.data.statusCode) {
          case 401:
            alert.showError(t('error.unauthorized'), 5000);
            break;
          case 500:
            alert.showError(t('error.server'), 5000);
            break;
          default:
            alert.showError(t('error.unexpected'), 5000);
            break;
        }
      }
    }
  };

  useEffect(() => {
    getMovieData();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const getComments = async () => {
    try {
      const res = await movieService.getComments(data.movie.imdbCode);
      if (!mountedRef.current) return null;
      setMovie({ ...movie, comments: res.comments });
      setRefresh(false);
    } catch (err) {
      if (err.response && err.response.data) {
        switch (err.response.data.statusCode) {
          case 401:
            alert.showError(t('error.unauthorized'), 5000);
            break;
          case 500:
            alert.showError(t('error.server'), 5000);
            break;
          default:
            alert.showError(t('error.unexpected'), 5000);
            break;
        }
      }
    }
  };

  useEffect(() => {
    getComments();
  }, [refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box m={isMobile ? 1 : 7}>
      {alert.values.show && (
        <Alert severity={alert.values.severity} onClose={alert.closeAlert}>
          {alert.values.message}
        </Alert>
      )}
      <TitleBanner movie={movie} />
      <Player subsTracks={subsTracks} imdbCode={data.movie.imdbCode} />
      <MovieDetails movie={movie} />
      {data.movie && data.movie.imdbCode && (
        <AddComment imdbCode={data.movie.imdbCode} setRefresh={setRefresh} />
      )}
      {movie.comments && <Comments comments={movie.comments} />}
    </Box>
  );
};

export default VideoPlayer;
