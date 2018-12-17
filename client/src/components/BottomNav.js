import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Icons
import Home from '@material-ui/icons/Home';
import BurgerMenu from '@material-ui/icons/Menu';
// import AnimalIcon from '@material-ui/icons/Pets';
import SettingsIcon from '@material-ui/icons/Settings';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
  draw: {
    paperAnchorBottom: {
      backgroundColor: 'red'
    }
  }
};

class BottomNav extends Component {
  state = {
    value: 0,
    open: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick = destination => () => {
    const { history } = this.props;
    history.push(destination);
  };

  toggleBurgerMenu = (name, value) => () => {
    this.setState({ [name]: value });
  };

  handleLogOut = () => {
    localStorage.removeItem('token');
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { classes } = this.props;
    const { value, open } = this.state;

    return (
      <Fragment>
        <Drawer
          className={classes.draw.paperAnchorBottom}
          anchor="bottom"
          open={open}
          onClose={this.toggleBurgerMenu('open', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleBurgerMenu('open', false)}
            onKeyDown={this.toggleBurgerMenu('open', false)}
          >
            <List>
              <ListItem button onClick={this.handleClick('/new/farm')}>
                <ListItemText primary="New Farm" />
              </ListItem>
              <ListItem button onClick={this.handleClick('/new/category')}>
                <ListItemText primary="New Category" />
              </ListItem>

              <Divider />

              <ListItem disabled button onClick={this.handleClick('/settings')}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Account and Settings" />
              </ListItem>

              <ListItem button onClick={this.handleLogOut}>
                <ListItemIcon>
                  <LogOutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
            </List>
          </div>
        </Drawer>

        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction onClick={this.handleClick('/')} label="Home" icon={<Home />} />

          {/* <BottomNavigationAction
            disabled
            onClick={this.handleClick('/manage-animals')}
            label="Animals"
            icon={<AnimalIcon />}
          /> */}

          <BottomNavigationAction
            onClick={this.toggleBurgerMenu('open', true)}
            label="Menu"
            icon={<BurgerMenu />}
          />
        </BottomNavigation>
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(BottomNav));
