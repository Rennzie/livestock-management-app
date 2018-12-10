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

  componentDidMount() {
    const { history } = this.props;
    const { farm } = history.location.state;
    this.setState(
      () => ({
        farm
      }),
      () => console.log('new category state is', this.state)
    );
  }

  handleRegister = () => {
    const { farm, category, animalsMoved } = this.state;
    const { history } = this.props;

    const newCategory = {};
    newCategory.class = category;
    newCategory.farm = farm._id;

    const newChange = {};
    newChange.animalsMoved = animalsMoved;
    newChange.createdAt = moment();
    newChange.reasonForChange = 'add';

    axios
      .post('/api/classes', newCategory)
      .then(res => axios.post(`/api/classes/${res.data._id}/changes`, newChange))
      .then(() => history.push(`/${farm.name}/${farm._id}/manage-categories`));
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleRegisterNewCategory = () => {};

  // NOTE: will add in a plus button so multiple farms can be registered at the same time
  render() {
    const { farm, category, animalsMoved } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        {farm && (
          <Fragment>
            <Typography variant="h5" align="center">
              Register Category for {farm.name}
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
