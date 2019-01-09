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

import AddRemoveMovement from './AddRemove';
import TransferMovement from './Transfer';
import CapitalizeText from '../../common/CapitalizeText';
import SubmitButton from '../../common/SubmitButton';
import Generate from '../../../lib/Generate';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3
  },
  select: {
    margin: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit
  }
});

const movementOptions = [
  {
    reasonForChange: 'initial-add',
    displayName: 'Initial Add',
    type: 'add',
    multiplier: 1
  },
  {
    reasonForChange: 'births',
    displayName: 'Births',
    type: 'add',
    multiplier: 1
  },
  {
    reasonForChange: 'purchases',
    displayName: 'Purchases',
    type: 'add',
    multiplier: -1
  },
  {
    reasonForChange: 'deaths',
    displayName: 'Deaths',
    type: 'remove',
    multiplier: -1
  },
  {
    reasonForChange: 'sales',
    displayName: 'Sales',
    type: 'remove',
    multiplier: -1
  },
  {
    reasonForChange: 'theft',
    displayName: 'Theft',
    type: 'remove',
    multiplier: -1
  },
  {
    reasonForChange: 'transfer-in',
    displayName: 'Transfer In',
    type: 'transfer',
    multiplier: 1
  },
  {
    reasonForChange: 'transfer-out',
    displayName: 'Transfer Out',
    type: 'transfer',
    multiplier: -1
  }
];

class NewMovement extends Component {
  state = {
    animalsMoved: 0,
    createdAt: '',
    movementType: 'remove',
    reasonForChange: '',
    transferTo: ''
  };

  /**
   *  Fetchs the correct farm incase the movement is a transfer
   *  Filters out the current category from the list to avoid transfering into
   *  the same category (this out be redundant).
   */
  componentDidMount() {
    const { location, match } = this.props;
    axios.get(`/api/farms/${location.state.farmId}`).then(res => {
      const otherCategories = res.data.categories.filter(
        category => category._id.toString() !== match.params.categoryId
      );
      const currentCategory = res.data.categories.filter(
        category => category._id.toString() === match.params.categoryId
      )[0];
      this.setState(
        () => ({
          categoryName: location.state.categoryName,
          categories: otherCategories,
          createdAt: moment().format('YYYY-MM-DD'),
          availableAnimals: currentCategory.currentMonthDetail.closingTotal
        }),
        () => console.log('STATE===========> ', this.state)
      );
    });
  }

  handleSelectMoveType = event => {
    const { value } = event.target;
    const reasonForChange = '';
    this.setState(() => ({ movementType: value, reasonForChange }));
  };

  handleChange = name => event => {
    const { value } = event.target;
    this.setState(() => ({ [name]: value }));
  };

  /**
   *  Handler used for IngeterSelect component. It will updated the number
   *  depending on the method used, button up, down, or cursor change.
   *
   *  It ensures the end result is a number and not a string
   */
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

  /**
   * Simply handles the post request to submit an add or remove movement
   */
  handleAddRemoveSubmit = () => {
    const { createdAt, reasonForChange, movementType } = this.state;
    let { animalsMoved } = this.state;
    const { match, history } = this.props;

    if (movementType === 'remove') {
      animalsMoved *= -1;
    }

    const movementDetailObj = movementOptions.filter(
      movement => movement.reasonForChange === reasonForChange
    );

    const newMovement = {};
    newMovement.createdAt = moment(createdAt);
    newMovement.animalsMoved = animalsMoved;
    newMovement.reasonForChange = reasonForChange;
    newMovement.displayName = movementDetailObj.displayName;
    newMovement.multiplier = movementDetailObj.multiplier;
    newMovement.movementType = movementType;

    axios
      .post(`/api/categories/${match.params.categoryId}/changes`, newMovement)
      .then(() => history.push(`/manage-categories/${match.params.categoryId}`));
  };

  /**
   *  Handles the formatting and sending of two requests for transfering
   *  animals out of the current category into the selected category
   */
  handleTransferSubmit = () => {
    const { createdAt, animalsMoved, transferTo } = this.state;
    const { match, history } = this.props;

    const OUT_ID = Generate.newId();
    const IN_ID = Generate.newId();

    const transferOut = {
      _id: OUT_ID,
      displayName: 'Transfer Out',
      multiplier: -1,
      reasonForChange: 'transferOut',
      transferPairId: IN_ID,
      movementType: 'transfer'
    };

    transferOut.createdAt = moment(createdAt);
    transferOut.animalsMoved = animalsMoved * -1;
    transferOut.transferPairCategory = transferTo;

    const transferIn = {
      _id: IN_ID,
      displayName: 'Transfer In',
      multiplier: 1,
      reasonForChange: 'transferIn',
      transferPairId: OUT_ID,
      movementType: 'transfer'
    };
    transferIn.createdAt = moment(createdAt);
    transferIn.animalsMoved = animalsMoved;
    transferIn.transferPairCategory = match.params.categoryId;

    function sendTransferOut() {
      return axios.post(`/api/categories/${match.params.categoryId}/changes`, transferOut);
    }

    function sendTransferIn() {
      return axios.post(`/api/categories/${transferTo}/changes`, transferIn);
    }

    axios
      .all([sendTransferOut(), sendTransferIn()])
      .then(() => history.push(`/manage-categories/${match.params.categoryId}`));
  };

  render() {
    const {
      animalsMoved,
      availableAnimals,
      categories,
      categoryName,
      createdAt,
      movementType,
      reasonForChange,
      transferTo
    } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5" align="center">
          New Movement
        </Typography>
        {categoryName && (
          <Fragment>
            <Typography variant="subtitle1" align="center">
              <CapitalizeText>{categoryName}</CapitalizeText>
            </Typography>
            <Typography className={classes.margin} variant="subtitle1">
              Before Movement: {availableAnimals}
            </Typography>
            <Typography className={classes.margin} variant="subtitle1">
              After Movement:{' '}
              {movementType === 'add'
                ? availableAnimals + animalsMoved
                : availableAnimals - animalsMoved}
            </Typography>
          </Fragment>
        )}
        <FormControl variant="outlined" required fullWidth>
          <InputLabel className={classes.select} htmlFor="movementType">
            Movements Type
          </InputLabel>
          <NativeSelect
            value={movementType}
            className={classes.select}
            onChange={this.handleSelectMoveType}
            input={<Input name="movementType" id="movementType" />}
          >
            <option value="add">Add Animals</option>
            <option value="remove">Remove Animals</option>
            <option value="transfer">Transfer Out of Category</option>
          </NativeSelect>
        </FormControl>

        {(movementType === 'add' || movementType === 'remove') && categories && (
          <Fragment>
            <AddRemoveMovement
              animalsMoved={animalsMoved}
              availableAnimals={availableAnimals}
              createdAt={createdAt}
              handleAddRemoveSubmit={this.handleAddRemoveSubmit}
              handleChange={this.handleChange}
              handleCountChange={this.handleCountChange}
              movementType={movementType}
              movementOptions={movementOptions}
              reasonForChange={reasonForChange}
            />
            <SubmitButton
              color="secondary"
              disabled={!reasonForChange || animalsMoved < 0}
              handleClick={this.handleAddRemoveSubmit}
              name="Log Movement"
              variant="contained"
            />
          </Fragment>
        )}

        {movementType === 'transfer' && categories && (
          <Fragment>
            <TransferMovement
              animalsMoved={animalsMoved}
              availableAnimals={availableAnimals}
              categories={categories}
              createdAt={createdAt}
              handleChange={this.handleChange}
              handleCountChange={this.handleCountChange}
              handleTransferSubmit={this.handleTransferSubmit}
              transferTo={transferTo}
            />
            <SubmitButton
              color="secondary"
              disabled={!transferTo}
              handleClick={this.handleTransferSubmit}
              name="Log Transfer"
              variant="contained"
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

NewMovement.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(NewMovement);
