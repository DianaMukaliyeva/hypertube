import React, { useState, useEffect } from 'react';
import VideoPlayerJS from 'react-video-js-player';
import Vid from './video/sample.mp4';
import './style.css';

import movieService from '../../services/movie';

import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';

import TitleBanner from './TitleBanner';
import MovieDetails from './MovieDetails';
import AddComment from './AddComment';
import Comments from './Comments';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 100,
    background: 'rgba(27,29,47,0.4)',
  },
  icon: {
    marginLeft: '62rem',
  },
}));

const VideoPlayer = (data) => {
  const [movie, setMovie] = useState({});
  const classes = useStyles();
  const src = Vid;
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });

  useEffect(async () => {
    await movieService.getMovieData(data.movie.imdbCode)
      .then((res) => {
        setMovie(res);
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

  return (
    <Container maxWidth="lg">
      <Card className={classes.root}>
      {alert.show && (
                <Alert
                  className={classes.alert}
                  severity={alert.severity}
                  onClose={() => setAlert({ ...alert, show: false })}
                >
                  {alert.message}
                </Alert>
              )}
        <CardContent>
          <TitleBanner movie={movie} />
          <div className="test">
            <VideoPlayerJS src={src} width="1020" heigh="650" />
          </div>
          <MovieDetails movie={movie} />
          <AddComment data={data} />
          <Comments />
        </CardContent>
      </Card>
    </Container>
  );
};

export default VideoPlayer;
