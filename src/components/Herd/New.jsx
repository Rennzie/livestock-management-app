import React from 'react';

// dependancies
import axios from 'axios';

import {
  Grid,
  FormControl,
  Input,
  InputLabel,
  NativeSelect,
  Button
} from '@material-ui/core';

export default class HerdNew extends React.Component{
  state={
    name: '',
    category: ''
  };

  handleCreateNewHerd = () => {
    axios.post('/api/herds', this.state)
      .then(res => {

        if(this.props.handleOutsideCreate){
          this.props.handleOutsideCreate(res.data);
        }

        /* just return for now but will be different when use this component elsewhere
        *  currently only being use in the wean animals component
        **/
        return;
      });
  }

  handleChange = name => event => {
    const newState = this.state;
    newState[name] = event.target.value;
    this.setState(newState);
  }

  render() {
    return(
      <Grid container spacing={16}>
        <Grid item xs={12} >
          <FormControl >
            <InputLabel shrink htmlFor='name'>Herd Name</InputLabel>
            <Input
              type='text'
              name='name'
              id='name'
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} >
          <FormControl>
            <InputLabel shrink htmlFor='category'>Category</InputLabel>
            <NativeSelect
              fullWidth={true}
              value={this.state.category}
              onChange={this.handleChange('category')}
              input={<Input name='category' id='category' />}
            >
              <option value=''>None</option>
              <option value='bull-calves'>Bull Calves</option>
              <option value='weaners'>Weaners</option>
              <option value='replacement-heifers'>Replacement Heifers</option>
              <option value='cows'>Cows</option>
              <option value='bulls'>Bulls</option>
              <option value='pasturelot'>Pasturelot</option>
              <option value='feedlot'>Feedlot</option>
              <option value='grassland'>Grassland Fattening</option>
            </NativeSelect>
          </FormControl>
        </Grid>

        <Button
          onClick={this.handleCreateNewHerd}
          variant='contained'
          color='secondary'
        >
          Create Herd
        </Button>
      </Grid>
    );
  }
}
