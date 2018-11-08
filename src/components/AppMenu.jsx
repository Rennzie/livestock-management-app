import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Menu';

const styles = () => ({
  appBar: {
    position: 'absolute',
    top: 'auto',
    bottom: 0,
    margin: 0
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

function AppMenu({ classes }) {
  return(
    <AppBar className={classes.appBar} position='static' color='primary' >
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(AppMenu);
