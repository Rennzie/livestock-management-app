import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import SubmitButton from '../common/SubmitButton';
import LoadingSpinner from '../common/LoadingSpinner';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justfyContent: 'space-around',
    margin: 'auto',
    width: '50vw'
  }
});

class CategoryEditDelete extends Component {
  state = {};

  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/categories/${match.params.categoryId}`).then(res => {
      this.setState(() => ({ stockUnitFactor: res.data.stockUnitFactor, category: res.data }));
    });
  }

  handleChange = name => event => {
    const { value } = event.target;

    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = () => {
    const { category, stockUnitFactor } = this.state;
    const { history } = this.props;
    const updateObj = {};
    updateObj.stockUnitFactor = parseFloat(stockUnitFactor, 10);

    axios
      .put(`/api/categories/${category._id}`, updateObj)
      .then(() => history.push(`/manage-categories/${category._id}`));
  };

  handleRemove = () => {
    const { category } = this.state;
    const { history } = this.props;
    axios
      .delete(`/api/categories/${category._id}`)
      .then(() => history.push(`/manage-categories/${category.farm._id}`));
  };

  render() {
    const { category, stockUnitFactor } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography align="center" variant="h5">
          Edit/Delete Category
        </Typography>
        {!category ? (
          <LoadingSpinner />
        ) : (
          <Typography align="center" variant="subtitle1">
            {category.category}
          </Typography>
        )}
        <div className={classes.form}>
          <Input
            // type="number"
            id="stockUnitFactor"
            name="stockUnitFactor"
            autoComplete="false"
            placeholder="Stock Unit Factor"
            value={stockUnitFactor}
            onChange={this.handleChange('stockUnitFactor')}
          />
          <SubmitButton
            disabled={!stockUnitFactor}
            variant="contained"
            className={classes.margin}
            color="secondary"
            handleClick={this.handleSubmit}
            name="Edit Category"
          />
          <SubmitButton
            disabled={!category}
            variant="contained"
            className={classes.margin}
            color="secondary"
            handleClick={this.handleRemove}
            name="Delete Change"
          />
        </div>
      </Fragment>
    );
  }
}

CategoryEditDelete.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryEditDelete);
