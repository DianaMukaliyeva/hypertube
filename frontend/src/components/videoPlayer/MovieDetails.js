import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '2rem',
  },
  intro: {
    marginBottom: '1rem',
    marginTop: '1rem'
  }
}));

const MovieDetails = ({ movie }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.intro}>
        <strong>Director:</strong> {movie.director} <br></br>
        <strong>Cast:</strong> {movie.cast}
      </Typography>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
};


export default MovieDetails;