import React, { Fragment, Component } from 'react';

// components
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Input,
  NativeSelect
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// dependancies
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';

const styles = theme => ({
  fromWrapper: {
    height: '50vh',
    width: '70vw',
    margin: '25vh auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class CategoryNew extends Component {
  state = {};

  // get the list of users farms,
  // display them in a select field
  componentDidMount() {
    const { history } = this.props;
    if (!history.location.state) {
      const userId = Auth.currentUserId();
      axios.get(`/api/users/${userId}`).then(res => this.setState({ farms: res.data.farms }));
    } else {
      this.setState(() => ({
        farmSelected: history.location.state.farm
      }));
    }
  }

  handleRegister = () => {
    const { farmSelected, category, animalsMoved } = this.state;
    const { history } = this.props;

    const newCategory = {};
    newCategory.category = category;
    newCategory.farm = farmSelected._id;

    const newChange = {};
    newChange.animalsMoved = animalsMoved;
    newChange.createdAt = moment();
    newChange.reasonForChange = 'add';

    axios
      .post('/api/categories', newCategory)
      .then(res => axios.post(`/api/categories/${res.data._id}/changes`, newChange))
      .then(() => history.push(`/${farmSelected.name}/${farmSelected._id}/manage-categories`));
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleFarmSelect = event => {
    const { farms } = this.state;

    const farmSelected = farms.filter(farm => farm._id.toString() === event.target.value);
    this.setState(() => ({ farmSelected: farmSelected[0] }));
  };

  handleRegisterNewCategory = () => {};

  // NOTE: will add in a plus button so multiple categories can be registered at the same time
  render() {
    const { farmSelected, farms, category, animalsMoved } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        {!farmSelected && farms && (
          <Fragment>
            <Typography variant="h5" align="center">
              Register Category to ...
            </Typography>

            <FormControl variant="outlined" required fullWidth className={classes.margin}>
              <InputLabel shrink htmlFor="farmSelected">
                Farm
              </InputLabel>
              <NativeSelect
                value={farmSelected}
                onChange={this.handleFarmSelect}
                input={<Input name="farmSelected" id="farmSelected" />}
              >
                <option value="">Choose a farm</option>
                {farms.map(farm => (
                  <option key={farm._id} value={farm._id}>
                    {farm.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Fragment>
        )}

        {farmSelected && (
          <Fragment>
            <Typography variant="h5" align="center">
              Register Category for {farmSelected.name}
            </Typography>

            <FormControl variant="outlined" required fullWidth className={classes.margin}>
              <InputLabel shrink htmlFor="category">
                Category
              </InputLabel>
              <NativeSelect
                value={category}
                onChange={this.handleChange('category')}
                input={<Input name="category" id="category" />}
              >
                <option value="">None</option>
                <option value="bull-calves">Bull Calves</option>
                <option value="bulls">Bulls</option>
                <option value="calves">Calves</option>
                <option value="cows">Cows</option>
                <option value="hefiers-1-2">Heifers 1-2 Years</option>
                <option value="hefiers-2-3">Heifers 2-3 Years</option>
                <option value="oxen">Oxen</option>
                <option value="replacement-heifers">Replacement Heifers</option>
                <option value="weaners">Weaners</option>
              </NativeSelect>
            </FormControl>

            <TextField
              margin="normal"
              fullWidth
              label="Number of Animals"
              id="animalsMoved"
              name="animalsMoved"
              required
              type="number"
              variant="outlined"
              value={animalsMoved}
              onChange={this.handleChange('animalsMoved')}
            />

            <Button
              variant="text"
              className={classes.margin}
              color="secondary"
              onClick={this.handleRegister}
            >
              Register
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CategoryNew);