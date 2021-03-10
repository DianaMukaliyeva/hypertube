import React, { useState, useEffect } from 'react';
import './style.css';

import movieService from '../../services/movie';

import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
// import axios from 'axios';

import TitleBanner from './TitleBanner';
import MovieDetails from './MovieDetails';
import AddComment from './AddComment';
import Comments from './Comments';
import Player from './Player';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 100,
    background: 'rgba(27,29,47,0.4)',
  },
  icon: {
    marginLeft: '62rem',
  },
}));

const Loader = () => (
  <Box p={3} textAlign="center">
    <CircularProgress />
  </Box>
);

const buildTracks = (imdbCode, subsAvailableIn) => {
  const subsLables = { en: 'English', de: 'German', fi: 'Finnish', ru: 'Russian' };
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const tracks = subsAvailableIn.reduce((accum, lang) => {
    accum.push({
      label: subsLables[lang],
      kind: 'subtitles',
      src: baseUrl + `/api/movies/${imdbCode}/subtitles/${lang}`,
      srcLang: lang,
    });
    return accum;
  }, []);
  return tracks;
};

const VideoPlayer = (data) => {
  const [movie, setMovie] = useState({});
  const [subsTracks, setSubsTracks] = useState([]);
  const classes = useStyles();
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });
  const [loading, setLoading] = useState(true);

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
              message: 'Unauthorized access',
              severity: 'error',
            });
            break;
          case 500:
            setAlert({
              show: true,
              message: 'Server error',
              severity: 'error',
            });
            break;
          default:
            setAlert({
              show: true,
              message: 'Oops.. something went completely wrong',
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
    <Container maxWidth="lg">
      <Card className={classes.root}>
        {alert.show && (
          <Alert
            className={classes.alert}
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, show: false })}>
            {alert.message}
          </Alert>
        )}
        <CardContent>
          <TitleBanner movie={movie} />
          <Player imdbCode={data.movie.imdbCode} subsTracks={subsTracks} />
          <MovieDetails movie={movie} />
          <AddComment data={data} />
          <Comments />
        </CardContent>
      </Card>
    </Container>
  );
};

export default VideoPlayer;
