import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default function FarmStatus({ user }) {
  return (
    <List dense>
      <ListItem>
        <ListItemText primary="Total Animals:" />
        <ListItemText secondary={user.totalAnimals} />
      </ListItem>
      <Divider />
      {user.farms.map(farm => (
        <ListItem key={farm._id}>
          <ListItemText primary={`${farm.name} Total Animals:`} />
          <ListItemText secondary={farm.totalAnimals} />
        </ListItem>
      ))}
      <Divider />
    </List>
  );
}
