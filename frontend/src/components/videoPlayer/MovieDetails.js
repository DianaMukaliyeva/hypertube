import React from 'react';

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

const MovieDetails = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.intro}>
        <strong>Director:</strong> John McTiernan <br></br>
        <strong>Cast:</strong> Bruce Willis, Alan Rickman, Bonnie Bedelia
      </Typography>
    </div>
  );
};

export default MovieDetails;