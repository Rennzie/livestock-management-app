import React, { Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import SubmitButton from '../../common/SubmitButton';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spaceAround',
    margin: theme.spacing.unit
  },
  animalsMoved: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spaceAround',
    margin: 'auto',
    width: '40%'
  },
  margin: {
    margin: theme.spacing.unit
  },
  number: {
    fontSize: 60,
    textAlign: 'center'
  }
});

// handleAdd = () => {
//   this.setState(prevState => {
//     const newState = prevState;
//     newState.newChange.animalsMoved = prevState.newChange.animalsMoved + 1;
//     return newState;
//   });
// };

// handleRemove = () => {
//   this.setState(prevState => {
//     const newState = prevState;
//     if (newState.newChange.animalsMoved === 0) {
//       return newState;
//     }
//     newState.newChange.animalsMoved = prevState.newChange.animalsMoved - 1;
//     return newState;
//   });
// };

function ChangeForm({ classes, change, handleChange, handleSubmit, changeType }) {
  return (
    <form className={classes.form}>
      <FormControl fullWidth>
        <InputLabel className={classes.margin} shrink htmlFor="reasonForChange">
          Reason For Change
        </InputLabel>
        <NativeSelect
          className={classes.margin}
          value={change.reasonForChange}
          onChange={handleChange('reasonForChange')}
          input={<Input name="reasonForChange" id="reasonForChange" />}
        >
          <option value="">select reason</option>
          {(changeType === 'add' || changeType === 'edit') && (
            <Fragment>
              <option value="births">Births</option>
              <option value="purchases">Purchases</option>
            </Fragment>
          )}
          {(changeType === 'transfer' || changeType === 'edit') && (
            <Fragment>
              <option value="transfersIn">Transfers In</option>
              <option value="transfersOut">Transfers Out</option>
            </Fragment>
          )}
          {(changeType === 'remove' || changeType === 'edit') && (
            <Fragment>
              <option value="death">Deaths</option>
              <option value="theft">Theft</option>
              <option value="sale">Sales</option>
            </Fragment>
          )}
        </NativeSelect>
      </FormControl>

      <FormControl>
        <InputLabel className={classes.margin} htmlFor="createdAt">
          Date
        </InputLabel>
        <Input
          className={classes.margin}
          type="date"
          name="createdAt"
          id="createdAt"
          value={change.createdAt}
          onChange={handleChange('createdAt')}
        />
      </FormControl>
      <div className={classes.animalsMoved}>
        {/* <IconButton onClick={handleAdd}>
          <Icon style={{ fontSize: 70 }}>arrow_drop_up</Icon>
        </IconButton> */}

        <Input
          className={classes.number}
          type="number"
          id="animalsMoved"
          name="animalsMoved"
          value={change.animalsMoved}
          onChange={handleChange('animalsMoved')}
        />

        {/* <IconButton disabled={change.animalsMoved === 0} onClick={handleRemove}>
          <Icon style={{ fontSize: 70 }}>arrow_drop_down</Icon>
        </IconButton> */}
      </div>

      <SubmitButton
        disabled={!change.reasonForChange}
        variant="contained"
        className={classes.margin}
        color="secondary"
        handleClick={handleSubmit(changeType)}
        name="Log Change"
      />
    </form>
  );
}

export default withStyles(styles)(ChangeForm);
