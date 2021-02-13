/* eslint-disable max-len */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
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

const Comments = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1613053341085-db794820ce43?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                FIRST!!!!!!!!!111111 Fu**** awesome movie! Bruce rocks!
              </Typography>
          }
        />
      </ListItem>
      <Divider className={classes.dividerStyle} variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1612831660163-448ac8b3c13c?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        </ListItemAvatar>
        <ListItemText
          primary="Peter Parker"
          secondary={
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Willis gleefully strips down the action movie to a pretend game for children who like to fire guns and shoot bad guys. Machismo may never be the same.
              </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" className={classes.dividerStyle} />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1612381197160-04a7c68c06cc?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4OHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        </ListItemAvatar>
        <ListItemText
          primary="Tracy Miller"
          secondary={
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Kudos should be given to both director John McTiernan and screenwriters Jeb Stuart and Steven DeSouza -- the film is tight, electrifying, and clever, which is something few action films can ever claim.
                The story isnt completely believable, but its believable enough, and it manages to move along at a quick enough pace to where the most glaring plotholes can easily be glossed over.
                Theres also enough twists and wrinkles thrown into the story to keep the audience guessing as to whats going to happen next . . . and the surprises dont come out of left field,
                but are actually clever and well thought-out. (The fact that McClane often relies on his brains instead of his bullets to get out of his predicaments is also a big plus.) Simply put, Die Hard is one of
                the smartest and savviest action screenplays ever written. McTiernan holds up his end of the film admirably as well -- he uses the claustrophobic nature of the office building to great effect
                (particularly in any scene involving an elevator shaft), and he keeps the film rolling at a rollercoaster pace, building up the anticipation of the audience before unleashing the action.
                A lot of recent action films just fly along at a mindless, breakneck pace, without ever allowing the story to breathe or the suspense to build . . . unlike those films, Die Hard knows how
                to maximize the impact of each and every scene, and thats why it stands out so clearly from them all. With Die Hard, John McTiernan puts on a perfect clinic as to how to pace an action movie.
              </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" className={classes.dividerStyle} />
      </List>
    </div>
  );
};

export default Comments;