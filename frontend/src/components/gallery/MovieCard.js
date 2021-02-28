import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import useModal from '../../hooks/useModal';
import CustomModal from '../common/CustomModal';
import VideoPlayer from '../videoPlayer/VideoPlayer';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 15px 13px 0px rgba(0,0,0,0.2)',
    },
    '&.MuiPaper-rounded': {
      borderRadius: '0px',
    },
  },
  cardMedia: {
    height: '400px',
    [theme.breakpoints.down('xs')]: {
      height: '250px',
    },
    width: '100%',
    objectFit: 'cover',
  },
  title: {
    marginBottom: '10px',
    minHeight: '65px',
  },
  cardContent: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
  },
  overlay: {
    opacity: 0.5,
  },
}));

const MovieCard = ({ movie }) => {
  const movieModal = useModal(<VideoPlayer movie={movie} />, true);
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card onClick={movieModal.handleClickOpen} className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.cardMedia + ' ' + (movie.watched ? classes.overlay : '')}
            component="img"
            alt={movie.title}
            image={movie.thumbnail}
            title={movie.title}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              color={movie.watched ? 'textSecondary' : 'textPrimary'}
              variant="h6"
              className={classes.title}>
              {movie.title}
            </Typography>
            <Box justifyContent="space-between" display="flex">
              <Typography color="textSecondary">
                IMDB {t('movie.rating')}: {movie.imdbRating}
              </Typography>
              <Typography color="textSecondary">{movie.year}</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <CustomModal {...movieModal} />
    </Grid>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
