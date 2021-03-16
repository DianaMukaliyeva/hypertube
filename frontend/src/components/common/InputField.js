import React from 'react';
import TextField from '@material-ui/core/TextField';

/* eslint-disable react/prop-types */
const InputField = ({ values, label = '', required, autocomplete = 'off' }) => {
  const { error, value, onChange, helperText, type, id } = values;
  return (
    <TextField
      id={id}
      error={error}
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="normal"
      required={required}
      fullWidth
      name={label}
      label={label}
      helperText={helperText}
      autoFocus
      autoComplete={autocomplete}
      type={type}
    />
  );
};

export default InputField;
