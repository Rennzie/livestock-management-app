import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import withStyles from '@material-ui/core/styles/withStyles';

// Dependancies
import moment from 'moment';
import orderBy from 'lodash/orderBy';

// Components
import CapitalizeText from '../../common/CapitalizeText';
import LoadingSpinner from '../../common/LoadingSpinner';

const styles = theme => ({
  container: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto'
  },
  table: {
    // width: '50%'
  },
  body: {
    overflow: 'auto'
  }
});

class CategoryHistory extends Component {
  state = {};

  componentDidMount() {
    const { changes } = this.props;

    const unSortedChanges = changes;
    const sortedChanges = orderBy(unSortedChanges, change => change.createdAt, ['asc']);

    this.setState({ sortedChanges });
  }

  // NEXT: make the change history table scrollable

  render() {
    const { sortedChanges } = this.state;
    const { classes, handleChangeEdit } = this.props;
    return (
      <Fragment>
        {sortedChanges ? (
          <Fragment>
            <Paper className={classes.container}>
              <Table padding="dense">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell numeric>Moved</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody className={classes.body}>
                  {sortedChanges.map(row => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        <Typography variant="caption">
                          {moment(row.createdAt).format('Do')}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <CapitalizeText variant="caption">{row.reasonForChange}</CapitalizeText>
                      </TableCell>

                      <TableCell numeric>
                        <Typography variant="caption">{row.animalsMoved}</Typography>
                      </TableCell>

                      <TableCell onClick={handleChangeEdit(row._id)}>
                        <Icon fontSize="small">edit</Icon>
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
