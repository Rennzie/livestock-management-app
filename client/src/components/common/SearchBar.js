import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const SearchBar = ({ handleChange, searchTerm, title, className }) => (
  <FormControl className={className}>
    <InputLabel shrink htmlFor="searchTerm">
      {title}
    </InputLabel>
    <Input
      fullWidth
      type="text"
      name="searchTerm"
      id="weight"
      onChange={handleChange}
      value={searchTerm || ''}
    />
  </FormControl>
);

export default SearchBar;
