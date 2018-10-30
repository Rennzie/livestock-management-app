import React from 'react';

import {
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';


function NewCalfInfoDisplay({displayInfo}){
  return(
    <List dense>
      <ListItem >
        <ListItemText primary="New Calf:" />
        <ListItemText secondary={displayInfo.identifier} />
      </ListItem>
      <ListItem >
        <ListItemText primary="Mother:" />
        <ListItemText secondary={displayInfo.mother.identifier} />
      </ListItem>
      <ListItem >
        <ListItemText primary="Weight:" />
        <ListItemText secondary={`${displayInfo.weight} ${displayInfo.unit}`} />
      </ListItem>
      <ListItem >
        <ListItemText primary="Category:" />
        <ListItemText secondary={displayInfo.category} />
      </ListItem>
      <ListItem >
        <ListItemText primary="D.O.B:" />
        <ListItemText secondary={displayInfo.birthDate} />
      </ListItem>
      <ListItem >
        <ListItemText primary="Breed:" />
        <ListItemText secondary={displayInfo.breed} />
      </ListItem>
      <Divider/>
    </List>
  );
}

export default NewCalfInfoDisplay;
