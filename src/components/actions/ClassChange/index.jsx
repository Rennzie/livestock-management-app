import React, {Component, Fragment } from 'react';

import {
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  Button
} from '@material-ui/core';

// Dependancies
import moment from 'moment';
import axios from 'axios';

export default class ClassChange extends Component{
  state={
    newChange: {
      createdAt: '',
      reasonForChange: '',
      animalsMoved: 0
    }
  };

  componentDidMount() {
    this.setState((prevState, props) => {
      console.log('before ===> ', prevState );
      prevState.category = props.location.state.category;
      prevState.newChange.createdAt = moment().format('YYYY-MM-DD');
      return prevState;
    }, () => console.log('after ======>', this.state));
  }
  // recieve the category to update from props
  // select date of change, reason for change, and
  // show simple form for adding or removing animals
  // complete the form
  // send axios request at /api/classes/:id/changes
  // return to /classes-manager

  handleChange = name => event => {
    // const newState = this.state;
    // newState.newChange[name] = event.target.value;
    //
    // this.setState(newState);
    const value = event.target.value;
    this.setState((prevState) => {
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

    axios.post(`/api/classes/${this.state.category._id}/changes`, changeObj)
      .then(() => this.props.history.push('/manage-classes'));
  }

  render() {

    const { newChange } = this.state;

    return(
      <Fragment>
        <Typography align='center' variant='h5'>Log Change</Typography>

        <FormControl >
          <InputLabel shrink htmlFor='createdAt'>Date</InputLabel>
          <Input
            type='date'
            max={newChange.createdAt}
            name='createdAt'
            id='createdAt'
            value={newChange.createdAt}
            onChange={this.handleChange('createdAt')}
          />
        </FormControl>

        <FormControl>
          <InputLabel shrink htmlFor='reasonForChange'>Reason For Change</InputLabel>
          <NativeSelect
            fullWidth={true}
            value={newChange.reasonForChange}
            onChange={this.handleChange('reasonForChange')}
            input={<Input name='reasonForChange' id='reasonForChange' />}
          >
            <option value=''>None</option>
            <option value='add'>Add</option>
            <option value='purchase'>Purchase</option>
            <option value='death'>death</option>
            <option value='theft'>Theft</option>
            <option value='sale'>Sale</option>
            <option value='other'>Other</option>
          </NativeSelect>
        </FormControl>

        <FormControl>
          <InputLabel shrink htmlFor='animalsMoved'>Animals Moved</InputLabel>
          <Input
            type='number'
            name='animalsMoved'
            id='animalsMoved'
            value={newChange.animalsMoved}
            onChange={this.handleChange('animalsMoved')}
          />
        </FormControl>

        <Button color="secondary" onClick={this.handleChangeLog}>  Log Change </Button>

      </Fragment>
    );
  }
}
