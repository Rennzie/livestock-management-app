import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import withStyles from '@material-ui/core/styles/withStyles';

import AddMovement from './Add';
import RemoveMovement from './Remove';
import TransferMovement from './Transfer';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

const movementOptions = [
  {
    name: 'initial-add',
    displayName: 'Initial Add',
    type: 'add',
    multiplier: 1
  },
  {
    name: 'births',
    displayName: 'Births',
    type: 'add',
    multiplier: 1
  },
  {
    name: 'purchases',
    displayName: 'Purchases',
    type: 'add',
    multiplier: -1
  },
  {
    name: 'deaths',
    displayName: 'Deaths',
    type: 'remove',
    multiplier: -1
  },
  {
    name: 'sales',
    displayName: 'Sales',
    type: 'remove',
    multiplier: -1
  },
  {
    name: 'theft',
    displayName: 'Theft',
    type: 'remove',
    multiplier: -1
  },
  {
    name: 'transfer-in',
    displayName: 'Transfer In',
    type: 'transfer',
    multiplier: 1
  },
  {
    name: 'transfer-out',
    displayName: 'Transfer Out',
    type: 'transfer',
    multiplier: -1
  }
];

class NewMovement extends Component {
  state = {
    value: 'add'
  };

  handleRadioChange = event => {
    const { value } = event.target;
    this.setState(() => ({ value }));
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="h5" align="center">
          New Movement
        </Typography>

        <FormControl component="fieldset" className={classes.formControl}>
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          <RadioGroup
            name="movementSelect"
            className={classes.group}
            value={value}
            onChange={this.handleRadioChange}
          >
            <FormControlLabel value="add" control={<Radio />} label="Add" />
            <FormControlLabel value="remove" control={<Radio />} label="Remove" />
            <FormControlLabel value="transfer" control={<Radio />} label="Transfer" />
          </RadioGroup>
        </FormControl>

        {value === 'add' && <AddMovement movementOptions={movementOptions} movementOption="" />}
        {value === 'remove' && <RemoveMovement />}
        {value === 'transfer' && <TransferMovement />}
      </Fragment>
    );
  }
}

export default withStyles(styles)(NewMovement);
