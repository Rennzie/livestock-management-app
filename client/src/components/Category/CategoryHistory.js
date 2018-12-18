import React, { Component, Fragment } from 'react';

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

// Dependancies
import moment from 'moment';
import axios from 'axios';
import lo from 'lodash';

// Components
import CapitalizeText from '../common/CapitalizeText';
import LoadingSpinner from '../common/LoadingSpinner';

const styles = theme => ({
  root: {
    width: '100vw',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    width: '50%'
  }
});

class CategoryHistory extends Component {
  state = {};

  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/categories/${match.params.categoryId}`).then(res => {
      const unSortedChanges = res.data.currentMonthChanges;
      const sortedChanges = lo.orderBy(unSortedChanges, change => change.createdAt, ['desc']);
      // sortedChanges.sort((a, b) => b.createdAt - a.createdAt);

      this.setState({ category: res.data, sortedChanges });
    });
  }

  handleChangeEdit = changeId => () => {
    const { history, match } = this.props;

    history.push(`/manage-categories/${match.params.categoryId}/changes/${changeId}/edit`);
  };

  render() {
    const { category, sortedChanges } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        {category ? (
          <Fragment>
            <Typography align="center" variant="h5">
              History
            </Typography>
            <Typography align="center" variant="subtitle2">
              {category.farm.name}
              <CapitalizeText>{category.category}</CapitalizeText>
            </Typography>
            <Typography align="center" variant="subtitle2">
              <CapitalizeText>{category.currentMonthDetail.period}</CapitalizeText>
            </Typography>

            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Reason for Change</TableCell>
                    <TableCell numeric>Moved</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedChanges.map(row => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {moment(row.createdAt).format('Do')}
                      </TableCell>

                      <TableCell>
                        <CapitalizeText>{row.reasonForChange}</CapitalizeText>
                      </TableCell>

                      <TableCell numeric>{row.animalsMoved}</TableCell>

                      <TableCell>
                        <MoreHorizIcon onClick={this.handleChangeEdit(row._id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Fragment>
        ) : (
          <LoadingSpinner />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CategoryHistory);
