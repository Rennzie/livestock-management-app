import React from 'react';

// dependancies
import axios from 'axios';
import moment from 'moment';
import {
  Grid,
  NativeSelect,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  FormGroup,
  MobileStepper
} from '@material-ui/core';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons';

// utils
import Generate from '../../../lib/Generate';

// components
import HerdCard from '../../Herd/HerdCard.jsx';
import AnimalCard from '../../common/AnimalCard.jsx';

export default class RegisterCalf extends React.Component{
  state={
    activeStep: 0,
    herdSelected: false,
    animalSelected: false,
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
    newState.activeStep = 1;
    this.setState(newState, () => console.log('=====>', this.state));
  };

  handleAnimalSelect = ( motherId ) => {
    return () => {
      const newState = this.state;
      newState.newCalf.mother = motherId;
      newState.newCalf.identifier = Generate.newIdentifier();
      newState.newCalf._id = Generate.newId();
      newState.animalSelected = true;
      newState.activeStep = 2;

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
    newState.animalSelected = false;
    newState.readyToRegister = false;
    newState.activeStep = 1;
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

  handleBack = () => {
    this.setState(state => {
      switch(state.activeStep){
        case 0:
          return this.props.history.push('/');
        case 1:
          return ({
            activeStep: state.activeStep - 1,
            herdSelected: false
          });
        case 2:
          return ({
            activeStep: state.activeStep - 1,
            animalSelected: false,
            readyToRegister: false,
            newCalf: {
              category: '',
              birthDate: '',
              breed: '',
              mother: '',
              herd: '',
              weight: '',
              unit: ''
            }
          });
      }
    });
  };

  render() {

    return (
      <div>
        {this.state.cowHerds &&
          <main>
            {!this.state.herdSelected ?
              <Typography variant='h5'>Register new Calf</Typography>
              :
              <Typography variant='h5'>Registering calfs to {this.state.selectedHerd.name}</Typography>
            }

            {!this.state.herdSelected  &&
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

            {(this.state.herdSelected && !this.state.animalSelected) &&
              <Grid container direction='column'>
                <Typography variant='subtitle2'>Select mother:</Typography>
                {this.state.selectedHerd.animals.map( animal =>
                  <AnimalCard
                    key={animal._id}
                    handleClick={this.handleAnimalSelect(animal._id)}
                    animal={animal}
                  />
                )}
              </Grid>
            }

            {/* New Calf info display */}
            {this.state.animalSelected &&
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

            {/* New calf info collect */}
            {this.state.animalSelected &&
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
              </Grid>
            }

            <MobileStepper
              variant="dots"
              steps={3}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button size="small" onClick={this.handleCalfRegister} disabled={!this.state.readyToRegister}>
                  Register
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </main>
        }
      </div>
    );
  }
}
