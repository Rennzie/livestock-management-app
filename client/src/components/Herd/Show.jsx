import React from 'react';

import axios from 'axios';

export default class HerdShow extends React.Component{
  state={};

  componentDidMount() {
    axios.get(`/api/herds/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .then(() => console.log(this.state));
  }

  render() {
    return(
      <div>
        {this.state &&
          <p>{this.state.name}</p>
        }

        {this.state.animals &&
          this.state.animals.map(animal =>
            <p key={animal._id}>{animal._id}</p>
          )
        }
      </div>
    );
  }
}
