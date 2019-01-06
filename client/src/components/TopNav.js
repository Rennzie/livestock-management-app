import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  headerFont: {
    fontFamily: 'Audiowide'
  },
  draw: {
    paperAnchorBottom: {
      backgroundColor: 'red'
    }
  }
};

class TopNav extends Component {
  state = {
    open: false
  };

  toggleBurgerMenu = (name, value) => () => {
    this.setState({ [name]: value });
  };

  handleClick = destination => () => {
    const { history } = this.props;
    history.push(destination);
  };

  handleLogOut = () => {
    localStorage.removeItem('token');
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              onClick={this.toggleBurgerMenu('open', true)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              align="center"
              className={classNames(classes.grow, classes.headerFont)}
            >
              STOCKMAN
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.draw.paperAnchorBottom}
          anchor="top"
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
      </div>
    );
  }
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopNav);
