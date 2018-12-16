import React from 'react';

// ui dependancies
import {
  Typography,
  MobileStepper,
  Button,
  FormControl,
  Input,
  InputLabel
} from '@material-ui/core';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

// dependancies
import axios from 'axios';
import moment from 'moment';

// components
import AnimalSearchSelect from '../common/AnimalSearchSelect';

export default class ArchiveAnimal extends React.Component {
  state = {
    activeStep: 0,
    animalSelected: false
  };

  componentDidMount() {
    axios.get('/api/bovines').then(res => this.setState({ animals: res.data }));
  }

  handleAnimalSelect = animal => () => {
    const newState = this.state;

    newState.animalSelected = true;
    newState.selectedAnimal = animal;
    newState.activeStep = 2;
    newState.deathDate = moment().format('YYYY-MM-DD');

    this.setState(newState);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleArchive = () => {
    // format the archive object
    const unixDate = moment(this.state.deathDate).unix();
    const animalIds = [this.state.selectedAnimal._id];
    const archiveObj = {
      isArchived: true,
      deathDate: unixDate,
      locationOfDeath: this.state.locationOfDeath,
      causeOfDeath: this.state.causeOfDeath,
      archivingComments: this.state.archivingComments
    };

    // send axios request to /bovines/:id/archive
    axios.patch(`/api/bovines/${this.state.selectedAnimal._id}/archive`, archiveObj);
    axios.patch('/api/herds/5b91752666708bc8b1622807/animals', animalIds);

    // re-route to bovine show page

    // NOTE: this will eventually re-direct to the animals show page after being archived
    this.props.history.push('/manage-animals');
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
            readyToRegister: false
          };
      }
    });
  };

  // resetState = () => {
  //   const newState = this.state;
  //
  //   newState.animalSelected = false;
  //
  //   this.setState(newState);
  // }

  render() {
    return (
      <div>
        {this.state.animals && (
          <main>
            <Typography variant="h5">Archive Animal</Typography>

            {!this.state.animalSelected && (
              <AnimalSearchSelect
                title="Select animal to be archived:"
                animals={this.state.animals}
                handleAnimalSelect={this.handleAnimalSelect}
              />
            )}

            {this.state.animalSelected && (
              <section>
                <FormControl>
                  <InputLabel shrink htmlFor="deathDate">
                    Date of Death
                  </InputLabel>
                  <Input
                    fullWidth
                    type="date"
                    name="deathDate"
                    id="deathDate"
                    value={this.state.deathDate}
                    onChange={this.handleChange('deathDate')}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="causeOfDeath">Cause of Death</InputLabel>
                  <Input
                    fullWidth
                    type="text"
                    name="causeOfDeath"
                    id="causeOfDeath"
                    placeholder="Lightning Strike"
                    value={this.state.causeOfDeath}
                    onChange={this.handleChange('causeOfDeath')}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="locationOfDeath">Location</InputLabel>
                  <Input
                    fullWidth
                    type="text"
                    name="locationOfDeath"
                    id="locationOfDeath"
                    placeholder="Mountain Camp 2"
                    value={this.state.locationOfDeath}
                    onChange={this.handleChange('locationOfDeath')}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="archivingComments">Comments</InputLabel>
                  <Input
                    fullWidth
                    type="textarea"
                    name="archivingComments"
                    id="archivingComments"
                    value={this.state.archivingComments}
                    onChange={this.handleChange('archivingComments')}
                  />
                </FormControl>
              </section>
            )}

            <MobileStepper
              variant="dots"
              steps={2}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={this.handleArchive}
                  disabled={!this.state.locationOfDeath}
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
      </div>
    );
  }
}
