import React from 'react';

import Typography from '@material-ui/core/Typography';

function CapitalizeText({ children, variant, className, align }) {
  const text = children.slice(0, 1).toUpperCase() + children.slice(1, children.length);

  return (
    <Typography className={className} variant={variant} align={align}>
      {text}
    </Typography>
  );
}

export default CapitalizeText;
