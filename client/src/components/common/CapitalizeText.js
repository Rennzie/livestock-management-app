import React from 'react';

import Typography from '@material-ui/core/Typography';

function CapitalizeText({ children, variant }) {
  const text = children.slice(0, 1).toUpperCase() + children.slice(1, children.length);

  return <Typography variant={variant}>{text}</Typography>;
}

export default CapitalizeText;
