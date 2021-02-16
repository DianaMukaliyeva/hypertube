import React, { useState } from 'react';
import useField from '../../hooks/useField';
import Select from '@material-ui/core/Select';

import userService from '../../services/user';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import InputField from './InputField';
import FormButton from './FormButton';

// TO DO move to styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const CreateAccountForm = () => {
  const username = useField('text', 'username');
  const firstName = useField('text', 'name');
  const lastName = useField('text', 'name');
  const email = useField('email', 'email');
  const password = useField('password', 'password');
  const confirmPassword = useField('password', 'confirmPassword');
  const [lang, setLang] = useState('en');

  const classes = useStyles();

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const data = {
        username: username.value,
        firstname: firstName.value,
        lastname: lastName.value,
        password: password.value,
        confirmpassword: confirmPassword.value,
        language: lang,
      };
      await userService.create(data);
    } catch (exception) {
      // TO DO show errors
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create account
        </Typography>
        <form className={classes.form} noValidate>
          <InputField values={username} label="Username" />
          <InputField values={firstName} label="First name" />
          <InputField values={lastName} label="Last name" />
          <InputField values={email} label="email" />
          <InputField values={password} label="Password" autocomplete="new-password" />
          <InputField
            values={confirmPassword}
            label="Confirm password"
            autocomplete="new-password"
          />
          <Select native value={lang} onChange={(event) => setLang(event.target.value)}>
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="fi">Finnish</option>
            <option value="ru">Russian</option>
          </Select>
        </form>
        <FormButton handleClick={handleCreate} name="Create Account" />
      </div>
    </Container>
  );
};

export default CreateAccountForm;
