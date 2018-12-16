import React from 'react';
import { Fragment } from 'react';

// dependancies
import axios from 'axios';
import moment from 'moment';
import { Paper, Button, Typography, MobileStepper } from '@material-ui/core';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

// utils
import Generate from '../../../lib/Generate';

// components
import AnimalSearchSelect from '../common/AnimalSearchSelect';
import RegisterForm from './RegisterForm';
import NewCalfInfoDisplay from './InfoDisplay';

export default class RegisterCalf extends React.Component {
  state = {
    activeStep: 0,
    animalSelected: false,
    readyToRegister: false,
    newCalf: {
      identifier: '',
      category: '',
      birthDate: '',
      breed: '',
      mother: '',
      weight: '',
      unit: ''
    }
  };

  componentDidMount() {
    axios.get('/api/bovines').then(res => this.setState({ animals: res.data }));
  }

  handleAnimalSelect = mother => () => {
    const newState = this.state;
    newState.newCalf.mother = mother;
    newState.newCalf.identifier = Generate.newIdentifier();
    newState.newCalf._id = Generate.newId();
    newState.animalSelected = true;
    newState.activeStep = 1;

    this.setState(newState, () => console.log('=====>', this.state));
  };

  handleChange = name => event => {
    const newState = this.state;
    newState.newCalf[name] = event.target.value;
    if (Object.values(newState.newCalf).every(item => item)) {
      newState.readyToRegister = true;
      this.setState(newState);
    }
    this.setState(newState);
  };

  handleCalfRegister = () => {
    const newState = this.state;
    const { newCalf } = newState;
    const unixBirthDate = moment(newCalf.birthDate).unix();
    const calf = {
      identifier: newCalf.identifier,
      category: newCalf.category,
      birthDate: unixBirthDate,
      breed: newCalf.breed,
      mother: newCalf.mother._id,
      weights: [
        {
          weight: newCalf.weight,
          unit: newCalf.unit,
          timing: 'birth'
        }
      ]
    };

    const mothersProductionUpdate = {
      calfId: newCalf._id
    };

    // creates a new calf bovine
    axios.post('/api/bovines', calf);

    // adds the new calf to its mother production array
    axios.post(`/api/bovines/${newCalf.mother._id}/breeding/production`, mothersProductionUpdate);

    this.resetCalfRegister();
  };

  resetCalfRegister = () => {
    const newState = this.state;

    newState.animalSelected = false;
    newState.readyToRegister = false;
    newState.activeStep = 0;
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
  };

  handleBack = () => {
    this.setState(state => {
      switch (state.activeStep) {
        case 0:
          return this.props.history.push('/manage-animals');
        case 1:
          return {
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
          };
      }
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.animals && (
          <main>
            <Paper position="static" elevation={0} square>
              <Typography align="center" variant="h5" color="inherit">
                Calf Registration
              </Typography>
            </Paper>

            {!this.state.animalSelected && (
              <AnimalSearchSelect
                title="Select mother:"
                animals={this.state.animals}
                handleAnimalSelect={this.handleAnimalSelect}
              />
            )}

            {/* New Calf info display */}
            {this.state.animalSelected && <NewCalfInfoDisplay displayInfo={this.state.newCalf} />}

            {/* New calf info collect */}
            {this.state.animalSelected && (
              <RegisterForm handleChange={this.handleChange} newCalf={this.state.newCalf} />
            )}

            <MobileStepper
              variant="dots"
              steps={2}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={this.handleCalfRegister}
                  disabled={!this.state.readyToRegister}
                >
                  Register
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
      </Fragment>
    );
  }
}
