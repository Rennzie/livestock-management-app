import React, { Fragment } from 'react';

import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

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
