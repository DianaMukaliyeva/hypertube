import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
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
  // eslint-disable-next-line no-undef
  const streamUrl = process.env.REACT_APP_BACKEND_URL + `/api/movies/${imdbCode}/play/${token}`;

  const [statusPlayer, setStatusPlayer] = useState('');
  const [error, setError] = useState(false);

  const onPlay = () => {
    setStatusPlayer(t('movie.playing'));
    movieService.setWatched(imdbCode);
  };

  const onBuffer = () => {
    setStatusPlayer(t('movie.buffering'));
  };

  const onBufferEnd = () => {
    setStatusPlayer(t('movie.playing'));
  };

  const onPause = () => {
    setStatusPlayer(t('movie.paused'));
  };

  const onError = (err) => {
    if (
      err.target.error &&
      (err.target.error.code === 3 || err.target.error.code === 4 || err.target.error.code === 1)
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

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        ref={playerRef}
        playing={false}
        controls={true}
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
        onBufferEnd={onBufferEnd}
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
        <Typography variant="body2" style={{ color: '#707281', fontStyle: 'italic' }}>
          {statusPlayer}
        </Typography>
      </div>
    </div>
  );
};

Player.propTypes = {
  subsTracks: PropTypes.array.isRequired,
  imdbCode: PropTypes.string.isRequired,
};

export default Player;
