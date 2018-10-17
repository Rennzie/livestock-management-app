import React from 'react';

// ui components
import {
  Typography,
  Grid,
  Card,
  CardContent
} from '@material-ui/core'

// dependancies
import axios from 'axios';

// components
import HerdCard from '../../Herd/HerdCard.jsx';

export default class WeighAnimals extends React.Component{
  state={
    herdSelected: false,
    animalSelected: false
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
              <Grid container direction='column'>
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
              <Grid container direction='column'>
                <Grid item xs={12}>
                  <Typography > Animal being weighed is: {this.state.selectedAnimal.identifier} </Typography>
                </Grid>
                <Grid item xs={12} >
                  {/* // NOTE: need to get sub-documents to have createAt dates */}
                  <Typography>Previously weighed on the {this.state.lastWeighIn.createAt}</Typography>
                </Grid>
              </Grid>
            }
          </main>
        }
      </div>
    );
  }
}
