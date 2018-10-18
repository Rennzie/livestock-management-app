import React from 'react';

// dependancies
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
  Button,
  Typography,
  FormGroup
} from '@material-ui/core';

// utils
import Generate from '../../../lib/Generate';

// components
import HerdCard from '../../Herd/HerdCard.jsx';

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
      unit: ''
    }
  };

  componentDidMount() {
    axios.get('/api/herds')
      .then(res => res.data.filter( herd => herd.category === 'cows'))
      .then(cowHerds => this.setState({cowHerds}));
  }

  handleHerdSelect = ( selectedHerd )=> () => {
    const newState = this.state;
    newState.herdSelected = true;
    newState.selectedHerd = selectedHerd;
    newState.selectedHerd.animals = newState.selectedHerd.animals.filter(animal => animal.category === 'cow' && animal.breeding.isPregnant);
    newState.newCalf.herd = selectedHerd._id;
    this.setState(newState, () => console.log('=====>', this.state));
  };

  handleMotherSelect = ( motherId ) => {
    return () => {
      const newState = this.state;
      newState.newCalf.mother = motherId;
      newState.newCalf.identifier = Generate.newIdentifier();
      newState.newCalf._id = Generate.newId();
      newState.motherSelected = true;

      this.setState(newState, () => console.log('=====>', this.state));
    };
  }

  handleChange = name => event => {
    const newState = this.state;
    newState.newCalf[name] = event.target.value;
    if(Object.values(newState.newCalf).every(item => item)) {
      newState.readyToRegister = true;
      this.setState(newState);
    }
    this.setState(newState);
  }

  handleCalfRegister = () => {
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
        unit: newCalf.unit,
        timing: 'birth'
      }]
    };

    const mothersProductionUpdate = {
      calfId: newCalf._id
    };

    axios.post('/api/bovines', calf);
    axios.post(`/api/bovines/${newCalf.mother}/breeding/production`, mothersProductionUpdate);

    this.resetCalfRegister(newCalf.mother);
  }

  resetCalfRegister = (mothersId) => {
    const newState = this.state;

    newState.motherRegistrationComplete.push(mothersId);

    newState.selectedHerd.animals = newState.selectedHerd.animals.filter(animal =>
      animal._id.toString() !== mothersId
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
      unit: ''
    };
    this.setState(newState, () => console.log('the reset state is', this.state));
  }

  render() {
    return (
      <div>
        {this.state.cowHerds &&
          <main>
            {!this.state.selectedHerd ?
              <Typography variant='h5'>Register new Calf</Typography>
              :
              <Typography variant='h5'>Registering calfs to {this.state.selectedHerd.name}</Typography>
            }

            {!this.state.selectedHerd  &&
              <div>
                <Typography variant='subtitle1'>Which heard is registering calves?</Typography>
                {this.state.cowHerds.map(herd =>
                  <HerdCard
                    key={herd._id}
                    herd={herd}
                    onClick={this.handleHerdSelect(herd)}
                  />
                )}
              </div>
            }

            {(this.state.selectedHerd && !this.state.motherSelected) &&
              <Grid container direction='column'>
                <Typography variant='subtitle2'>Select mother:</Typography>
                {this.state.selectedHerd.animals.map( animal =>
                  <Grid item xs={12} key={animal._id}>
                    <Card>
                      <CardContent onClick={this.handleMotherSelect(animal._id)}>
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

            {this.state.motherSelected &&
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>
                    New Calf: {this.state.newCalf.identifier}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2' >
                    Category: {this.state.newCalf.category}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2' >
                    D.O.B: {this.state.newCalf.birthDate}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2' >
                    Breed: {this.state.newCalf.breed}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2' >
                    Mother: {this.state.newCalf.mother}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2' >
                    Weight: {this.state.newCalf.weight} {this.state.newCalf.unit }
                  </Typography>
                </Grid>

                <Grid item xs={12}><hr/></Grid>

              </Grid>
            }

            {this.state.motherSelected &&
              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel shrink htmlFor='breed'>Breed</InputLabel>
                    <NativeSelect
                      fullWidth={true}
                      value={this.state.newCalf.breed}
                      onChange={this.handleChange('breed')}
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
                      fullWidth={true}
                      value={this.state.newCalf.category}
                      onChange={this.handleChange('category')}
                      input={<Input name='category' id='category' />}
                    >
                      <option value=''>None</option>
                      <option value='calf'>Calf</option>
                      <option value='bull-calf'>Bull-Calf</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormGroup row>
                    <FormControl>
                      <InputLabel shrink htmlFor='weight'>Weight</InputLabel>
                      <Input
                        type='number'
                        name='weight'
                        id='weight'
                        value={this.state.newCalf.weight}
                        onChange={this.handleChange('weight')}
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel shrink htmlFor='unit'>Units</InputLabel>
                      <NativeSelect
                        fullWidth={true}
                        value={this.state.newCalf.unit}
                        onChange={this.handleChange('unit')}
                        input={<Input name='unit' id='unit' />}
                      >
                        <option value=''>None</option>
                        <option value='kgs'>Kilograms</option>
                      </NativeSelect>
                    </FormControl>

                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel shrink htmlFor='birthDate'>Date of Birth</InputLabel>
                    <Input
                      type='date'
                      name='birthDate'
                      id='birthDate'
                      value={this.state.newCalf.birthDate}
                      onChange={this.handleChange('birthDate')}
                    />
                  </FormControl>
                </Grid>

                <Button
                  disabled={!this.state.readyToRegister}
                  onClick={this.handleCalfRegister}
                  variant='contained'
                  color='secondary'
                >
                  Register Calf
                </Button>
              </Grid>
            }


          </main>
        }
      </div>
    );
  }
}
