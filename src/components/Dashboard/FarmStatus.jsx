import React from 'react';

import axios from 'axios';

import { Grid, CircularProgress } from '@material-ui/core';

// NOTE: most of the methods here could be abstracted away to a farm model in the back end
export default class FarmStatus extends React.Component{
  state = {};

  componentDidMount(){
    axios.get('/api/herds')
      .then( res => this.setState({ herds: res.data }))
      .then(() => this.countAnimals())
      .then(() => this.countPregnant());
  }

  countAnimals = () => {
    let totalAnimals = 0;
    this.state.herds.forEach(herd => totalAnimals += herd.totalAnimals);
    this.setState({totalAnimals: totalAnimals});
  }

  countPregnant = () => {
    let totalPregnant = 0;
    this.state.herds.forEach(herd => totalPregnant += herd.totalPregnant);
    this.setState({totalPregnant: totalPregnant});
  }

  render() {
    return (
      <main>
        {this.state.herds ?
          <Grid container spacing={16} direction='column' justify='space-between'>
            <Grid item>
              <div>Farm Status: BREEDING</div>
            </Grid>
            <Grid item xs={6} >
              <div>Herds: {this.state.herds.length}</div>
              <div>Total animals: {this.state.totalAnimals}</div>
              <div>Pregnant Animals: {this.state.totalPregnant}</div>
            </Grid>
          </Grid>

          :
          <CircularProgress color="secondary" />
        }
      </main>
    );
  }
}
