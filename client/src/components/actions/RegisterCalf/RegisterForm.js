import React from 'react';

import { Grid, InputLabel, Input, FormControl, NativeSelect, FormGroup } from '@material-ui/core';

function RegisterForm({ handleChange, newCalf }) {
  return (
    <Grid container spacing={16}>
      <Grid item xs={6}>
        <FormControl>
          <InputLabel shrink htmlFor="breed">
            Breed
          </InputLabel>
          <NativeSelect
            fullWidth
            value={newCalf.breed}
            onChange={handleChange('breed')}
            input={<Input name="breed" id="breed" />}
          >
            <option value="">None</option>
            <option value="Hereford">Hereford</option>
            <option value="Brahman">Brahman</option>
          </NativeSelect>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl>
          <InputLabel shrink htmlFor="category">
            Category
          </InputLabel>
          <NativeSelect
            fullWidth
            value={newCalf.category}
            onChange={handleChange('category')}
            input={<Input name="category" id="category" />}
          >
            <option value="">None</option>
            <option value="calf">Calf</option>
            <option value="bull-calf">Bull-Calf</option>
          </NativeSelect>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormGroup row>
          <FormControl>
            <InputLabel shrink htmlFor="weight">
              Weight
            </InputLabel>
            <Input
              type="number"
              name="weight"
              id="weight"
              value={newCalf.weight}
              onChange={handleChange('weight')}
            />
          </FormControl>
          <FormControl>
            <InputLabel shrink htmlFor="unit">
              Units
            </InputLabel>
            <NativeSelect
              fullWidth
              value={newCalf.unit}
              onChange={handleChange('unit')}
              input={<Input name="unit" id="unit" />}
            >
              <option value="">None</option>
              <option value="kgs">Kilograms</option>
            </NativeSelect>
          </FormControl>
        </FormGroup>
      </Grid>

      <Grid item xs={12}>
        <FormControl>
          <InputLabel shrink htmlFor="birthDate">
            Date of Birth
          </InputLabel>
          <Input
            type="date"
            name="birthDate"
            id="birthDate"
            value={newCalf.birthDate}
            onChange={handleChange('birthDate')}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default RegisterForm;
