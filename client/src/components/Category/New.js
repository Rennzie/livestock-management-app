import React, { Fragment, Component } from 'react';

// components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';
import withStyles from '@material-ui/core/styles/withStyles';

// dependancies
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';

// components
import SubmitButton from '../common/SubmitButton';
import LoadingSpinner from '../common/LoadingSpinner';

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
  // if there is one then load into farms and go straight to new category
  // display them in a select field
  componentDidMount() {
    const userId = Auth.currentUserId();
    axios.get(`/api/users/${userId}`).then(res => {
      const { farms } = res.data;
      if (farms.length === 1) {
        this.setState({ farms, farmSelected: farms[0] });
      } else {
        this.setState({ farms });
      }
    });
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
    newChange.reasonForChange = 'initialAdd';

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
        {!farms ? (
          <LoadingSpinner />
        ) : (
          <Fragment>
            {!farmSelected && farms && (
              <Fragment>
                <Typography variant="h5" align="center">
                  Register Category to ...
                </Typography>

                <FormControl variant="outlined" required fullWidth>
                  <InputLabel shrink htmlFor="farmSelected">
                    Farm
                  </InputLabel>
                  <NativeSelect
                    value={farmSelected}
                    className={classes.margin}
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

                <FormControl variant="outlined" required fullWidth>
                  <InputLabel shrink htmlFor="category">
                    Category
                  </InputLabel>
                  <NativeSelect
                    className={classes.margin}
                    value={category}
                    onChange={this.handleChange('category')}
                    input={<Input name="category" id="category" />}
                  >
                    <option value="">Select Category</option>
                    <option value="bulls-1-2">Bulls 1-2 Yrs</option>
                    <option value="bulls">Bulls</option>
                    <option value="calves">Calves</option>
                    <option value="cows">Cows</option>
                    <option value="heifers-1-2">Heifers 1-2 Yrs</option>
                    <option value="heifers-2-3">Heifers 2-3 Yrs</option>
                    <option value="heifers-culls">Heifers Culls</option>
                    <option value="oxen-1-2">Oxen 1-2 Yrs</option>
                    <option value="oxen-2-3"> Oxen 2-3 Yrs</option>
                    <option value="oxen-mature">Oxen Mature</option>
                    <option value="weaner-heifers">Weaner Heifers</option>
                    <option value="weaner-oxen">Weaner Oxen</option>
                  </NativeSelect>
                </FormControl>

                <TextField
                  className={classes.margin}
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

                <SubmitButton
                  disabled={!category}
                  variant="text"
                  className={classes.margin}
                  color="secondary"
                  handleClick={this.handleRegister}
                  name="REGISTER"
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CategoryNew);
