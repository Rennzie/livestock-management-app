import React from 'react';

import {
  Grid,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  FormGroup
} from '@material-ui/core';

function WeighForm({ handleChange, newWeight }){
  return(
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <FormGroup row>
          <FormControl>
            <InputLabel shrink htmlFor='weight'>Weight</InputLabel>
            <Input
              type='number'
              name='weight'
              id='weight'
              value={newWeight.weight}
              onChange={handleChange('weight')}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor='unit'>Units</InputLabel>
            <NativeSelect
              fullWidth
              value={newWeight.unit}
              onChange={handleChange('unit')}
              input={<Input name='unit' id='unit' />}
            >
              <option value=''>None</option>
              <option value='kgs'>Kilograms</option>
            </NativeSelect>
          </FormControl>

        </FormGroup>
      </Grid>

      <Grid item xs={12}>
        <FormControl >
          <InputLabel shrink htmlFor='date'>Date of Weigh In</InputLabel>
          <Input
            type='date'
            name='date'
            id='date'
            value={newWeight.date}
            onChange={handleChange('date')}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} >
        <FormControl>
          <InputLabel shrink htmlFor='timing'>Timing</InputLabel>
          <NativeSelect
            fullWidth={true}
            value={newWeight.timing}
            onChange={handleChange('timing')}
            input={<Input name='timing' id='timing' />}
          >
            <option value=''>None</option>
            <option value='birth'>Birth</option>
            <option value='sale'>Sale</option>
            <option value='other'>Other</option>
          </NativeSelect>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default WeighForm;
