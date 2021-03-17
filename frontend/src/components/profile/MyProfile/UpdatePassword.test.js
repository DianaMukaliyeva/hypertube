import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import UpdatePassword from './UpdatePassword';
import useField from '../../../hooks/useField';

const oldPassword = renderHook(() =>
  useField('password', 'password', 'update-old-password')
);
const password = renderHook(() =>
  useField('password', 'password', 'update-password')
);
const confirmPassword = renderHook(() =>
  useField('password', 'confirmPassword', 'update-confirm-pw')
);

const props = {
  classes: {
    form: 'form',
    alert: 'alert',
  },
  oldPassword: oldPassword.result.current,
  password: password.result.current,
  confirmPassword: confirmPassword.result.current,
  alert: {
    show: false,
    message: '',
    severity: '',
  },
  setAlert: jest.fn(),
  handleUpdate: jest.fn(),
};

describe('all components are rendered', () => {
  it('renders current password field', () => {
    render(<UpdatePassword {...props} />);
    screen.getByLabelText(/form.currentPassword/i);
  });

  it('renders new password field', () => {
    render(<UpdatePassword {...props} />);
    screen.getByLabelText(/form.newPassword/i);
  });

  it('renders confirm password field', () => {
    render(<UpdatePassword {...props} />);
    screen.getByLabelText(/form.confirmPassword/i);
  });

  it('renders update password button', () => {
    render(<UpdatePassword {...props} />);
    screen.getByRole('button');
  });
});
