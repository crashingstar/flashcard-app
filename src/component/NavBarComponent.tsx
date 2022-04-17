import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Typography, IconButton, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
({
  Icon: {
    marginRight: theme.spacing(5)
  },
  Black: {
    color: '#000'
  },
})
);
const NavBar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar >
          <Typography variant="h4" color="inherit" className={classes.Icon}>
            Flashcard App
          </Typography>
          <div>
            <IconButton color="inherit" className={classes.Black} component={Link} to="/home">
              Home
            </IconButton>
            <IconButton color="inherit" className={classes.Black} component={Link} to="/deck">
              Deck
            </IconButton>
            <IconButton color="inherit" className={classes.Black}component={Link} to="/">
              Settings
            </IconButton>
            <IconButton color="inherit" component={Link} to="/">
              Logout
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;