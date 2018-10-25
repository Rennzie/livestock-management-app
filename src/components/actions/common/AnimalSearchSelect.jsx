import React from 'react';

// ui components
import{
  Grid,
  Typography
} from '@material-ui/core';

// components
import SearchBar from '../../common/SearchBar.jsx';
import AnimalCard from '../../common/AnimalCard.jsx';

export default class AnimalSearchSelect extends React.Component{
  state={};

  componentDidMount = () => {
    this.setState({ allAnimals: this.props.animals});
  }

  handleSearchChange = event => {
    this.setState({ searchTerm: event.target.value}, () => this.filterBySearch());
  }

  filterBySearch = () => {
    const filteredAnimals = this.state.allAnimals.filter( animal => {
      const re = new RegExp(this.state.searchTerm, 'i');
      return re.test(animal.identifier);
    });
    this.setState({ filteredAnimals });
  }

  render() {
    return(
      <section>
        {this.state.allAnimals &&
          <Grid container direction='column'>
            <Typography variant='subtitle2'>{this.props.title}</Typography>
            <SearchBar
              handleChange={this.handleSearchChange}
              searchTerm={this.state.searchTerm}
              title="Search by identifier"
            />
            {this.state.filteredAnimals ?
              <div>
                {this.state.filteredAnimals.map( animal =>
                  <AnimalCard
                    key={animal._id}
                    handleClick={this.props.handleAnimalSelect(animal)}
                    animal={animal}
                  />
                )}
              </div>
              :
              <div>
                {this.state.allAnimals.map( animal =>
                  <AnimalCard
                    key={animal._id}
                    handleClick={this.props.handleAnimalSelect(animal)}
                    animal={animal}
                  />
                )}
              </div>
            }
          </Grid>
        }
      </section>
    );
  }
}
