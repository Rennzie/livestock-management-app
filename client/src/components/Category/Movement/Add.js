import React, { Fragment } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import IntegerSelect from '../../common/IntegerSelect';

const styles = theme => ({
  margins: {
    margin: theme.spacing.unit
  }
});

function AddMovement({
  movementOptions,
  movementOption,
  classes,
  handleChange,
  animalsMoved,
  handleCountChange
}) {
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
          onChange={handleChange('movementOption')}
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
            return null;
          })}
        </NativeSelect>
      </FormControl>

      <IntegerSelect number={animalsMoved} handleCountChange={handleCountChange} />
    </Fragment>
  );
}

export default withStyles(styles)(AddMovement);
