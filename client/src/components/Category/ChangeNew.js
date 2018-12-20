import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import withStyles from '@material-ui/core/styles/withStyles';

// Dependancies
import moment from 'moment';
import axios from 'axios';
import SubmitButton from '../common/SubmitButton';

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

class ChangeNew extends Component {
  state = {
    newChange: {
      createdAt: '',
      reasonForChange: '',
      animalsMoved: 0
    }
  };

  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/categories/${match.params.categoryId}`).then(res =>
      this.setState(prevState => {
        const newState = prevState;
        newState.category = res.data;
        newState.newChange.createdAt = moment().format('YYYY-MM-DD');
        return newState;
      })
    );
  }

  handleChange = name => event => {
    let { value } = event.target;

    if (name === 'animalsMoved') {
      value = parseInt(value, 10);
    }
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
      .then(() => history.push(`/categories/${category._id}`));
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
              <FormControl fullWidth>
                <InputLabel className={classes.margin} shrink htmlFor="reasonForChange">
                  Reason For Change
                </InputLabel>
                <NativeSelect
                  className={classes.margin}
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
                <IconButton onClick={this.handleAdd}>
                  <Icon style={{ fontSize: 70 }}>arrow_drop_up</Icon>
                </IconButton>

                <Input
                  className={classes.number}
                  type="number"
                  id="animalsMoved"
                  name="animalsMoved"
                  value={newChange.animalsMoved}
                  onChange={this.handleChange('animalsMoved')}
                />

                <IconButton disabled={newChange.animalsMoved === 0} onClick={this.handleRemove}>
                  <Icon style={{ fontSize: 70 }}>arrow_drop_down</Icon>
                </IconButton>
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

              <SubmitButton
                disabled={!newChange.reasonForChange}
                variant="contained"
                className={classes.margin}
                color="secondary"
                handleClick={this.handleChangeLog}
                name="Log Change"
              />
            </form>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ChangeNew);
