import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  root: {
    fontSize: '60px',
    fontAlignLast: 'center'
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

      <textarea
        onChange={handleCountChange('countChange')}
        maxLength={5}
        rows={1}
        spellCheck={false}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '60px',
          resize: 'none',
          textAlign: 'center'
        }}
        value={number}
      />

      <IconButton disabled={number <= 0} onClick={handleCountChange('countDown')}>
        <Icon fontSize="large">keyboard_arrow_down</Icon>
      </IconButton>
    </section>
  );
}

IntegerSelect.propTypes = {
  number: PropTypes.number.isRequired,
  handleCountChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegerSelect);
