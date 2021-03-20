import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      marginTop: '3rem',
      marginBottom: '5rem',
    },
    marginBottom: '1rem',
    marginTop: '2rem',
  },
  intro: {
    marginTop: '1rem',
    marginBottom: '1rem',
    color: theme.palette.text.secondary,
  },
}));

const MovieDetails = ({ movie }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const details = [
    { text: movie.director ? `${t('movie.director')}: ${movie.director}` : '' },
    { text: movie.cast ? `${t('movie.cast')}: ${movie.cast}` : '' },
    {
      text: `${t('movie.subtitles')}: ${
        movie.subtitles.length > 0
          ? movie.subtitles.map((s) => t(`form.${s}`)).join(', ')
          : t('movie.notAvailable')
      }`,
    },
  ];

  return (
    <div className={classes.root}>
      {details.map((option, index) => {
        return (
          <Typography key={`detail-${index}`} variant="subtitle1" className={classes.intro}>
            {option.text}
          </Typography>
        );
      })}
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieDetails;
