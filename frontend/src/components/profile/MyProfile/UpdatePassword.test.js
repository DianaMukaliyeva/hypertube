import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpdatePassword from './UpdatePassword';

const validPassword = 'Salasana5';
const validNewPassword = 'Sala6Sana';
const invalidNewPassword = 'sala1sana';

const props = {
  classes: {
    form: 'form',
    alert: 'alert',
  },
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

  it('does not render alert', () => {
    render(<UpdatePassword {...props} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('form is submitted', () => {
  it('handles submit with valid values', async () => {
    render(<UpdatePassword {...props} />);

    userEvent.paste(screen.getByLabelText(/currentPassword/i), validPassword);
    await screen.findByDisplayValue(validPassword);

    userEvent.paste(screen.getByLabelText(/newPassword/i), validNewPassword);
    await screen.findByDisplayValue(validNewPassword);

    userEvent.paste(
      screen.getByLabelText(/confirmPassword/i),
      validNewPassword
    );
    await waitFor(() => {
      expect(screen.getAllByDisplayValue(validNewPassword)).toHaveLength(2);
    });

    userEvent.click(screen.getByRole('button', { name: /update/i }));
    expect(props.handleUpdate).toHaveBeenCalled();
    expect(props.handleUpdate).toHaveBeenCalledWith(
      {
        oldPassword: validPassword,
        password: validNewPassword,
        confirmPassword: validNewPassword,
      },
      expect.anything(),
      expect.anything()
    );
  });

  it('handles submit with invalid values', async () => {
    render(<UpdatePassword {...props} />);

    userEvent.paste(screen.getByLabelText(/currentPassword/i), validPassword);
    await screen.findByDisplayValue(validPassword);

    userEvent.paste(screen.getByLabelText(/newPassword/i), invalidNewPassword);
    await screen.findByDisplayValue(invalidNewPassword);

    userEvent.paste(
      screen.getByLabelText(/confirmPassword/i),
      validNewPassword
    );
    await screen.findByDisplayValue(validNewPassword);

    userEvent.click(screen.getByRole('button', { name: /update/i }));
    expect(props.handleUpdate).toHaveBeenCalled();
    expect(props.handleUpdate).toHaveBeenCalledWith(
      {
        oldPassword: validPassword,
        password: invalidNewPassword,
        confirmPassword: validNewPassword,
      },
      expect.anything(),
      expect.anything()
    );
  });

  it('handles submit with missing values', async () => {
    render(<UpdatePassword {...props} />);

    userEvent.paste(screen.getByLabelText(/currentPassword/i), validPassword);
    await screen.findByDisplayValue(validPassword);

    userEvent.paste(screen.getByLabelText(/newPassword/i), validNewPassword);
    await screen.findByDisplayValue(validNewPassword);

    userEvent.click(screen.getByRole('button', { name: /update/i }));
    expect(props.handleUpdate).not.toHaveBeenCalled();
  });
});
