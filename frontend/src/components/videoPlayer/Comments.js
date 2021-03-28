import React from 'react';
import PropTypes from 'prop-types';

import Profile from './Profile';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '2rem',
  },
  comment: {
    paddingLeft: 0,
  },
}));

const Comments = ({ comments }) => {
  const classes = useStyles();

  if (!comments) return <div></div>;

  return (
    <>
      <div className={classes.root}>
        <List>
          {comments.map((comment) => {
            return (
              <ListItem
                key={comment._id}
                alignItems="flex-start"
                className={classes.comment}
              >
                <ListItemAvatar>
                  <Profile user={comment.user} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.user.username}
                  secondary={
                    <Typography component="span" color="textSecondary">
                      {comment.comment}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};

export default Comments;
