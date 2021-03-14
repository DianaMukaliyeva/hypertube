// import React, { useEffect, useState } from 'react';
import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const Player = ({ subsTracks }) => {
    // playing only this movie 4 now
    // eslint-disable-next-line no-undef
  const streamUrl = process.env.REACT_APP_BACKEND_URL + '/api/movies/tt4154796/play';

  const handlePlay = () => {
    console.log('PLAY'); // TO DO make record in db
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
        height="100%"
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
};

export default Player;
