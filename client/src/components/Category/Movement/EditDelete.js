import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import axios from 'axios';
import SubmitButton from '../../common/SubmitButton';

import AddRemoveMovement from './AddRemove';
import TransferMovement from './Transfer';
import CapitalizeText from '../../common/CapitalizeText';

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

class EditDeleteMovement extends Component {
  state = {};

  /**
   *  Fetchs the correct change to be edit, places it on state to be used in forms
   */
  componentDidMount() {
    const { match } = this.props;

    axios
      .get(`/api/categories/${match.params.categoryId}/changes/${match.params.movementId}`)
      .then(res => {
        const createdAt = moment(res.data.createdAt).format('YYYY-MM-DD');
        const animalsMoved =
          res.data.animalsMoved < 0 ? res.data.animalsMoved * -1 : res.data.animalsMoved;

        let transferPairId = null;
        let transferPairCategory = null;
        if (res.data.transferPairId) {
          // eslint-disable-next-line prefer-destructuring
          transferPairId = res.data.transferPairId;
          // eslint-disable-next-line prefer-destructuring
          transferPairCategory = res.data.transferPairCategory;
        }
        this.setState(() => ({
          createdAt,
          movementType: res.data.movementType,
          animalsMoved,
          reasonForChange: res.data.reasonForChange,
          displayName: res.data.displayName,
          transferPairId,
          transferPairCategory
        }));
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
  handleAddRemoveEdit = () => {
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
      .put(
        `/api/categories/${match.params.categoryId}/changes/${match.params.movementId}`,
        newMovement
      )
      .then(() => history.push(`/manage-categories/${match.params.categoryId}`));
  };

  handleAddRemoveDelete = () => {
    const { match, history } = this.props;
    axios
      .delete(`/api/categories/${match.params.categoryId}/changes/${match.params.movementId}`)
      .then(() => history.push(`/manage-categories/${match.params.categoryId}`));
  };

  /**
   *  Handles the formatting and sending of two requests for transfering
   *  animals out of the current category into the selected category
   */
  handleTransferEdit = () => {
    const {
      createdAt,
      animalsMoved,
      reasonForChange,
      transferPairId,
      transferPairCategory
    } = this.state;
    const { match, history } = this.props;

    const transferOutEdit = {};
    transferOutEdit.createdAt = moment(createdAt);
    transferOutEdit.animalsMoved = animalsMoved * -1;

    const transferInEdit = {};
    transferInEdit.createdAt = moment(createdAt);
    transferInEdit.animalsMoved = animalsMoved;

    // address depends on it being transfer in or out
    let transferOutAddress = '';
    let transferInAddress = '';
    if (reasonForChange === 'transferOut') {
      transferOutAddress = `/api/categories/${match.params.categoryId}/changes/${
        match.params.movementId
      }`;
      transferInAddress = `/api/categories/${transferPairCategory}/changes/${transferPairId}`;
    } else if (reasonForChange === 'transferIn') {
      transferInAddress = `/api/categories/${match.params.categoryId}/changes/${
        match.params.movementId
      }`;
      transferOutAddress = `/api/categories/${transferPairCategory}/changes/${transferPairId}`;
    }

    function sendTransferOutEdit() {
      return axios.put(transferOutAddress, transferOutEdit);
    }

    function sendTransferInEdit() {
      return axios.put(transferInAddress, transferInEdit);
    }

    axios
      .all([sendTransferOutEdit(), sendTransferInEdit()])
      .then(() => history.push(`/manage-categories/${match.params.categoryId}`));
  };

  handleTransferDelete = () => {
    const { transferPairId, transferPairCategory } = this.state;
    const { match, history } = this.props;
    function sendTransferOut() {
      return axios.delete(
        `/api/categories/${match.params.categoryId}/changes/${match.params.movementId}`
      );
    }

    function sendTransferIn() {
      return axios.delete(`/api/categories/${transferPairCategory}/changes/${transferPairId}`);
    }

    axios
      .all([sendTransferOut(), sendTransferIn()])
      .then(() => history.push(`/manage-categories/${match.params.categoryId}`));
  };

  render() {
    const {
      animalsMoved,
      categoryName,
      createdAt,
      movementType,
      reasonForChange
      // transferTo
    } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5" align="center">
          Edit Movement
        </Typography>
        {categoryName && (
          <Typography variant="subtitle1" align="center">
            <CapitalizeText>{categoryName}</CapitalizeText>
          </Typography>
        )}

        {movementType === 'add' && (
          <Typography className={classes.select} variant="subtitle1">
            Edit added Animals
          </Typography>
        )}
        {movementType === 'remove' && (
          <Typography className={classes.select} variant="subtitle1">
            Edit removed Animals
          </Typography>
        )}
        {movementType === 'transfer' && (
          <Typography className={classes.select} variant="subtitle1">
            Edit transfered Animals
          </Typography>
        )}

        {(movementType === 'add' || movementType === 'remove') && (
          <Fragment>
            <AddRemoveMovement
              animalsMoved={animalsMoved}
              createdAt={createdAt}
              handleAddRemoveEdit={this.handleAddRemoveEdit}
              handleChange={this.handleChange}
              handleCountChange={this.handleCountChange}
              movementType={movementType}
              movementOptions={movementOptions}
              reasonForChange={reasonForChange}
            />
            <SubmitButton
              color="secondary"
              disabled={!reasonForChange || animalsMoved < 0}
              handleClick={this.handleAddRemoveEdit}
              name="Edit Movement"
              variant="contained"
            />
            <SubmitButton
              color="secondary"
              disabled={!reasonForChange || animalsMoved < 0}
              handleClick={this.handleAddRemoveDelete}
              name="Delete Movement"
              variant="contained"
            />
          </Fragment>
        )}

        {movementType === 'transfer' && (
          <Fragment>
            <TransferMovement
              animalsMoved={animalsMoved}
              // categories={categories}
              createdAt={createdAt}
              handleChange={this.handleChange}
              handleCountChange={this.handleCountChange}
              // transferTo={transferTo}
            />
            <SubmitButton
              color="secondary"
              handleClick={this.handleTransferEdit}
              name="Edit Transfer"
              variant="contained"
            />
            <SubmitButton
              color="secondary"
              handleClick={this.handleTransferDelete}
              name="Delete Transfer"
              variant="contained"
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

EditDeleteMovement.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(EditDeleteMovement);
