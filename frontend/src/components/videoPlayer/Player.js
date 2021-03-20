// import React, { useEffect, useState } from 'react';
import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

import img from '../../images/video-banner.png';
import movieService from '../../services/movie';

const Player = ({ subsTracks, imdbCode }) => {
  const token = localStorage.getItem('token');
    // eslint-disable-next-line no-undef
  const streamUrl = process.env.REACT_APP_BACKEND_URL + `/api/movies/${imdbCode}/play/${token}`;

  const handlePlay = () => {
    movieService.setWatched(imdbCode);
  };

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        playing={false}
        controls={true}
        pip={false}
        url={streamUrl}
        onPlay={handlePlay}
        width="100%"
        // height="360px"
        light={img}
        config={{
          file: {
            attributes: {
              crossOrigin: 'true',
            },
            tracks: subsTracks,
          },
        }}
      />
    </div>
  );
};

Player.propTypes = {
  subsTracks: PropTypes.array.isRequired,
  imdbCode: PropTypes.string.isRequired
};

export default Player;
