import React from 'react';
import axios from 'axios';

import { Grid, Typography } from '@material-ui/core';

import HerdCard from './HerdCard.jsx';

export default class Herds extends React.Component{
  state={};

  componentDidMount() {
    axios.get('/api/herds')
      .then( res => this.divideHerds(res.data));
  }

  divideHerds = (allHerds) => {
    const newState = {};
    allHerds.forEach(herd => {
      if(!newState[herd.category]){
        newState[herd.category] = [];
      }
      newState[herd.category].push(herd);
    });
    this.setState(newState);
  }

  chooseHeard = (herdId) => {
    return () => {
      this.props.history.push(`/herds/${herdId}`);
    };
  }

  render() {
    const categories = Object.keys(this.state);

    return(
      <section>
        {this.state &&
          <main>
            {categories.map( category =>

              <Grid container direction="column" justify="space-around" key={category}>
                <Typography variant='h6' align='center'> {category} </Typography>
                {this.state[category].map(herd =>
                  <HerdCard key={herd._id} herd={herd} onClick={this.chooseHeard(herd._id)} />
                )
                }
              </Grid>
            )}
          </main>
        }


        {/* <h1>Pasture Lot</h1>
        <Grid container direction="column" justify="space-around">
          {this.state.pasturelot &&
            this.state.pasturelot.map(herd =>
              <HerdCard key={herd._id} herd={herd} onClick={this.chooseHeard(herd._id)} />
            )
          }
        </Grid> */}
      </section>
    );
  }
}
