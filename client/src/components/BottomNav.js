import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import withStyles from '@material-ui/core/styles/withStyles';

// Icons
import Home from '@material-ui/icons/Home';
import RainIcon from '@material-ui/icons/Grain';
import AnimalIcon from '@material-ui/icons/Pets';

const styles = () => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
});

class BottomNav extends Component {
  state = {
    value: 0
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
    const { value } = this.state;

    return (
      <Fragment>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            onClick={this.handleClick('/dashboard')}
            label="Home"
            icon={<Home />}
          />

          <BottomNavigationAction
            onClick={this.handleClick('/manage-categories')}
            label="Categories"
            icon={<AnimalIcon />}
          />

          <BottomNavigationAction
            disabled
            onClick={this.handleClick('/rainfall')}
            label="Rainfall"
            icon={<RainIcon />}
          />
        </BottomNavigation>
      </Fragment>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(BottomNav));
