import React from 'react';

// ui components
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  Button,
  MobileStepper
} from '@material-ui/core';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

// dependancies
import axios from 'axios';

// components
import HerdCard from '../../Herd/HerdCard';
import AnimalSearchSelect from '../common/AnimalSearchSelect';
import HerdNew from '../../Herd/New';

export default class WeanAnimals extends React.Component {
  state = {
    activeStep: 0,
    herdSelected: false,
    animalSelected: false,
    readyToRegister: false,
    weanToHerdSelected: false,
    creatingNewHerd: false,
    registerdCalves: [],
    category: ''
  };

  componentDidMount() {
    axios.get('/api/herds').then(res => {
      const herds = res.data.filter(herd => herd.category === 'cows');
      this.setState({ herds, allHerds: res.data });
    });
  }

  // step 0
  handleHerdSelect = selectedHerd => () => {
    const newState = this.state;

    newState.herdSelected = true;
    newState.selectedHerd = selectedHerd;
    newState.selectedHerd.animals = newState.selectedHerd.animals.filter(
      animal => animal.category === 'calf' || animal.category === 'bull-calf'
    );
    newState.activeStep = 1;

    this.setState(newState);
  };

  // step 1
  handleAnimalSelect = animal => () => {
    const newState = this.state;

    newState.animalSelected = true;
    newState.selectedAnimal = animal;
    newState.activeStep = 2;

    this.setState(newState);
  };

  // step 2
  handleWeanToSelect = herd => () => {
    const newState = this.state;
    newState.weanToHerdSelected = true;
    newState.selectedWeanToHerd = herd;
    newState.activeStep = 3;

    this.setState(newState);
  };

  // step 3
  handleWeanChange = name => event => {
    const newState = this.state;
    newState[name] = event.target.value;
    newState.readyToRegister = true;
    this.setState(newState);
  };

  // NOTE: might be worth holding animals in state until all are done, then updating each with one request.
  handleWeanAnimal = () => {
    // build the change herd category array
    const updateAnimalsHerd = [this.state.selectedAnimal._id];
    const updateAnimalsCategory = {
      ids: [this.state.selectedAnimal._id],
      newCategory: this.state.category
    };

    // axios to change the category of the animals
    axios.patch('/api/bovines/categories', updateAnimalsCategory);
    // axios to change the herd of the animal.
    axios.patch(`/api/herds/${this.state.selectedWeanToHerd._id}/animals`, updateAnimalsHerd);

    this.resetState();
  };

  handleBack = () => {
    this.setState(state => {
      switch (state.activeStep) {
        case 0:
          return this.props.history.push('/');
        case 1:
          return {
            activeStep: state.activeStep - 1,
            herdSelected: false
          };
        case 2:
          return {
            activeStep: state.activeStep - 1,
            animalSelected: false
          };
        case 3:
          return {
            activeStep: state.activeStep - 1,
            weanToHerdSelected: false,
            readyToRegister: false,
            category: ''
          };
      }
    });
  };

  resetState = () => {
    const newState = this.state;
    newState.registerdCalves.push(this.state.selectedAnimal._id);

    // remove the animal from the parent array
    newState.selectedHerd.animals = newState.selectedHerd.animals.filter(
      animal => animal._id.toString() !== this.state.selectedAnimal._id.toString()
    );

    // reset the state
    newState.animalSelected = false;
    newState.weanToHerdSelected = false;
    newState.readyToRegister = false;
    newState.category = '';

    this.setState(newState);
  };

  toggleCreateNewHerd = () => {
    this.setState({ creatingNewHerd: true });
  };

  handleCreateNewHerd = newHerd => {
    const newState = this.state;
    newState.allHerds.push(newHerd);
    newState.creatingNewHerd = false;
    this.setState(newState);
  };

  render() {
    return (
      <div>
        {this.state.herds && (
          <main>
            {!this.state.herdSelected ? (
              <Typography variant="h5">Wean a herd</Typography>
            ) : (
              <Typography variant="h5">Weaning {this.state.selectedHerd.name}</Typography>
            )}

            {!this.state.herdSelected && (
              <div>
                <Typography variant="subtitle1">Which heard is getting weaned?</Typography>
                {this.state.herds.map(herd => (
                  <HerdCard key={herd._id} herd={herd} onClick={this.handleHerdSelect(herd)} />
                ))}
              </div>
            )}

            {this.state.herdSelected && !this.state.animalSelected && (
              <AnimalSearchSelect
                title="Select animal to wean"
                animals={this.state.selectedHerd.animals}
                handleAnimalSelect={this.handleAnimalSelect}
              />
            )}

            {this.state.animalSelected && (
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Animal being weaned is: {this.state.selectedAnimal.identifier}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {!this.state.weanToHerdSelected &&
              this.state.animalSelected &&
              !this.state.creatingNewHerd && (
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Select a herd to wean into or create a new one:
                    </Typography>
                    {this.state.allHerds.map(herd => (
                      <HerdCard
                        key={herd._id}
                        herd={herd}
                        onClick={this.handleWeanToSelect(herd)}
                      />
                    ))}
                  </Grid>

                  <Button onClick={this.toggleCreateNewHerd} variant="contained" color="secondary">
                    New Herd
                  </Button>
                </Grid>
              )}

            {this.state.weanToHerdSelected && (
              <Grid container spacing={16} direction="column">
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Weaned into {this.state.selectedWeanToHerd.name}
                  </Typography>
                </Grid>

                {/* <Grid item xs={12}> */}
                <FormControl>
                  <InputLabel shrink htmlFor="category">
                    Categorise animal post weaning
                  </InputLabel>
                  <NativeSelect
                    // fullWidth
                    value={this.state.category}
                    onChange={this.handleWeanChange('category')}
                    input={<Input name="category" id="category" />}
                  >
                    <option value="">None</option>
                    <option value="calf">Calf</option>
                    <option value="weaner">Weaner</option>
                    <option value="heifer">Heifer</option>
                    <option value="ox">Ox</option>
                    <option value="cow">Cow</option>
                    <option value="bull">Bull</option>
                    <option value="bull-calf">Bull-Calf</option>
                  </NativeSelect>
                </FormControl>
              </Grid>
            )}

            {/*  this is basically the create new herd component */}
            {this.state.creatingNewHerd && (
              <HerdNew handleOutsideCreate={this.handleCreateNewHerd} />
            )}

            <MobileStepper
              variant="dots"
              steps={4}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={this.handleWeanAnimal}
                  disabled={!this.state.readyToRegister}
                >
                  Wean Animal
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack}>
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </main>
        )}
      </div>
    );
  }
}
