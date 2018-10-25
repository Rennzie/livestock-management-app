import React from 'react';

// ui components
import {
  Typography,
  FormControl,
  FormControlLabel,
  Button,
  FormLabel,
  Radio,
  RadioGroup,
  MobileStepper
} from '@material-ui/core';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons';

// dependancies
import axios from 'axios';

// components
import HerdCard from '../../Herd/HerdCard.jsx';
import AnimalSearchSelect from '../common/AnimalSearchSelect.jsx';

export default class PregTest extends React.Component{
  state={
    activeStep: 0,
    herdSelected: false,
    animalSelected: false,
    testedAnimals: [],
    value: ''
  };

  componentDidMount() {
    axios.get('/api/herds')
      .then(res => res.data.filter(herd => herd.category === 'cows'))
      .then(herds => this.setState({ herds }));
  }

  handleHerdSelect = selectedHerd => () => {
    const newState = this.state;

    newState.herdSelected = true;
    newState.selectedHerd = selectedHerd;
    newState.selectedHerd.animals = newState.selectedHerd.animals.filter(animal =>
      animal.category === 'cow' || animal.category === 'heifer'
    );
    newState.activeStep = 1;

    this.setState(newState);
  }

  handleAnimalSelect = animal => () => {
    const newState = this.state;

    newState.animalSelected = true;
    newState.selectedAnimal = animal;
    newState.activeStep = 2;

    this.setState(newState);
  }

  handleChange = event => {
    this.setState({value: event.target.value});
  }

  handlePregTested = () => {
    //format an object to Submit
    const pregTest = {
      ids: [this.state.selectedAnimal._id],
      key: this.state.value
    };

    // send axios to /bovine/pregnant
    axios.patch('/api/bovines/pregnant', pregTest);

    // set a heifers breeding.status to true and change its category to cow
    if(this.state.selectedAnimal.category === 'heifer') {
      const ids = [ this.state.selectedAnimal._id ];
      axios.patch('/api/bovines/breeding', ids);

      const newCategory = {
        ids: ids,
        newCategory: 'cow'
      };

      axios.patch('/api/bovines/categories', newCategory);
    }

    //reset the state
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
            value: ''
          });
      }
    });
  };

  resetState = () => {
    const newState = this.state;
    newState.testedAnimals.push(newState.selectedAnimal._id);

    newState.selectedHerd.animals = newState.selectedHerd.animals.filter( animal =>
      animal._id.toString() !== newState.selectedAnimal._id.toString()
    );

    newState.animalSelected = false;
    newState.value = '';

    this.setState(newState);
  }

  render() {
    return(
      <div>
        {this.state.herds &&
          <main>
            {!this.state.herdSelected ?
              <Typography variant='h5'>PregTest a herd</Typography>
              :
              <Typography variant='h6'>PregTesting {this.state.selectedHerd.name}</Typography>
            }

            {!this.state.herdSelected  &&
              <div>
                <Typography variant='subtitle1'>Which heard is getting pregtested?</Typography>
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
              <AnimalSearchSelect
                title="Select animal to preg test:"
                animals={this.state.selectedHerd.animals}
                handleAnimalSelect={this.handleAnimalSelect}
              />
            }

            {this.state.animalSelected &&
              <FormControl component="fieldset">
                <FormLabel component="legend"> Pregnancy Status</FormLabel>
                <RadioGroup
                  name="pregnancy"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <FormControlLabel value="isPregnant" control={<Radio />} label="Is Pregnant" />
                  <FormControlLabel value="notInCalf" control={<Radio />} label="Not In Calf" />
                </RadioGroup>
              </FormControl>
            }

            <MobileStepper
              variant="dots"
              steps={3}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button size="small" onClick={this.handlePregTested} disabled={!this.state.value}>
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
