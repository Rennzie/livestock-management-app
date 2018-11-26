import React from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import AnimalIcon from '@material-ui/icons/Pets';

const styles = {
  root: {
    width: '100%'
  }
};

class BottomNav extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    console.log('======>', value);
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
        <BottomNavigationAction onClick={this.handleClick('/manage-classes')} label="Categories" icon={<CategoryIcon />} />
        <BottomNavigationAction onClick={this.handleClick('/manage-animals')} label="Animals" icon={<AnimalIcon />} />
      </BottomNavigation>
    );
  }
}

export default withRouter(withStyles(styles)(BottomNav));
