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
  },
  headerFont: {
    fontFamily: 'Audiowide'
  }
});

function Header({ classes }) {
  return (
    <section className={classes.header}>
      <Paper square>
        <Typography className={classes.headerFont} variant="h5" align="center">
          STOCKMAN
        </Typography>
      </Paper>
    </section>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
