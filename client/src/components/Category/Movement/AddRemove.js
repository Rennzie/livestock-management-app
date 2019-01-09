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
  animalsMoved,
  availableAnimals,
  classes,
  createdAt,
  handleChange,
  handleCountChange,
  movementOptions,
  movementType,
  reasonForChange
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
        <NativeSelect
          className={classes.margin}
          input={<Input name="reasonForChange" id="reasonForChange" />}
          onChange={handleChange('reasonForChange')}
          value={reasonForChange}
        >
          <option value="">select reason</option>
          {movementOptions.map(movement => {
            if (movement.type === movementType) {
              return (
                <option key={movement.reasonForChange} value={movement.reasonForChange}>
                  {movement.displayName}
                </option>
              );
            }
            return null;
          })}
        </NativeSelect>
      </FormControl>

      <IntegerSelect
        disableAddBtn={movementType === 'remove' && animalsMoved >= availableAnimals}
        number={animalsMoved}
        handleCountChange={handleCountChange}
      />
    </Fragment>
  );
}

AddRemoveMovement.propTypes = {
  animalsMoved: PropTypes.number.isRequired,
  availableAnimals: PropTypes.number,
  classes: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCountChange: PropTypes.func.isRequired,
  movementOptions: PropTypes.array.isRequired,
  movementType: PropTypes.string.isRequired,
  reasonForChange: PropTypes.string.isRequired
};

AddRemoveMovement.defaultProps = {
  availableAnimals: null
};

export default withStyles(styles)(AddRemoveMovement);
