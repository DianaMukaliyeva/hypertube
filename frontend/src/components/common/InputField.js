import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const InputField = ({ values, label = '', required, autocomplete = 'off', inputRef = null }) => {
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
      inputRef={inputRef}
    />
  );
};

InputField.propTypes = {
  values: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  autocomplete: PropTypes.string,
  inputRef: PropTypes.object,
};

export default InputField;
