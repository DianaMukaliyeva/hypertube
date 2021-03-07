import React from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const CustomSelect = ({ options, label, id, onChange }) => {
  return (
    <Autocomplete
      size="small"
      id={id}
      onChange={onChange}
      options={options}
      getOptionLabel={(option) => option.title}
      getOptionSelected={(option) => option.title}
      renderInput={(params) => <TextField {...params} variant="outlined" label={label} />}
    />
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
