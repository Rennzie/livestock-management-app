import React from 'react';

// ui components
import {
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  Switch,
  FormGroup,
  FormControlLabel,
  Button
} from '@material-ui/core'

// dependancies
import axios from 'axios';
import moment from 'moment';

// components
import HerdCard from '../../Herd/HerdCard.jsx';

export default class WeighAnimals extends React.Component{
  state={
    herdSelected: false,
    animalSelected: false,
    readyToRegister: false,
    weighedAnimals: [],
    newWeight: {
      weight: 0,
      unit: 'kgs',
      date: '',
      timing: ''
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

    this.setState(newState);
  }

  handleAnimalSelect = animal => () => {
    const newState = this.state;

    newState.animalSelected = true;
    newState.selectedAnimal = animal;
    newState.lastWeighIn = animal.weights[animal.weights.length - 1];
    newState.newWeight.date = moment().format('YYYY-MM-DD');

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
      timing: ''
    };

    //reset the state
    this.setState(newState);
  }

  render() {
    return(
      <div>
        {this.state.herds &&
          <main>
            {!this.state.selectedHerd ?
              <Typography variant='h5'>Weigh a herd</Typography>
              :
              <Typography variant='h5'>Weighing {this.state.selectedHerd.name}</Typography>
            }

            {!this.state.selectedHerd  &&
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

            {(this.state.selectedHerd && !this.state.animalSelected) &&
              <Grid container spacing={16} direction='column'>
                <Typography variant='subtitle2'>Select Animal to weigh:</Typography>
                {this.state.selectedHerd.animals.map( animal =>
                  <Grid item xs={12} key={animal._id}>
                    <Card>
                      <CardContent onClick={this.handleAnimalSelect(animal)}>
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
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <FormGroup row>
                    <FormControl>
                      <InputLabel shrink htmlFor='weight'>Weight</InputLabel>
                      <Input
                        type='number'
                        name='weight'
                        id='weight'
                        value={this.state.newWeight.weight}
                        onChange={this.handleChange('weight')}
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel shrink htmlFor='unit'>Units</InputLabel>
                      <NativeSelect
                        fullWidth
                        value={this.state.newWeight.unit}
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
                  <FormControl >
                    <InputLabel shrink htmlFor='date'>Date of Weigh In</InputLabel>
                    <Input
                      type='date'
                      name='date'
                      id='date'
                      value={this.state.newWeight.date}
                      onChange={this.handleChange('date')}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} >
                  <FormControl>
                    <InputLabel shrink htmlFor='timing'>Timing</InputLabel>
                    <NativeSelect
                      fullWidth={true}
                      value={this.state.newWeight.timing}
                      onChange={this.handleChange('timing')}
                      input={<Input name='timing' id='timing' />}
                    >
                      <option value=''>None</option>
                      <option value='birth'>Birth</option>
                      <option value='sale'>Sale</option>
                      <option value='other'>Other</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    disabled={!this.state.readyToRegister}
                    onClick={this.handleWeightRegister}
                    variant='contained'
                    color='secondary'
                  >
                    Register Weight
                  </Button>
                </Grid>
              </Grid>
            }
          </main>
        }
      </div>
    );
  }
}
