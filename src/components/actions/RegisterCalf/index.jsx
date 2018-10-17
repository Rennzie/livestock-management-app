import React from 'react';

import axios from 'axios';
import moment from 'moment';
import {
  Grid,
  Card,
  CardContent,
  NativeSelect,
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button } from '@material-ui/core';

// components
import HerdCard from '../../Herd/HerdCard.jsx';

// untils
import Generate from '../../../lib/Generate';

export default class RegisterCalf extends React.Component{
  state={
    herdSelected: false,
    motherSelected: false,
    readyToRegister: false,
    motherRegistrationComplete: [],
    newCalf: {
      identifier: '',
      category: '',
      birthDate: '',
      breed: '',
      mother: '',
      herd: '',
      weight: '',
      units: ''
    }
  };

  componentDidMount() {
    axios.get('/api/herds')
      .then(res => res.data.filter( herd => herd.category === 'cows'))
      .then(cowHerds => this.setState({cowHerds}));
  }

  // componentDidUpdate() {
  //   const newState = this.state;
  //
  //   return;
  // }

  handleHeardSelect = ( currentHerd ) => {
    return () => {
      const newState = this.state;
      newState.herdSelected = true;
      newState.currentHerd = currentHerd;
      newState.currentHerd.animals = newState.currentHerd.animals.filter(animal => animal.category === 'cow');
      newState.newCalf.herd = currentHerd._id;

      this.setState(newState, () => console.log('=====>', this.state));
    };
  }

  handleChooseMother = ( motherId ) => {
    return () => {
      const newState = this.state;
      newState.newCalf.mother = motherId;
      newState.newCalf.identifier = Generate.newIdentifier();
      newState.newCalf._id = Generate.newId();
      newState.motherSelected = true;

      this.setState(newState, () => console.log('=====>', this.state));
    };
  }

  handleSelectChange = name => event => {
    const newState = this.state;
    newState.newCalf[name] = event.target.value;
    if(Object.values(newState.newCalf).every(item => item)) {
      newState.readyToRegister = true;
      this.setState(newState);
    }
    this.setState(newState);
  }

  handleCalfRegister = () => {
    //create a calf object
    const newState = this.state;
    const { newCalf } = newState;
    const unixBirthDate = moment(newCalf.birthDate).unix();
    const calf = {
      identifier: newCalf.identifier,
      category: newCalf.category,
      birthDate: unixBirthDate,
      breed: newCalf.breed,
      mother: newCalf.mother,
      herd: newCalf.herd,
      weights: [{
        weight: newCalf.weights,
        units: newCalf.units,
        timing: 'birth'
      }]
    };

    // get the calfs id for motherId
    const mothersProductionUpdate = {
      calfId: newCalf._id
    };
    // submit 2 axios requests
    axios.post('/api/bovines', calf);

    axios.post(`/api/bovines/${newCalf.mother}/breeding/production`, mothersProductionUpdate);
    // add the mother in calf registerd array
    newState.motherRegistrationComplete.push(newCalf.mother);
    // remove that mother from the cowHerds animals array
    newState.currentHerd.animals = newState.currentHerd.animals.filter(animal =>
      animal._id.toString() !== newCalf.mother
    );
    newState.motherSelected = false;
    newState.readyToRegister = false;
    newState.newCalf = {
      category: '',
      birthDate: '',
      breed: '',
      mother: '',
      herd: '',
      weight: '',
      units: ''
    };
    // reset the state for the next calf
    this.setState(newState, () => console.log('the reset state is', this.state));
  }

  render() {
    return (
      <div>
        {this.state.cowHerds &&
          <main>
            {!this.state.currentHerd ?
              <h1>Register new Calf</h1>
              :
              <h3>Registering calfs to {this.state.currentHerd.name}</h3>
            }

            {!this.state.currentHerd  &&
              <div>
                <h2>Which heard is registering calves?</h2>
                {this.state.cowHerds.map(herd =>
                  <HerdCard
                    key={herd._id}
                    herd={herd}
                    onClick={this.handleHeardSelect(herd)}
                  />
                )}
              </div>
            }

            {(this.state.currentHerd && !this.state.motherSelected) &&
              <Grid container direction='column'>
                {this.state.currentHerd.animals.map( animal =>
                  <Grid item xs={12} key={animal._id}>
                    <Card>
                      <CardContent onClick={this.handleChooseMother(animal._id)}>
                        <Grid container alignItems='center'>
                          <Grid item xs={8} >
                            <p> { animal.identifier } </p>
                          </Grid>
                          <Grid item xs={4} >
                            <p> { animal.breed } </p>
                            <p> { animal.category } </p>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            }

            {this.state.newCalf.mother &&
              <Grid container>
                <Grid item xs={12}>
                  <p>New Calf: {this.state.newCalf.identifier}</p>
                </Grid>
                <Grid item xs={6}><p>Category: </p>{this.state.newCalf.category}</Grid>
                <Grid item xs={6}><p>D.O.B: </p>{this.state.newCalf.birthDate}</Grid>
                <Grid item xs={6}><p>Breed: </p>{this.state.newCalf.breed}</Grid>
                <Grid item xs={6}><p>Mother: </p>{this.state.newCalf.mother}</Grid>
                <Grid item xs={6}>
                  <p>Weight: </p>
                  {this.state.newCalf.weight} {this.state.newCalf.units }
                </Grid>

              </Grid>
            }

            {this.state.motherSelected &&
              <Grid container>
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel shrink htmlFor='breed'>Breed</InputLabel>
                    <NativeSelect
                      fullWidth
                      value={this.state.newCalf.breed}
                      onChange={this.handleSelectChange('breed')}
                      input={<Input name='breed' id='breed' />}
                    >
                      <option value=''>None</option>
                      <option value='Hereford'>Hereford</option>
                      <option value='Brahman'>Brahman</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel shrink htmlFor='category'>Category</InputLabel>
                    <NativeSelect
                      fullWidth
                      value={this.state.newCalf.category}
                      onChange={this.handleSelectChange('category')}
                      input={<Input name='category' id='category' />}
                    >
                      <option value=''>None</option>
                      <option value='calf'>Calf</option>
                      <option value='bull-calf'>Bull-Calf</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>

                <Grid>
                  <TextField
                    id='weight'
                    label='Weight'
                    type='number'
                    value={this.state.newCalf.weight}
                    onChange={this.handleSelectChange('weight')}
                    placeholder='250'
                    margin='normal'
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel shrink htmlFor='units'>Units</InputLabel>
                    <NativeSelect
                      fullWidth
                      value={this.state.newCalf.units}
                      onChange={this.handleSelectChange('units')}
                      input={<Input name='units' id='units' />}
                    >
                      <option value=''>None</option>
                      <option value='kgs'>Kilograms</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel shrink htmlFor='birthDate'>Date of Birth</InputLabel>
                    <Input
                      type='date'
                      name='birthDate'
                      id='birthDate'
                      value={this.state.newCalf.birthDate}
                      onChange={this.handleSelectChange('birthDate')}
                    />
                  </FormControl>
                </Grid>

                {this.state.readyToRegister &&
                  <Grid item xs={12}>
                    <Button
                      onClick={this.handleCalfRegister}
                      variant='contained'
                      color='secondary'
                    >
                      Register Calf
                    </Button>
                  </Grid>
                }
              </Grid>
            }


          </main>
        }
      </div>
    );
  }
}
