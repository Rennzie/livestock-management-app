import React from 'react';
import { Fragment } from 'react';

// ui components
import {
  Typography,
  FormControl,
  FormControlLabel,
  Button,
  FormLabel,
  InputLabel,
  Input,
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
import moment from 'moment';

// components
import AnimalSearchSelect from '../common/AnimalSearchSelect.jsx';

export default class PregTest extends React.Component{
  state={
    activeStep: 0,
    animalSelected: false,
    pregnant: ''
  };

  componentDidMount() {
    axios.get('/api/bovines')
      .then(res => this.setState({ animals: res.data }));
  }

  handleAnimalSelect = animal => () => {
    const newState = this.state;

    newState.animalSelected = true;
    newState.selectedAnimal = animal;
    newState.testDate = moment().format('YYYY-MM-DD');
    newState.activeStep = 1;

    this.setState(newState);
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  }

  handlePregTested = () => {

    //format an object to Submit
    let isPregnant = false;
    if(this.state.pregnant === 'isPregnant') {
      isPregnant = true;
    }

    const unixDate = moment(this.state.testDate).unix();

    const pregTest = {
      date: unixDate,
      isPregnant: isPregnant,
      testedBy: ''
    };

    console.log('the pregTest object sent is ', pregTest);

    // send axios to /bovine/pregnant
    axios.post(`/api/bovines/${this.state.selectedAnimal._id}/breeding/pregtest`, pregTest);

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
          return this.props.history.push('/manage-animals');
        case 1:
          return ({
            activeStep: state.activeStep - 1,
            animalSelected: false,
            readyToRegister: false,
            testDate: '',
            pregnant: ''
          });
      }
    });
  };

  resetState = () => {
    const newState = this.state;

    newState.animalSelected = false;
    newState.activeStep = 0;
    newState.testDate = '';
    newState.pregnant = '';

    this.setState(newState);
  }

  render() {
    return(
      <Fragment>
        {this.state.animals &&
          <main>
            <Typography align='center' variant='h5'>Preg Test</Typography>

            {!this.state.animalSelected &&
              <AnimalSearchSelect
                title="Select animal to preg test:"
                animals={this.state.animals}
                handleAnimalSelect={this.handleAnimalSelect}
              />
            }

            {this.state.animalSelected &&
              <section>
                <FormControl >
                  <InputLabel shrink htmlFor='testDate'>Date of Preg Test</InputLabel>
                  <Input
                    type='date'
                    name='date'
                    id='testDate'
                    value={this.state.testDate}
                    onChange={this.handleChange('testDate')}
                  />
                </FormControl>

                <FormControl component="fieldset">
                  <FormLabel component="legend"> Pregnancy Status</FormLabel>
                  <RadioGroup
                    name="pregnant"
                    value={this.state.pregnant}
                    onChange={this.handleChange('pregnant')}
                  >
                    <FormControlLabel value="isPregnant" control={<Radio />} label="Is Pregnant" />
                    <FormControlLabel value="notInCalf" control={<Radio />} label="Not In Calf" />
                  </RadioGroup>
                </FormControl>
              </section>
            }

            <MobileStepper
              variant="dots"
              steps={2}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button size="small" onClick={this.handlePregTested} disabled={!this.state.pregnant}>
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
      </Fragment>
    );
  }
}
