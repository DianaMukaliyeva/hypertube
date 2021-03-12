import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const CustomSelect = ({ onChange, label, onClick, onKeyDown }) => {
  return (
    <FormControl size="small" fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
      <OutlinedInput
        type="search"
        style={{ borderRadius: '50px' }}
        id="outlined-adornment-amount"
        onKeyDown={onKeyDown}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <Button onClick={onClick}>
              <SearchIcon />
            </Button>
          </InputAdornment>
        }
        labelWidth={140}
      />
    </FormControl>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomSelect;
