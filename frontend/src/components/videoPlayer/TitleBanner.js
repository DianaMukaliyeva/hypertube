import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import StarRateIcon from '@material-ui/icons/StarRate';
import StyleIcon from '@material-ui/icons/Style';
import EventIcon from '@material-ui/icons/Event';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '1rem',
  },
  icon: {
    marginLeft: '62rem',
    color: theme.palette.grey[500],
  },
  iconStar: {
    color: '#fb3b64',
    marginRight: '4.6px',
  },
  intro: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
}));
// eslint-disable-next-line no-undef
const TitleBanner = ({ movie }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>{movie.title}</h2>
      {movie.imdbRating} <StarRateIcon className={classes.iconStar} />
      {movie.genre} <StyleIcon className={classes.iconStar} />
      {movie.year} <EventIcon className={classes.iconStar} />
      {movie.length} min. <HourglassEmptyIcon className={classes.iconStar} />
      <Typography variant="subtitle1" className={classes.intro}>
        {movie.description}
      </Typography>
    </div>
  );
};

TitleBanner.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default TitleBanner;
