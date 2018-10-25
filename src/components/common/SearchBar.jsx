import React from 'react';

// ui components
import{
  FormControl,
  InputLabel,
  Input
} from '@material-ui/core';

const SearchBar = ({ handleChange, searchTerm, title }) => {
  return(
    <FormControl>
      <InputLabel shrink htmlFor='searchTerm'>{ title }</InputLabel>
      <Input
        fullWidth
        type='text'
        name='searchTerm'
        id='weight'
        onChange={handleChange}
        value={ searchTerm || '' }
      />
    </FormControl>
  );
};

export default SearchBar;
