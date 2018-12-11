import React, { Component, Fragment } from 'react';

import {
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  Button,
  Fab
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

class CategoryChange extends Component {
  state = {
    newChange: {
      createdAt: '',
      reasonForChange: '',
      animalsMoved: 0
    }
  };

  componentDidMount() {
    const { location } = this.props;
    axios.get(`/api/categories/${location.state.categoryId}`).then(res =>
      this.setState(
        prevState => {
          const newState = prevState;
          newState.category = res.data;
          newState.newChange.createdAt = moment().format('YYYY-MM-DD');
          return newState;
        },
        () => console.log(this.state)
      )
    );
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState(prevState => {
      const newState = prevState;
      newState.newChange[name] = value;
      return newState;
    });
  };

  handleChangeLog = () => {
    const { newChange, category } = this.state;
    const { history } = this.props;

    const change = newChange.reasonForChange;

    const changeObj = {};
    changeObj.createdAt = moment(newChange.createdAt);
    changeObj.reasonForChange = newChange.reasonForChange;
    changeObj.animalsMoved = newChange.animalsMoved;

    // To ensure we send a negative number to database in the correct instance
    if (change === 'death' || change === 'theft' || change === 'sale') {
      changeObj.animalsMoved = newChange.animalsMoved * -1;
    }

    axios
      .post(`/api/categories/${category._id}/changes`, changeObj)
      .then(() => history.push(`/${category.farm.name}/${category.farm._id}/manage-categories`));
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
      if (newState.newChange.animalsMoved === 0) {
        return newState;
      }
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
            <Typography align="center" variant="subtitle1">
              {category.farm.name} {category.category}
            </Typography>

            <form className={classes.form}>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel shrink htmlFor="reasonForChange">
                  Reason For Change
                </InputLabel>
                <NativeSelect
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
                </NativeSelect>
              </FormControl>

              <div className={classes.animalsMoved}>
                <Typography align="center" variant="h1">
                  {' '}
                  {newChange.animalsMoved}{' '}
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
                    disabled={newChange.animalsMoved === 0}
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
                  value={newChange.createdAt}
                  onChange={this.handleChange('createdAt')}
                />
              </FormControl>

              <Button
                disabled={!newChange.reasonForChange}
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

export default withStyles(styles)(CategoryChange);
