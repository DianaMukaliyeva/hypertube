import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  imdb: {
    color: theme.palette.primary.main,
    marginRight: '1rem',
  },
  year: {
    marginRight: '1rem',
  },
  genre: {
    marginRight: '1rem',
  },
  description: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('xs')]: {
      marginBottom: '3rem',
      marginTop: '1rem',
    },
    marginBottom: '1rem',
    marginTop: '1rem',
  },
}));

const TitleBanner = ({ movie }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div>
      <Typography component="h1" variant={isMobile ? 'h5' : 'h2'}>
        {movie.title}
      </Typography>
      <Box mt={3} display="flex" flexDirection={isMobile ? 'column' : 'row'}>
        {movie.imdbRating && (
          <Typography variant="body2" className={classes.imdb}>
            IMDb {movie.imdbRating}
          </Typography>
        )}
        <Typography variant="body2" className={classes.genre}>
          {movie.genre}
        </Typography>
        <Typography variant="body2" className={classes.year}>
          {movie.year}
        </Typography>
        {movie.length && (
          <Typography variant="body2">{movie.length} min</Typography>
        )}
      </Box>
      <Typography variant="body1" className={classes.description}>
        {movie.description}
      </Typography>
    </div>
  );
};

TitleBanner.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default TitleBanner;
