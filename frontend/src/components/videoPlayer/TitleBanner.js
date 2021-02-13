import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import StyleIcon from '@material-ui/icons/Style';
import EventIcon from '@material-ui/icons/Event';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '1rem',
  },
  icon: {
    marginLeft: '62rem'
  },
  iconStar: {
    color: 'gold',
    marginRight: '4.6px',
  },
  intro: {
    marginBottom: '1rem',
    marginTop: '1rem'
  }
}));

const TitleBanner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CloseIcon className={classes.icon}/>
      <h2>Die Hard</h2>
      9.9 <StarRateIcon className={classes.iconStar}/>
      Action <StyleIcon className={classes.iconStar}/>
      2020 <EventIcon className={classes.iconStar}/>
      1h 20 min <HourglassEmptyIcon className={classes.iconStar}/>
      <Typography variant="subtitle1" className={classes.intro}>
      An NYPD officer tries to save his wife and several others taken hostage by German terrorists
      during a Christmas party at the Anatomic Plaza in Los Angeles.
      </Typography>
    </div>
  );
};

export default TitleBanner;