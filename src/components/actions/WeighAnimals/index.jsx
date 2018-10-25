import React from 'react';

// ui components
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  FormGroup,
  Button,
  MobileStepper
} from '@material-ui/core';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons';


// dependancies
import axios from 'axios';
import moment from 'moment';

// components
import HerdCard from '../../Herd/HerdCard.jsx';
import AnimalCard from '../../common/AnimalCard.jsx';
import WeighForm from './WeighForm.jsx';

export default class WeighAnimals extends React.Component{
  state={
    activeStep: 0,
    herdSelected: false,
    animalSelected: false,
    readyToRegister: false,
    weighedAnimals: [],
    newWeight: {
      weight: 0,
      unit: 'kgs',
      date: '',
      timing: 'other'
    }
  };

  componentDidMount() {
    axios.get('/api/herds')
      .then(res => this.setState({herds: res.data}));
  }

  handleHerdSelect = selectedHerd => () => {
    const newState = this.state;

    newState.herdSelected = true;
    newState.selectedHerd = selectedHerd;
    newState.activeStep = 1;

    this.setState(newState);
  }

  handleAnimalSelect = animal => () => {
    const newState = this.state;

    newState.animalSelected = true;
    newState.selectedAnimal = animal;
    newState.lastWeighIn = animal.weights[animal.weights.length - 1];
    newState.newWeight.date = moment().format('YYYY-MM-DD');
    newState.activeStep = 2;

    this.setState(newState);
  }

  handleChange = name => event => {
    const newState = this.state;
    newState.newWeight[name] = event.target.value;
    if(Object.values(newState.newWeight).every(item => item)) {
      newState.readyToRegister = true;
      this.setState(newState);
    }
    this.setState(newState);
  }

  handleSwitchChange = name => event => {
    const newState = this.state;
    newState[name] = event.target.checked;
    this.setState(newState);
  }

  handleWeightRegister = () => {
    //format the newWeight object
    const { newWeight, selectedAnimal } = this.state;
    const unixDate = moment(newWeight.date).unix();
    const weight = {
      weight: newWeight.weight,
      unit: newWeight.unit,
      date: unixDate,
      timing: newWeight.timing
    };
    //send axios request to /bovines/:id/weights
    axios.post(`/api/bovines/${selectedAnimal._id}/weights`, weight);

    this.resetState();
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
            newWeight: {
              weight: 0,
              unit: 'kgs',
              date: '',
              timing: 'other'
            }
          });
      }
    });
  };

  resetState = () => {
    //add the weighed animal to the weighed animals array
    const newState = this.state;
    newState.weighedAnimals.push(newState.selectedAnimal._id);

    //filter the selectedHerd animals
    newState.selectedHerd.animals = newState.selectedHerd.animals.filter( animal =>
      animal._id.toString() !== newState.selectedAnimal._id.toString()
    );
    // newState.selectedAnimal = null;
    newState.animalSelected = false;
    newState.readyToRegister = false;
    newState.newWeight = {
      weight: 0,
      unit: 'kgs',
      date: '',
      timing: 'other'
    };

    //reset the state
    this.setState(newState);
  }

  render() {
    return(
      <div>
        {this.state.herds &&
          <main>
            {!this.state.herdSelected ?
              <Typography variant='h5'>Weigh a herd</Typography>
              :
              <Typography variant='h5'>Weighing {this.state.selectedHerd.name}</Typography>
            }

            {!this.state.herdSelected  &&
              <div>
                <Typography variant='subtitle1'>Which heard is getting weighed?</Typography>
                {this.state.herds.map(herd =>
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
                    handleClick={this.handleAnimalSelect(animal)}
                    animal={animal}
                  />
                )}
              </Grid>
            }

            {this.state.animalSelected &&
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography variant='subtitle1' gutterBottom> Animal being weighed is: {this.state.selectedAnimal.identifier} </Typography>
                </Grid>

                <Grid item xs={6} >
                  <Typography variant='subtitle2' gutterBottom>Last weighed on: {this.state.lastWeighIn.formattedWeighDate}</Typography>
                </Grid>
                <Grid item xs={6} >
                  <Typography variant='subtitle2' gutterBottom>Previous weight: {this.state.lastWeighIn.weight} {this.state.lastWeighIn.unit}</Typography>
                </Grid>
                <Grid item xs={12} >
                  <hr/>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant='subtitle2' gutterBottom>
                    Weight: {this.state.newWeight.weight} {this.state.newWeight.unit }
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant='subtitle2' gutterBottom>
                    Date: {this.state.newWeight.date}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant='subtitle2' gutterBottom>
                    Timing: {this.state.newWeight.timing}
                  </Typography>
                </Grid>
              </Grid>
            }

            {this.state.animalSelected &&
              <WeighForm
                handleChange={this.handleChange}
                newWeight={this.state.newWeight}
              />
            }

            <MobileStepper
              variant="dots"
              steps={3}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button size="small" onClick={this.handleWeightRegister} disabled={!this.state.readyToRegister}>
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
