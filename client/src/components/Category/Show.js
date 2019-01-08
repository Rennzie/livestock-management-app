import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import SwapIcon from '@material-ui/icons/SwapHoriz';
import LoadingSpinner from '../common/LoadingSpinner';
import CapitalizeText from '../common/CapitalizeText';
import CategoryHistory from './Movement/History';

const styles = theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    zIndex: 2,
    margin: theme.spacing.unit * 2
  },
  detailContainer: {
    // paddingTop: theme.spacing.unit * 10,
    // marginBottom: 56,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    height: '100%'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    width: '100%'
  },
  spreadRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: theme.spacing.unit * 3
  },
  margin: {
    margin: theme.spacing.unit
  },
  changeDetail: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  inOutPadding: {
    paddingLeft: theme.spacing.unit * 10
  },
  fabButton: {
    zIndex: 20,
    margin: `${theme.spacing.unit} auto`
  }
});
class CategoryShow extends Component {
  state = {};

  componentDidMount() {
    const { match } = this.props;
    const { categoryId } = match.params;
    Axios.get(`/api/categories/${categoryId}`).then(res =>
      this.setState(() => ({ category: res.data }))
    );
  }

  handleNewMovement = () => {
    const { category } = this.state;
    const { history } = this.props;

    history.push({
      pathname: `/manage-categories/${category._id}/movements`,
      state: { farmId: category.farm._id, categoryName: category.category }
    });
  };

  handleEditDeleteMovement = changeId => () => {
    const { history, match } = this.props;
    history.push(`/manage-categories/${match.params.categoryId}/movements/${changeId}/edit`);
  };

  handleGoToEdit = () => {
    const { category } = this.state;
    const { history } = this.props;
    history.push(`/manage-categories/${category._id}/edit`);
  };

  render() {
    const { category } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <section className={classes.header}>
          <div>
            <CapitalizeText variant="h5" align="center">
              {!category ? 'Category' : category.category}
            </CapitalizeText>
            <Typography variant="subtitle1" align="center">
              {!category ? 'Period' : category.currentMonthDetail.period}
            </Typography>
          </div>

          <Fragment>
            {category && (
              <IconButton onClick={this.handleGoToEdit}>
                <Icon fontSize="small">edit</Icon>
              </IconButton>
            )}
          </Fragment>
        </section>

        <Fragment>
          {!category ? (
            <LoadingSpinner />
          ) : (
            <section className={classes.detailContainer}>
              <div className={classes.column}>
                <div className={classes.spreadRow}>
                  <Typography variant="subtitle1">Opening Total:</Typography>
                  <Typography variant="subtitle1">
                    {category.currentMonthDetail.openingTotal}
                  </Typography>
                </div>

                <Divider />

                <div className={classes.spreadRow}>
                  <Typography className={classes.inOutPadding} variant="caption">
                    In:
                  </Typography>
                  <Typography variant="caption">{category.currentMonthDetail.inChanges}</Typography>
                </div>

                <div className={classes.spreadRow}>
                  <Typography className={classes.inOutPadding} variant="caption">
                    Out:
                  </Typography>
                  <Typography variant="caption">
                    {category.currentMonthDetail.outChanges * -1}
                  </Typography>
                </div>

                <Divider />

                <div className={classes.spreadRow}>
                  <Typography variant="subtitle1">Running Total:</Typography>
                  <Typography variant="subtitle1">
                    {category.currentMonthDetail.closingTotal}
                  </Typography>
                </div>
                <div className={classes.spreadRow}>
                  <Typography variant="subtitle1">Total LSU:</Typography>
                  <Typography variant="subtitle1">{Math.round(category.stockUnits)}</Typography>
                </div>
                <div className={classes.spreadRow}>
                  <Typography variant="subtitle1">LSU Factor:</Typography>
                  <Typography variant="subtitle1">{category.stockUnitFactor}</Typography>
                </div>
              </div>

              <div className={classNames(classes.column, classes.changeDetail)}>
                <Divider />
                {category.currentMonthDetail.changes.map(change => (
                  <div className={classes.spreadRow} key={change._id}>
                    <CapitalizeText variant="subtitle2">{change.name}</CapitalizeText>
                    <Typography variant="subtitle2">
                      {change.total < 0 ? change.total * -1 : change.total}
                    </Typography>
                  </div>
                ))}
                <Divider />
              </div>

              <Fab
                color="default"
                className={classes.fabButton}
                disabled={!category}
                onClick={this.handleNewMovement}
                variant="extended"
              >
                <SwapIcon />
                Log Movement
              </Fab>

              <CategoryHistory
                changes={category.currentMonthChanges}
                handleEditDeleteMovement={this.handleEditDeleteMovement}
              />
            </section>
          )}
        </Fragment>
      </Fragment>
    );
  }
}

CategoryShow.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryShow);
