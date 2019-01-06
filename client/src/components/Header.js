import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  header: {
    // position: 'fixed',
    width: '100%',
    zIndex: 2
    // top: 0
  }
});

function Header({ classes }) {
  return (
    <section className={classes.header}>
      <Paper square>
        <Typography variant="h5" align="center">
          Stockman
        </Typography>
      </Paper>
    </section>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
