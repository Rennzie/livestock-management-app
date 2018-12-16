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

// Dependancies
import moment from 'moment';
import axios from 'axios';
import lo from 'lodash';

// Components
import CapitalizeText from '../common/CapitalizeText';

export default class CategoryHistory extends Component {
  state = {};

  componentDidMount() {
    const { location } = this.props;
    axios.get(`/api/categories/${location.state.id}`).then(res => {
      const unSortedChanges = res.data.currentMonthChanges;
      const sortedChanges = lo.sortBy(unSortedChanges, [unSortedChanges.createdAt]);
      // sortedChanges.sort((a, b) => b.createdAt - a.createdAt);

      this.setState({ category: res.data, sortedChanges });
    });
  }

  render() {
    const { category, sortedChanges } = this.state;
    return (
      <Fragment>
        {category && (
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

            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Reason for Change</TableCell>
                    <TableCell numeric>Moved</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedChanges.map(row => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {moment(row.createdAt).format('DD MMM YYYY')}
                      </TableCell>
                      <TableCell>
                        <CapitalizeText>{row.reasonForChange}</CapitalizeText>
                      </TableCell>
                      <TableCell numeric>{row.animalsMoved}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
