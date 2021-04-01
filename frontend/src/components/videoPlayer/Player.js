import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import PlayCircleFilledWhiteOutlined from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import Typography from '@material-ui/core/Typography';

import img from '../../images/video-banner.png';
import movieService from '../../services/movie';

const Player = ({ subsTracks, imdbCode }) => {
  const token = localStorage.getItem('token');
  const { t } = useTranslation();
  const playerRef = useRef(null);
  const streamUrl =
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_BACKEND_URL + `/api/movies/${imdbCode}/play/${token}`;

  const [statusPlayer, setStatusPlayer] = useState('');
  const [error, setError] = useState(false);
  const buffering = useRef(false);

  const onClickPreview = () => {
    setStatusPlayer(t('movie.buffering'));
    buffering.current = true;
  };

  const onReady = () => {
    buffering.current = false;
  };

  const onPlay = () => {
    setStatusPlayer(t('movie.playing'));
    movieService.setWatched(imdbCode);
  };

  const onBuffer = () => {
    setStatusPlayer(t('movie.buffering'));
    buffering.current = true;
  };

  const onBufferEnd = () => {
    setStatusPlayer(t('movie.playing'));
    buffering.current = false;
  };

  const onPause = () => {
    setStatusPlayer(t('movie.paused'));
  };

  const onError = (err) => {
    if (
      err.target.error &&
      (err.target.error.code === 3 ||
        err.target.error.code === 4 ||
        err.target.error.code === 1)
    ) {
      setStatusPlayer(t('movie.sourceFileError'));
      setError(true);
      playerRef.current.showPreview();
    }
  };

  const onProgress = ({ playedSeconds, loadedSeconds }) => {
    if (playedSeconds > loadedSeconds && !error) {
      setStatusPlayer(t('movie.notLoadedError'));
      playerRef.current.showPreview();
    }
  };

  useEffect(() => {
    return () => {
      if (buffering.current === true) window.location.reload();
    };
  }, []);

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        ref={playerRef}
        playing={true}
        controls={buffering.current === false}
        pip={false}
        url={streamUrl}
        onPlay={onPlay}
        width="100%"
        light={img}
        playIcon={<PlayCircleFilledWhiteOutlined fontSize="large" />}
        onBuffer={onBuffer}
        onProgress={onProgress}
        onError={onError}
        onPause={onPause}
        onReady={onReady}
        onBufferEnd={onBufferEnd}
        onClickPreview={onClickPreview}
        config={{
          file: {
            attributes: {
              crossOrigin: 'true',
            },
            tracks: subsTracks,
          },
        }}
      />

      <div>
        <Typography
          variant="body2"
          style={{ color: '#707281', fontStyle: 'italic' }}
        >
          {statusPlayer}
        </Typography>
      </div>
      {buffering.current === true && <LinearProgress />}
    </div>
  );
};

Player.propTypes = {
  subsTracks: PropTypes.array.isRequired,
  imdbCode: PropTypes.string.isRequired,
};

export default Player;
