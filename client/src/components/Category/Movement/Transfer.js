import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import IntegerSelect from '../../common/IntegerSelect';
import SubmitButton from '../../common/SubmitButton';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  }
});

function TransferMovement({
  animalsMoved,
  categories,
  classes,
  createdAt,
  handleChange,
  handleCountChange,
  handleTransferSubmit,
  transferTo
}) {
  return (
    <Fragment>
      <TextField
        className={classes.margin}
        id="createdAt"
        label="Transfer Date"
        type="date"
        onChange={handleChange('createdAt')}
        value={createdAt}
      />
      <FormControl variant="outlined" required fullWidth>
        <NativeSelect
          value={transferTo}
          className={classes.margin}
          onChange={handleChange('transferTo')}
          input={<Input name="transferTo" id="transferTo" />}
        >
          <option value="">transfer into...</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {/* <CapitalizeText>{category.category}</CapitalizeText> */}
              {category.category}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <IntegerSelect number={animalsMoved} handleCountChange={handleCountChange} />
      <SubmitButton
        name="Log Movement"
        disabled={!transferTo}
        handleClick={handleTransferSubmit}
        variant="contained"
        color="secondary"
      />
    </Fragment>
  );
}

TransferMovement.propTypes = {
  animalsMoved: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCountChange: PropTypes.func.isRequired,
  handleTransferSubmit: PropTypes.func.isRequired,
  transferTo: PropTypes.string.isRequired
};

export default withStyles(styles)(TransferMovement);
