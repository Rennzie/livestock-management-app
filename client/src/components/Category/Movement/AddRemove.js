import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import IntegerSelect from '../../common/IntegerSelect';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  }
});

function AddRemoveMovement({
  movementOptions,
  reasonForChange,
  classes,
  handleChange,
  animalsMoved,
  handleCountChange,
  createdAt,
  movementType
}) {
  return (
    <Fragment>
      <TextField
        className={classes.margin}
        id="createdAt"
        label="Movement Date"
        type="date"
        onChange={handleChange('createdAt')}
        value={createdAt}
      />
      <FormControl variant="outlined" required fullWidth>
        {/* <InputLabel className={classes.margin} htmlFor="reasonForChange">
          Movements In
        </InputLabel> */}
        <NativeSelect
          value={reasonForChange}
          className={classes.margin}
          onChange={handleChange('reasonForChange')}
          input={<Input name="reasonForChange" id="reasonForChange" />}
        >
          <option value="">select reason</option>
          {movementOptions.map(movement => {
            if (movement.type === movementType) {
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

AddRemoveMovement.propTypes = {
  movementType: PropTypes.string.isRequired,
  movementOptions: PropTypes.array.isRequired,
  reasonForChange: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  animalsMoved: PropTypes.number.isRequired,
  handleCountChange: PropTypes.func.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default withStyles(styles)(AddRemoveMovement);
