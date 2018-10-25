import React from 'react';

import { Typography } from '@material-ui/core';

const CapitalizeText = (props) => {
  const text = props.children.slice(0,1).toUpperCase() + props.children.slice(1, props.children.length);

  return (
    <Typography variant={props.variant}>{text}</Typography>
  );
};

export default CapitalizeText;
