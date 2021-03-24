import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Typography, useMediaQuery, Box, Button } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  stickyBottom: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  button: {
    color: theme.palette.text.secondary,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  const authors = [
    {
      name: 'tkuumola',
      github: 'https://github.com/T7Q',
    },
    {
      name: 'dmukaliyeva',
      github: 'https://github.com/DianaMukaliyeva',
    },
    {
      name: 'ismelich',
      github: 'https://github.com/iljaSL',
    },
    {
      name: 'llahti',
      github: 'https://github.com/lapaset',
    },
    {
      name: 'ehalmkro',
      github: 'https://github.com/ehalmkro',
    },
  ];

  return (
    <div>
      {!isMobile && (
        <Box
          className={classes.stickyBottom}
          pt={4}
          pb={2}
          zIndex="1"
          bgcolor="background.secondary"
          color="text.secondary"
          textAlign="center"
        >
          <Typography variant="body2">
            {' '}
            © Copyright 2021 All Rights Reserved.{' '}
          </Typography>
          {authors.map((value, index) => {
            return (
              <span key={index}>
                <Tooltip title="Open GitHub" placement="top">
                  <Button
                    size="small"
                    target="_blank"
                    href={value.github}
                    className={classes.button}
                  >
                    {value.name}
                  </Button>
                </Tooltip>{' '}
                {index !== 4 ? ' & ' : ''}
              </span>
            );
          })}
        </Box>
      )}
    </div>
  );
};

export default Footer;
