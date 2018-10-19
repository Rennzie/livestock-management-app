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
  Button,
  FormLabel,
  Radio,
  RadioGroup
} from '@material-ui/core'

// dependancies
import axios from 'axios';
import moment from 'moment';

// components
import HerdCard from '../../Herd/HerdCard.jsx';

// select a herd to pregtest
// select an animal to Pregtest
//

export default class PregTest extends React.Component{
  state={
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

    this.setState(newState);
  }

  handleAnimalSelect = animal => () => {
    const newState = this.state;

    newState.animalSelected = true;
    newState.selectedAnimal = animal;

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
            {!this.state.selectedHerd ?
              <Typography variant='h5'>PregTest a herd</Typography>
              :
              <Typography variant='h5'>PregTesting {this.state.selectedHerd.name}</Typography>
            }

            {!this.state.selectedHerd  &&
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

            {(this.state.selectedHerd && !this.state.animalSelected) &&
              <Grid container spacing={16} direction='column'>
                <Typography variant='subtitle2'>Select Animal to pregtest:</Typography>
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

                <Button
                  disabled={!this.state.value}
                  onClick={this.handlePregTested}
                  variant='contained'
                  color='secondary'
                >
                    Submit
                </Button>
              </FormControl>
            }


          </main>
        }
      </div>
    );
  }
}
