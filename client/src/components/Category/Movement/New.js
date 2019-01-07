import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import axios from 'axios';
import SubmitButton from '../../common/SubmitButton';

import AddRemoveMovement from './AddRemove';
import TransferMovement from './Transfer';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3
  },
  select: {
    margin: theme.spacing.unit * 2
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
    movementType: 'remove',
    reasonForChange: '',
    animalsMoved: 0,
    createdAt: ''
  };

  componentDidMount() {
    this.setState(() => ({ createdAt: moment().format('YYYY-MM-DD') }));
  }

  handleRadioChange = event => {
    const { value } = event.target;
    const reasonForChange = '';
    this.setState(() => ({ movementType: value, reasonForChange }));
  };

  handleChange = name => event => {
    const { value } = event.target;
    this.setState(() => ({ [name]: value }));
  };

  handleCountChange = countType => event => {
    if (countType === 'countUp') {
      this.setState(prevState => ({ animalsMoved: prevState.animalsMoved + 1 }));
    }

    if (countType === 'countDown') {
      this.setState(prevState => ({ animalsMoved: prevState.animalsMoved - 1 }));
    }

    if (countType === 'countChange') {
      let animalsMoved;
      if (!event.target.value) {
        animalsMoved = null;
      } else {
        animalsMoved = parseInt(event.target.value, 10);
      }
      this.setState(() => ({ animalsMoved }));
    }
  };

  handleAddRemoveSubmit = () => {
    const { createdAt, reasonForChange, movementType } = this.state;
    let { animalsMoved } = this.state;
    const { match, history } = this.props;

    if (movementType === 'remove') {
      animalsMoved *= -1;
    }

    const newMovement = {};
    newMovement.createdAt = moment(createdAt);
    newMovement.animalsMoved = animalsMoved;
    newMovement.reasonForChange = reasonForChange;

    axios
      .post(`/api/categories/${match.params.categoryId}/changes`)
      .then(() => history.push(`/manage-categories/${match.params.categoryId}`));
  };

  // NEXT: bug with data presented to history causing capitalizetext to crash

  render() {
    const { movementType, reasonForChange, animalsMoved, createdAt } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="h5" align="center">
          New Movement
        </Typography>
        <FormControl variant="outlined" required fullWidth>
          <InputLabel className={classes.select} htmlFor="movementType">
            Movements Type
          </InputLabel>
          <NativeSelect
            value={movementType}
            className={classes.select}
            onChange={this.handleRadioChange}
            input={<Input name="movementType" id="movementType" />}
          >
            <option value="add">Add Animals</option>
            <option value="remove">Remove Animals</option>
            <option value="transfer">Transfer Animals</option>
          </NativeSelect>
        </FormControl>

        {(movementType === 'add' || movementType === 'remove') && (
          <AddRemoveMovement
            movementType={movementType}
            handleChange={this.handleChange}
            handleCountChange={this.handleCountChange}
            movementOptions={movementOptions}
            reasonForChange={reasonForChange}
            animalsMoved={animalsMoved}
            createdAt={createdAt}
          />
        )}

        {movementType === 'transfer' && <TransferMovement />}
        <SubmitButton
          name="Log Movement"
          disabled={!reasonForChange}
          handleClick={this.handleAddRemoveSubmit}
          variant="contained"
          color="secondary"
        />
      </Fragment>
    );
  }
}

NewMovement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewMovement);
