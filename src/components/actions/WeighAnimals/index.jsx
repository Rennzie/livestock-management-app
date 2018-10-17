import React from 'react';

// ui components
import {
  Typography,
  Grid
} from '@material-ui/core'

// dependancies
import axios from 'axios';

// components
import HerdCard from '../../Herd/HerdCard.jsx';

export default class WeighAnimals extends React.Component{
  state={
    herdSelected: false
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

  render() {
    return(
      <div>
        {this.state.herds &&
          <main>
            {!this.state.selectedHerd ?
              <Typography variant='h3'>Weigh a herd</Typography>
              :
              <Typography variant='h3'>Weighing {this.state.selectedHerd.name}</Typography>
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
          </main>
        }
      </div>
    );
  }
}
