import React, { useState, useEffect } from 'react';
import VideoPlayerJS from 'react-video-js-player';
// import Vid from './video/DJI_0407.MP4';
import Vid from './video/sample.mp4';
import './style.css';
import movieService from '../../services/movie';

import { makeStyles } from '@material-ui/core/styles';
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
  // eslint-disable-next-line max-len
  const [movie, setMovie] = useState({});
  const classes = useStyles();
  const src = Vid;

  useEffect(async () => {
    const movieData = await movieService.getMovieData(data.movie.imdbCode);
    if (movieData) setMovie(movieData);
  }, []);

  return (
    <Container maxWidth="lg">
      <Card className={classes.root}>
        <CardContent>
          <TitleBanner movie={movie} />
          <div className="test">
            <VideoPlayerJS src={src} width="1020" heigh="650" />
          </div>
          <MovieDetails movie={movie} />
          <AddComment movie={movie} />
          <Comments />
        </CardContent>
      </Card>
    </Container>
  );
};

export default VideoPlayer;
