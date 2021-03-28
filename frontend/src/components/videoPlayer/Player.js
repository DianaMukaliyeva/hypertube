import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

import PlayCircleFilledWhiteOutlined from '@material-ui/icons/PlayCircleFilledWhiteOutlined';

import img from '../../images/video-banner.png';
import movieService from '../../services/movie';

const Player = ({ subsTracks, imdbCode }) => {
  const token = localStorage.getItem('token');
  const playerRef = useRef(null);
  // eslint-disable-next-line no-undef
  const streamUrl = process.env.REACT_APP_BACKEND_URL + `/api/movies/${imdbCode}/play/${token}`;

  const [statusPlayer, setStatusPlayer] = useState('');
  const [error, setError] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const handlePlay = () => {
    console.log('ONPLAY');
    if (!error || !loadError) {
      setStatusPlayer('PLAY');
      movieService.setWatched(imdbCode);
    }
  };
  const onBuffer = () => {
    console.log('BUFFERING');
    if (!error || !loadError) {
      setStatusPlayer('BUFFERING');
    }
  };
  const onStart = () => {
    console.log('START');
    if (!error || !loadError) {
      setStatusPlayer('START');
    }
  };

  const onError = (err) => {
    console.log('!!!!!!!!   ERROR  !!!!!!!!!!!!!!!', err);
    // playerRef.current.seekTo(0);
    if (err.target.error && err.target.error.code === 3) {
      setStatusPlayer('File corrupted');
      setError(true);
      playerRef.current.showPreview();
    }
  };

  const onProgress = ({ playedSeconds, loadedSeconds }) => {
    // console.log('ON PROGRESS', 'sec played', playedSeconds, 'sec loaded', loadedSeconds);
    if (playedSeconds > loadedSeconds && !error) {
      console.log('NOT LOADED YET, Try earlier piece');
      setStatusPlayer('NOT LOADED YET, the movie will be set to start');
      // console.log('ref', playerRef.current);
      playerRef.current.seekTo(0);
      setLoadError(true);
      // setError(false);
    }
  };

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        ref={playerRef}
        playing={false}
        controls={true}
        pip={false}
        url={streamUrl}
        onPlay={handlePlay}
        width="100%"
        light={img}
        playIcon={<PlayCircleFilledWhiteOutlined fontSize="large" />}
        onBuffer={onBuffer}
        onStart={onStart}
        onProgress={onProgress}
        onError={onError}
        config={{
          file: {
            attributes: {
              crossOrigin: 'true',
            },
            tracks: subsTracks,
          },
        }}
      />
      <div className="center color-black60 bg-black100 p-4">
        <div>{statusPlayer}</div>
        {/* <div>played: {Math.round(secondsPlayed)} seconds</div>
        <div>
          loaded: {Math.round(secondsLoaded)} / {Math.round(totalSeconds)} seconds
        </div> */}
      </div>
    </div>
  );
};

Player.propTypes = {
  subsTracks: PropTypes.array.isRequired,
  imdbCode: PropTypes.string.isRequired,
};

export default Player;
