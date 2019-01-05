import React, { Fragment } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  margins: {
    margin: theme.spacing.unit
  }
});

function AddMovement({ movementOptions, movementOption, classes }) {
  // dropdown with options for selection
  // number field which returns a number
  // NEXT: write the handlers for select changes
  return (
    <Fragment>
      <FormControl variant="outlined" required fullWidth>
        <InputLabel shrink htmlFor="movementOption">
          Movements In
        </InputLabel>
        <NativeSelect
          value={movementOption}
          className={classes.margin}
          // onChange={this.handleFarmSelect}
          input={<Input name="movementOption" id="movementOption" />}
        >
          <option value="">select reason</option>
          {movementOptions.map(movement => {
            if (movement.type === 'add') {
              return (
                <option key={movement.name} value={movement.name}>
                  {movement.displayName}
                </option>
              );
            }
          })}
        </NativeSelect>
      </FormControl>
    </Fragment>
  );
}

export default withStyles(styles)(AddMovement);
