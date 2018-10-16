import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


export default class AppMenu extends React.Component{
  render() {
    return(
      <AppBar position='static' color='primary' >
        <Toolbar>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
