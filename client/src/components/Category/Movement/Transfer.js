/* eslint-disable react/require-default-props */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import orderBy from 'lodash/orderBy';
import IntegerSelect from '../../common/IntegerSelect';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  }
});

const sortAsc = (items, sortField) => orderBy(items, item => item[sortField], ['asc']);

function TransferMovement({
  animalsMoved,
  availableAnimals,
  categories,
  classes,
  createdAt,
  handleChange,
  handleCountChange,
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
      {categories && (
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
                {category.category}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      )}

      <IntegerSelect
        disableAddBtn={animalsMoved >= availableAnimals}
        handleCountChange={handleCountChange}
        number={animalsMoved}
      />
    </Fragment>
  );
}

TransferMovement.propTypes = {
  animalsMoved: PropTypes.number.isRequired,
  availableAnimals: PropTypes.number,
  categories: PropTypes.array,
  classes: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCountChange: PropTypes.func.isRequired,
  transferTo: PropTypes.string
};

export default withStyles(styles)(TransferMovement);
