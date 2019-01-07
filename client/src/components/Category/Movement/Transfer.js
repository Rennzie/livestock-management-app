import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import orderBy from 'lodash/orderBy';
import IntegerSelect from '../../common/IntegerSelect';
import SubmitButton from '../../common/SubmitButton';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  }
});

const sortAsc = (items, sortField) => orderBy(items, item => item[sortField], ['asc']);

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
        onChange={handleChange('createdAt')}
        type="date"
        value={createdAt}
      />
      <FormControl variant="outlined" required fullWidth>
        <NativeSelect
          className={classes.margin}
          input={<Input name="transferTo" id="transferTo" />}
          onChange={handleChange('transferTo')}
          value={transferTo}
        >
          <option value="">transfer into...</option>
          {sortAsc(categories, 'category').map(category => (
            <option key={category._id} value={category._id}>
              {/* <CapitalizeText>{category.category}</CapitalizeText> */}
              {category.category}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

      <IntegerSelect handleCountChange={handleCountChange} number={animalsMoved} />
      <SubmitButton
        color="secondary"
        disabled={!transferTo}
        handleClick={handleTransferSubmit}
        name="Log Movement"
        variant="contained"
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
