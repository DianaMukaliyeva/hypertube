import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const Player = ({ imdbCode }) => {
  console.log('imdb Code', imdbCode); // TO DO use this code to get subtitles
  const imdbId = 'tt0322259';
  const testUrl = process.env.REACT_APP_BACKEND_URL + '/api/auth/stream';

  const subsAvailableIn = ['en', 'de', 'fi', 'ru'];
  const subsLables = { en: 'English', de: 'German', fi: 'Finnish', ru: 'Russian' };

  const subUrl = subsAvailableIn.reduce((accum, lang) => {
    accum[lang] = process.env.REACT_APP_BACKEND_URL + `/api/movies/${imdbId}/subtitles/${lang}`;
    return accum;
  }, {});

  const subsTracks = subsAvailableIn.reduce((accum, lang) => {
    accum.push({
      label: subsLables[lang],
      kind: 'subtitles',
      src: subUrl[lang],
      srcLang: lang,
    });
    return accum;
  }, []);

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        playing={true}
        controls={true}
        pip={false}
        url={testUrl}
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
  imdbCode: PropTypes.string.isRequired,
};

export default Player;
