import React from 'react';
import { Typography } from '@material-ui/core';
// import { View, Text } from 'react-native';

const CapitalizeText = (props) => {
  const text = props.children.slice(0,1).toUpperCase() + props.children.slice(1, props.children.length);

  return (
    <p>{text}</p>
  );
};

export default CapitalizeText;
