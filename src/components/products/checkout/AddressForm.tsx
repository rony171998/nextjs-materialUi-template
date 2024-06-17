import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

interface AddressFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddressForm({ handleInputChange }: AddressFormProps) {
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="firstName"
          type="text"
          placeholder="John"
          autoComplete="first name"
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="lastName"
          type="text"
          placeholder="Snow"
          autoComplete="last name"
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="street" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="street"
          name="street"
          type="text"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="references">
          Address line 2
        </FormLabel>
        <OutlinedInput
          id="references"
          name="references"
          type="text"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line2"
          onChange={handleInputChange}
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="text"
          placeholder="New York"
          autoComplete="City"
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="text"
          placeholder="NY"
          autoComplete="State"
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zipCode" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zipCode"
          name="zipCode"
          type="text"
          placeholder="12345"
          autoComplete="shipping postal-code"
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="text"
          placeholder="United States"
          autoComplete="shipping country"
          onChange={handleInputChange}
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid>
    </Grid>
  );
}
