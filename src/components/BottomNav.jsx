import React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';

const styles = {
  root: {
    width: 500
  }
};

class BottomNav extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick = (destination) => () => {
    this.props.history.push(destination);
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction onClick={this.handleClick('/')} label="Home" icon={<Home />} />
      </BottomNavigation>
    );
  }
}

export default withRouter(withStyles(styles)(BottomNav));
