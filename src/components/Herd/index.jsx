import React from 'react';
import axios from 'axios';

import { Grid } from '@material-ui/core';

import HerdCard from './HerdCard.jsx';

export default class Herds extends React.Component{
  state={};

  componentDidMount() {
    axios.get('/api/herds')
      .then( res => this.divideHerds(res.data));
  }

  divideHerds = (allHerds) => {
    const newState = {
      cows: [],
      pasturelot: []
    };
    allHerds.forEach(herd => newState[herd.category].push(herd));
    this.setState(newState);
  }

  chooseHeard = (herdId) => {
    return () => {
      this.props.history.push(`/herds/${herdId}`);
    };
  }

  render() {
    return(
      <section>
        <h1>Cows</h1>
        <Grid container direction="column" justify="space-around">
          {this.state.cows &&
            this.state.cows.map(herd =>
              <HerdCard key={herd._id} herd={herd} onClick={this.chooseHeard(herd._id)} />
            )
          }
        </Grid>
        <h1>Pasture Lot</h1>
        <Grid container direction="column" justify="space-around">
          {this.state.pasturelot &&
            this.state.pasturelot.map(herd =>
              <HerdCard key={herd._id} herd={herd} onClick={this.chooseHeard(herd._id)} />
            )
          }
        </Grid>
      </section>
    );
  }
}
