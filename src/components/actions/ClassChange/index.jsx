import React, { Component, Fragment } from 'react';

import {
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  Button,
  FormHelperText
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import SubtractIcon from '@material-ui/icons/Remove';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// Dependancies
import moment from 'moment';
import axios from 'axios';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'spaceBetween',
    justifyContent: 'center',
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

class ClassChange extends Component {
  state = {
    newChange: {
      createdAt: '',
      reasonForChange: '',
      animalsMoved: 0
    }
  };

  componentDidMount() {
    // NOTE: will end up as an if depending on what route gets user here.

    this.setState((prevState, props) => {
      prevState.category = props.location.state.category;
      prevState.newChange.createdAt = moment().format('YYYY-MM-DD');
      return prevState;
    });
  }

  handleChange = name => event => {
    const value = event.target.value;
    this.setState(prevState => {
      const newState = prevState;
      newState.newChange[name] = value;
      return newState;
    });
  };

  handleChangeLog = () => {
    const { newChange } = this.state;

    // NOTE: need to validate that submitting correct negative numbers

    const changeObj = {};
    changeObj.createdAt = moment(newChange.createdAt);
    changeObj.reasonForChange = newChange.reasonForChange;
    changeObj.animalsMoved = newChange.animalsMoved;

    axios
      .post(`/api/classes/${this.state.category._id}/changes`, changeObj)
      .then(() => this.props.history.push('/manage-classes'));
  };

  handleAdd = () => {
    this.setState(prevState => {
      const newState = prevState;
      newState.newChange.animalsMoved = prevState.newChange.animalsMoved + 1;
      return newState;
    });
  };

  handleRemove = () => {
    this.setState(prevState => {
      const newState = prevState;
      newState.newChange.animalsMoved = prevState.newChange.animalsMoved - 1;
      return newState;
    });
  };

  render() {
    const { newChange, category } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        {category && (
          <Fragment>
            <Typography align="center" variant="h5">
              Log Change
            </Typography>
            <Typography align="left" variant="subtitle2">
              {category.class}
            </Typography>

            <form className={classes.form}>
              <FormControl className={classes.margin}>
                <InputLabel shrink htmlFor="reasonForChange">
                  Reason For Change
                </InputLabel>
                <NativeSelect
                  fullWidth={true}
                  value={newChange.reasonForChange}
                  onChange={this.handleChange('reasonForChange')}
                  input={<Input name="reasonForChange" id="reasonForChange" />}
                >
                  <option value="">None</option>
                  <option value="add">Add</option>
                  <option value="purchase">Purchase</option>
                  <option value="death">Death</option>
                  <option value="theft">Theft</option>
                  <option value="sale">Sale</option>
                  <option value="other">Other</option>
                </NativeSelect>
              </FormControl>

              <div className={classes.animalsMoved}>
                <Typography align="center" variant="h1">
                  {' '}
                  {newChange.animalsMoved}{' '}
                </Typography>

                <div className={classes.buttonContainer}>
                  <Button
                    onClick={this.handleAdd}
                    className={(classes.buttonGreen, classes.button)}
                    variant="fab"
                  >
                    <AddIcon />
                  </Button>

                  <Button
                    onClick={this.handleRemove}
                    className={classNames(classes.buttonRed, classes.button)}
                    variant="fab"
                  >
                    <SubtractIcon />
                  </Button>
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
                  value={newChange.createdAt}
                  onChange={this.handleChange('createdAt')}
                />
              </FormControl>

              <Button
                variant="contained"
                className={classes.margin}
                color="secondary"
                onClick={this.handleChangeLog}
              >
                {' '}
                Log Change{' '}
              </Button>
            </form>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ClassChange);
