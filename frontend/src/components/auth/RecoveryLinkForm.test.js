import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecoveryLinkForm from './RecoveryLinkForm';
import authService from '../../services/auth';

const validEmail = 'kalle@kalle.fi';
const invalidEmail = 'kalle';

const mockRejection = (email) => {
  return new Promise((resolve, reject) => {
    reject({
      response: {
        data: {
          statusCode: 400,
          errorType: 'bad request',
          details: [
            {
              param: 'email',
              provided: email,
              reason: 'not found',
            },
          ],
        },
      },
    });
  });
};

describe('all elements are rendered', () => {
  it('renders email field', () => {
    render(<RecoveryLinkForm />);
    screen.getByLabelText(/email/i);
  });
  it('renders button', () => {
    render(<RecoveryLinkForm />);
    screen.getByRole('button', { name: /send/i });
  });
  it('does not render alert', () => {
    render(<RecoveryLinkForm />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('form is submitted', () => {
  it('handles submit with valid email', async () => {
    const recoveryLink = jest
      .spyOn(authService, 'recoveryLink')
      .mockResolvedValue({});

    render(<RecoveryLinkForm />);

    const emailField = screen.getByLabelText(/email/i);

    userEvent.paste(emailField, validEmail);
    await screen.findByDisplayValue(validEmail);

    userEvent.click(screen.getByRole('button', { name: /send/i }));
    await waitFor(() => expect(recoveryLink).toHaveBeenCalled());
    expect(recoveryLink).toHaveBeenCalledWith(validEmail);
    expect(screen.getByRole('alert')).toHaveTextContent(/((check).*(email))/i);
  });

  it('handles submit with invalid email', async () => {
    const recoveryLink = jest
      .spyOn(authService, 'recoveryLink')
      .mockImplementation((email) => mockRejection(email));

    render(<RecoveryLinkForm />);

    const emailField = screen.getByLabelText(/email/i);

    userEvent.paste(emailField, invalidEmail);
    await screen.findByDisplayValue(invalidEmail);

    userEvent.click(screen.getByRole('button', { name: /send/i }));
    await screen.findByText(/((not).*(found))/i);

    expect(recoveryLink).toHaveBeenCalled();
    expect(recoveryLink).toHaveBeenCalledWith(invalidEmail);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
