import React, { Fragment } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  numberSize: {
    fontSize: '40px',
    textAlign: 'center'
  },
  counterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '50%'
  }
});

function IntegerSelect({ number, handleCountChange, classes }) {
  return (
    <section className={classes.counterWrapper}>
      <IconButton onClick={handleCountChange('countUp')}>
        <Icon fontSize="large">keyboard_arrow_up</Icon>
      </IconButton>

      <Input
        className={classes.numberSize}
        disableUnderline
        onChange={handleCountChange('countChange')}
        value={number}
      />

      <IconButton onClick={handleCountChange('countDown')}>
        <Icon fontSize="large">keyboard_arrow_down</Icon>
      </IconButton>
    </section>
  );
}

export default withStyles(styles)(IntegerSelect);