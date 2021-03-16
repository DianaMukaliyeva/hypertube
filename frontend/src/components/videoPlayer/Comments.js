import React from 'react';
import PropTypes from 'prop-types';

import Profile from './Profile';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
  },
  dividerStyle: {
    background: '#fb3b64',
  },
  inline: {
    display: 'inline',
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: '1rem'
  },
}));

const Comments = ({ movie }) => {
  const classes = useStyles();

  if (!movie || !movie.user) return <div></div>;

  return (
    <>
    <div className={classes.root}>
      <List>
      {movie.map((c) => (
      <ListItem key={c._id} alignItems="flex-start">
        <ListItemAvatar>
          <Profile user={c.user} />
        </ListItemAvatar>
        <ListItemText
          primary={c.user.username}
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {c.comment}
            </Typography>
          }
        />
        </ListItem>
      ))}
      </List>
    </div>
    </>
  );
};

Comments.propTypes = {
  movie: PropTypes.array,
};

export default Comments;