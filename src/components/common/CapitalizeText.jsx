import React from 'react';

const CapitalizeText = (props) => {
  const text = props.children.slice(0,1).toUpperCase() + props.children.slice(1, props.children.length);

  return (
    <p>{text}</p>
  );
};

export default CapitalizeText;
