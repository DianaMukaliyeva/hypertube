import React from 'react';
import TextField from '@material-ui/core/TextField';

/* eslint-disable react/prop-types */
const InputField = ({ values, label }) => {
  const { error, value, onChange, helperText, type } = values;
  return (
    <TextField
      error={error}
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name={label}
      label={label}
      helperText={helperText}
      autoFocus
      autoComplete="current-password"
      type={type}
    />
  );
};

export default InputField;
