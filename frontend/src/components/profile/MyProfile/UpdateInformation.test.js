import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import UpdateInformation from './UpdateInformation';
import useField from '../../../hooks/useField';

const username = renderHook(() =>
  useField('text', 'username', 'update-username')
);
const firstName = renderHook(() =>
  useField('text', 'name', 'update-firstname')
);
const lastName = renderHook(() => useField('text', 'name', 'update-lastname'));
const email = renderHook(() => useField('email', 'email', 'update-email'));

const userData = {
  username: 'jens',
  firstname: 'lars',
  lastname: 'svensson',
  email: 'l.svens@gmail.com',
  language: 'en',
};

const props = {
  classes: {
    form: 'form',
    select: 'select',
    alert: 'alert',
  },
  userData,
  username: username.result.current,
  firstName: firstName.result.current,
  lastName: lastName.result.current,
  email: email.result.current,
  alert: {
    show: false,
    message: '',
    severity: '',
  },
  setAlert: jest.fn(),
  handleUpdate: jest.fn(),
};

describe('all components are rendered', () => {
  it('renders username field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/form.username/i);
  });

  it('renders first name field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/form.firstName/i);
  });

  it('renders last name field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/form.lastName/i);
  });

  it('renders email field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/email/i);
  });

  it('renders language field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/form.selectLanguage/i);
  });

  it('renders update information button', () => {
    render(<UpdateInformation {...props} />);
    screen.getByRole('button', { name: /update/i });
  });
});
