import React from 'react';

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
    margin: theme.spacing.unit
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    width: '100%'
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
            <Typography variant="subtitle1">LSU: {farm.totalStockUnits}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
}

export default withStyles(styles)(FarmStatus);
