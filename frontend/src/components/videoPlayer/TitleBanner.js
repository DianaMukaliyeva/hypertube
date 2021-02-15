import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';
import StyleIcon from '@material-ui/icons/Style';
import EventIcon from '@material-ui/icons/Event';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';

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

const TitleBanner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <IconButton aria-label="close" className={classes.icon}>
          <CloseIcon />
      </IconButton> */}
      <h2>Die Hard</h2>
      9.9 <StarRateIcon className={classes.iconStar} />
      Action <StyleIcon className={classes.iconStar} />
      2020 <EventIcon className={classes.iconStar} />
      1h 20 min <HourglassEmptyIcon className={classes.iconStar} />
      <Typography variant="subtitle1" className={classes.intro}>
        An NYPD officer tries to save his wife and several others taken hostage by German terrorists
        during a Christmas party at the Anatomic Plaza in Los Angeles.
      </Typography>
    </div>
  );
};

export default TitleBanner;
