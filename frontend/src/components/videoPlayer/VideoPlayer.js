import React from 'react';
import VideoPlayerJS from 'react-video-js-player';
import Vid from './video/DJI_0407.MP4';

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
    background: 'rgba(0,0,0,0.3)',
  },
  icon: {
    marginLeft: '62rem'
  }
}));

const VideoPlayer = () => {
  // eslint-disable-next-line max-len
  const classes = useStyles();
  const poster = 'https://unsplash.com/photos/FgzBFgfmVJg';
  const src = Vid;

  return (
    <Container  maxWidth="lg">
    <Card  className={classes.root}>
      <CardContent>
        <TitleBanner />
          <VideoPlayerJS
            src={src}
            poster={poster}
            width='1020'
            heigh='650'
          />
          <MovieDetails />
          <AddComment/>
          <Comments />
        </CardContent>
      </Card >
       </Container>
  );
};

export default VideoPlayer;