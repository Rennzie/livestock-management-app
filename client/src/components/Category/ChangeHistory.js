import React, { Component, Fragment } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import withStyles from '@material-ui/core/styles/withStyles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

// Dependancies
import moment from 'moment';
import orderBy from 'lodash/orderBy';

// Components
import CapitalizeText from '../common/CapitalizeText';
import LoadingSpinner from '../common/LoadingSpinner';

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
    const sortedChanges = orderBy(unSortedChanges, change => change.createdAt, ['desc']);

    this.setState({ sortedChanges });
  }

  render() {
    const { sortedChanges } = this.state;
    const { classes, handleChangeEdit } = this.props;
    return (
      <Fragment>
        {sortedChanges ? (
          <Fragment>
            {/* <Typography align="center" variant="h5">
              History
            </Typography> */}

            <Paper className={classes.container}>
              <Table padding="dense">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell numeric>Moved</TableCell>
                    <TableCell>Edit</TableCell>
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

                      <TableCell>
                        <MoreHorizIcon onClick={handleChangeEdit(row._id)} />
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
