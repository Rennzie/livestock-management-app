import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25vw',
    height: '25vh',
    margin: 'auto'
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

function LoadingSpinner({ classes, color }) {
  return (
    <div className={classes.progressContainer}>
      <CircularProgress className={classes.progress} color={color} />;
    </div>
  );
}

LoadingSpinner.defaultProps = {
  color: 'primary'
};

export default withStyles(styles)(LoadingSpinner);
