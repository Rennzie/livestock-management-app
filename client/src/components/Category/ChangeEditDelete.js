import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';

import withStyles from '@material-ui/core/styles/withStyles';

// Dependancies
import moment from 'moment';
import axios from 'axios';

import SubmitButton from '../common/SubmitButton';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'spaceAround',
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonGreen: {
    backgroundColor: 'green'
  },
  buttonRed: {
    backgroundColor: 'red'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class ChangeEditDelete extends Component {
  state = {};

  componentDidMount() {
    const { match } = this.props;
    axios
      .get(`/api/categories/${match.params.categoryId}/changes/${match.params.changeId}`)
      .then(res =>
        this.setState(prevState => {
          const newState = prevState;
          newState.createdAt = moment(res.data.createdAt).format('YYYY-MM-DD');
          newState.animalsMoved =
            res.data.animalsMoved < 0 ? res.data.animalsMoved * -1 : res.data.animalsMoved;
          newState.reasonForChange = res.data.reasonForChange;
          return newState;
        })
      );
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState(prevState => {
      const newState = prevState;
      newState[name] = value;
      return newState;
    });
  };

  handleEditChange = () => {
    const { createdAt, animalsMoved, reasonForChange } = this.state;
    const { history, match } = this.props;

    const change = reasonForChange;

    const updatedChangeObj = {};
    updatedChangeObj.createdAt = moment(createdAt);
    updatedChangeObj.reasonForChange = reasonForChange;
    updatedChangeObj.animalsMoved = animalsMoved;

    // To ensure we send a negative number to database in the correct instance
    if (change === 'death' || change === 'theft' || change === 'sale') {
      updatedChangeObj.animalsMoved = animalsMoved * -1;
    }

    axios
      .put(
        `/api/categories/${match.params.categoryId}/changes/${match.params.changeId}`,
        updatedChangeObj
      )
      .then(() => history.push(`/manage-categories/${match.params.categoryId}/changes/history`));
  };

  handleDeleteChange = () => {
    const { history, match } = this.props;
    axios
      .delete(`/api/categories/${match.params.categoryId}/changes/${match.params.changeId}`)
      .then(() => history.push(`/manage-categories/${match.params.categoryId}/changes/history`));
  };

  handleAdd = () => {
    this.setState(prevState => {
      const newState = prevState;
      newState.animalsMoved = prevState.animalsMoved + 1;
      return newState;
    });
  };

  handleRemove = () => {
    this.setState(prevState => {
      const newState = prevState;
      if (newState.animalsMoved === 0) {
        return newState;
      }
      newState.animalsMoved = prevState.animalsMoved - 1;
      return newState;
    });
  };

  render() {
    const { reasonForChange, createdAt, animalsMoved } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography align="center" variant="h5">
          Edit/Delete Change
        </Typography>
        {createdAt && (
          <Fragment>
            <form className={classes.form}>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel shrink htmlFor="reasonForChange">
                  Reason For Change
                </InputLabel>
                <NativeSelect
                  value={reasonForChange}
                  onChange={this.handleChange('reasonForChange')}
                  input={<Input name="reasonForChange" id="reasonForChange" />}
                >
                  <option value="">None</option>
                  <option value="add">Add</option>
                  <option value="purchase">Purchase</option>
                  <option value="death">Death</option>
                  <option value="theft">Theft</option>
                  <option value="sale">Sale</option>
                </NativeSelect>
              </FormControl>

              <div className={classes.animalsMoved}>
                <Typography align="center" variant="h1">
                  {' '}
                  {animalsMoved}{' '}
                </Typography>

                <div className={classes.buttonContainer}>
                  <Fab
                    color="primary"
                    onClick={this.handleAdd}
                    className={classes.button}
                    variant="round"
                  >
                    <AddIcon />
                  </Fab>

                  <Fab
                    disabled={animalsMoved === 0}
                    color="secondary"
                    onClick={this.handleRemove}
                    className={classes.button}
                    variant="round"
                  >
                    <SubtractIcon />
                  </Fab>
                </div>
              </div>

              <FormControl className={classes.margin}>
                <InputLabel shrink htmlFor="createdAt">
                  Date
                </InputLabel>
                <Input
                  type="date"
                  name="createdAt"
                  id="createdAt"
                  value={createdAt}
                  onChange={this.handleChange('createdAt')}
                />
              </FormControl>

              <SubmitButton
                disabled={!reasonForChange}
                variant="contained"
                className={classes.margin}
                color="secondary"
                handleClick={this.handleEditChange}
                name="Edit Change"
              />
              <SubmitButton
                disabled={!reasonForChange}
                variant="contained"
                className={classes.margin}
                color="secondary"
                handleClick={this.handleDeleteChange}
                name="Delete Change"
              />
            </form>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ChangeEditDelete);
