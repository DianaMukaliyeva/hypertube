import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert } from '@material-ui/lab';

import useField from '../../../hooks/useField';
import FormButton from '../FormButton';
import InputField from '../InputField';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const UpdateInformationForm = () => {
  const username = useField('text', 'username');
  const firstName = useField('text', 'name');
  const lastName = useField('text', 'name');
  const email = useField('email', 'email');
  const [lang, setLang] = useState({ label: '', code: '' });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: '',
  });
  const langOptions = [
    { label: 'English', code: 'en' },
    { label: 'German', code: 'de' },
    { label: 'Finnish', code: 'fi' },
    { label: 'Russian', code: 'ru' },
  ];
  const classes = useStyles();

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log('update information');
  };

  return (
    <>
      <form className={classes.form} noValidate>
        <InputField values={username} label="Username" />
        <InputField values={firstName} label="First name" />
        <InputField values={lastName} label="Last name" />
        <InputField values={email} label="email" />
        <Autocomplete
          id="language"
          value={lang}
          options={langOptions}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, value) => option.value === value.value}
          className={classes.select}
          onChange={(event, value) => {
            if (value !== null) setLang(value);
          }}
          renderInput={(params) => (
            <TextField
              required
              {...params}
              label="Select language"
              variant="outlined"
            />
          )}
        />
      </form>
      {alert.show && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, show: false })}
        >
          {alert.message}
        </Alert>
      )}
      <FormButton handleClick={handleUpdate} name="Update Information" />
    </>
  );
};

export default UpdateInformationForm;
