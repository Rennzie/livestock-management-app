import React from 'react';

// ui components
import { Grid, Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

// components
import SearchBar from '../../common/SearchBar';
import AnimalCard from '../../common/AnimalCard';

const styles = () => ({
  root: {
    maxHeight: '70vh',
    overflowY: 'scroll'
  },
  searchBar: {
    margin: '0.5rem'
  }
});

class AnimalSearchSelect extends React.Component {
  state = {};

  componentDidMount = () => {
    this.setState({ allAnimals: this.props.animals });
  };

  handleSearchChange = event => {
    this.setState({ searchTerm: event.target.value }, () => this.filterBySearch());
  };

  filterBySearch = () => {
    const filteredAnimals = this.state.allAnimals.filter(animal => {
      const re = new RegExp(this.state.searchTerm, 'i');
      return re.test(animal.identifier);
    });
    this.setState({ filteredAnimals });
  };

  render() {
    const { classes } = this.props;

    return (
      <section>
        {this.state.allAnimals && (
          <Grid container direction="column">
            <Typography variant="subtitle2">{this.props.title}</Typography>
            <SearchBar
              className={classes.searchBar}
              handleChange={this.handleSearchChange}
              searchTerm={this.state.searchTerm}
              title="Search by identifier"
            />
            {this.state.filteredAnimals ? (
              <div className={classes.root}>
                {this.state.filteredAnimals.map(animal => (
                  <AnimalCard
                    key={animal._id}
                    handleClick={this.props.handleAnimalSelect(animal)}
                    animal={animal}
                  />
                ))}
              </div>
            ) : (
              <div className={classes.root}>
                {this.state.allAnimals.map(animal => (
                  <AnimalCard
                    key={animal._id}
                    handleClick={this.props.handleAnimalSelect(animal)}
                    animal={animal}
                  />
                ))}
              </div>
            )}
          </Grid>
        )}
      </section>
    );
  }
}

export default withStyles(styles)(AnimalSearchSelect);
