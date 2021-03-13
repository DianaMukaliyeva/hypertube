/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


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

  if (!movie || !movie.comments) return <div></div>;

  return (
    <div className={classes.root}>
      <List>
      {movie.comments.map((e) => {
      <ListItem key={e.id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={e.userId.firstname} src={e.userId.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={e.userId.username}
          secondary={
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {e.comment}
              </Typography>
          }
        />
        </ListItem>
        ;})}
      </List>
    </div>
  );
};

Comments.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Comments;