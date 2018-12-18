import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

class SubmitButton extends Component {
  state = {
    clicked: false
  };

  handleClick = () => {
    const { handleClick } = this.props;
    this.setState({ clicked: true });
    handleClick();
  };

  render() {
    const { clicked } = this.state;
    const { name, color, variant, disabled, className } = this.props;
    return (
      <Button
        className={className}
        disabled={clicked || disabled}
        variant={variant}
        color={color}
        onClick={this.handleClick}
      >
        {!clicked ? name : <CircularProgress size={15} />}
      </Button>
    );
  }
}

SubmitButton.defaultProps = {
  name: 'Button',
  color: 'primary',
  variant: 'outlined'
};

export default SubmitButton;
