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

// select a herd to pregtest
// select an animal to Pregtest
//

export default class PregTest extends React.Component{
  state={
    herdSelected: false,
    animalSelected: false,
    readyToRegister: false,
    testedAnimals: [],
    isPregnant: '',
    notInCalf: ''
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

            
          </main>
        }
      </div>
    );
  }
}
