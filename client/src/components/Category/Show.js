import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LoadingSpinner from '../common/LoadingSpinner';
import CapitalizeText from '../common/CapitalizeText';
import CategoryHistory from './ChangeHistory';

const styles = theme => ({
  header: {
    position: 'fixed',
    width: '100%',
    zIndex: 2,
    top: 0
  },
  detailContainer: {
    paddingTop: theme.spacing.unit * 10,
    marginBottom: 56,
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
    position: 'absolute',
    zIndex: 20,
    bottom: 30,
    left: 0,
    right: 0,
    margin: '0 auto'
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

  handleNewChange = () => {
    const { category } = this.state;
    const { history } = this.props;

    history.push(`/manage-categories/${category.category}/${category._id}/changes`);
  };

  handleChangeEdit = changeId => () => {
    const { history, match } = this.props;

    history.push(`/manage-categories/${match.params.categoryId}/changes/${changeId}/edit`);
  };

  render() {
    const { category } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <section className={classes.header}>
          <Paper square>
            <CapitalizeText variant="h5" align="center">
              {!category ? 'Category' : category.category}
            </CapitalizeText>
            <Typography variant="subtitle1" align="center">
              {!category ? 'Period' : category.currentMonthDetail.period}
            </Typography>
          </Paper>
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
                    {category.currentMonthDetail.outChanges}
                  </Typography>
                </div>

                <Divider />

                <div className={classes.spreadRow}>
                  <Typography variant="subtitle1">Running Total:</Typography>
                  <Typography variant="subtitle1">
                    {category.currentMonthDetail.closingTotal}
                  </Typography>
                </div>
              </div>

              <div className={classNames(classes.column, classes.changeDetail)}>
                <Divider />
                {category.currentMonthDetail.changes.map(change => (
                  <div className={classes.spreadRow} key={change._id}>
                    <CapitalizeText variant="subtitle2">{change.name}</CapitalizeText>
                    <Typography variant="subtitle2">{change.total}</Typography>
                  </div>
                ))}
                <Divider />
              </div>

              <CategoryHistory
                handleChangeEdit={this.handleChangeEdit}
                changes={category.currentMonthChanges}
              />
            </section>
          )}
        </Fragment>
        <Fab
          disabled={!category}
          onClick={this.handleNewChange}
          color="primary"
          aria-label="Add"
          className={classes.fabButton}
        >
          <AddIcon />
        </Fab>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CategoryShow);