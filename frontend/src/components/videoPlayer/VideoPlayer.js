import React from 'react';
import VideoPlayerJS from 'react-video-js-player';
import Vid from './video/DJI_0407.MP4';
import './style.css';

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
    marginLeft: '62rem'
  }
}));

const VideoPlayer = () => {
  // eslint-disable-next-line max-len
  const classes = useStyles();
  const src = Vid;

  return (
    <Container  maxWidth="lg">
    <Card  className={classes.root}>
      <CardContent>
        <TitleBanner />
        <div className='test'>
          <VideoPlayerJS
            src={src}
            width='1020'
            heigh='650'
          />
        </div>
          <MovieDetails />
          <AddComment/>
          <Comments />
        </CardContent>
      </Card >
       </Container>
  );
};

export default VideoPlayer;