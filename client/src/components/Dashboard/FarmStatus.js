import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  spreadRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: theme.spacing.unit * 3
  },
  margin: {
    margin: theme.spacing.unit * 4
  },
  column: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center'
    // width: '100%'
  }
});

function FarmStatus({ user, classes }) {
  return (
    <div className={classNames(classes.column, classes.margin)}>
      <div className={classes.spreadRow}>
        <Typography variant="subtitle1">Total Animals:</Typography>
        <Typography variant="subtitle1">{user.totalAnimals}</Typography>
      </div>
      <Divider />
      {user.farms.map(farm => (
        <div key={farm._id} className={classes.spreadRow}>
          <Typography variant="subtitle1">{farm.name}</Typography>
          <div>
            <Typography variant="subtitle1">Animals: {farm.totalAnimals}</Typography>
            <Typography variant="subtitle1">LSU: {Math.round(farm.totalStockUnits)}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
}

FarmStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(FarmStatus);
