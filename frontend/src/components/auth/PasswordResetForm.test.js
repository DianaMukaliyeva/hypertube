import React from 'react';
import jwt from 'jsonwebtoken';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordResetForm from './PasswordResetForm';
import userService from '../../services/user';

const userForToken = {
  id: 'ofiahkljh432ask',
};
const token = jwt.sign(userForToken, 'Salainen');
const validPassword = 'SalainenSana9';
const invalidPassword = 'salasana';

const mockRejection = () => {
  return new Promise((resolve, reject) => {
    reject({
      response: {
        data: {
          statusCode: 400,
          errorType: 'bad request',
          details: [
            {
              param: 'password',
              provided: '********',
              reason: 'formValidation.passwordFormat',
            },
          ],
        },
      },
    });
  });
};

describe('all elements are rendered when token is correct', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    history.push(`/recoverylink?token=${token}`);
    render(
      <Router history={history}>
        <PasswordResetForm />
      </Router>
    );
  });

  it('renders new password field', () => {
    screen.getByLabelText(/newPassword/i);
  });

  it('renders confirm password field', () => {
    screen.getByLabelText(/confirmPassword/i);
  });

  it('renders submit button', () => {
    screen.getByRole('button', { type: 'submit' });
  });

  it('does not render alert', () => {
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('renders correctly when token is invalid', () => {
  it('handles missing token', async () => {
    const history = createMemoryHistory();
    history.push(`/recoverylink?token=`);
    render(
      <Router history={history}>
        <PasswordResetForm />
      </Router>
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid/i)
    );
  });

  it('handles invalid token', async () => {
    const history = createMemoryHistory();
    history.push(`/recoverylink?token=jwefjsfdkldasf`);
    render(
      <Router history={history}>
        <PasswordResetForm />
      </Router>
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid/i)
    );
  });
});

describe('form is submitted', () => {
  const hasHelperText = (field, text) => {
    const helperId = field.getAttribute('aria-describedby');
    const helperText = document.getElementById(helperId);
    expect(helperText).toHaveTextContent(text);
  };

  it('handles correct values', async () => {
    const reset = jest.spyOn(userService, 'pwdUpdate').mockResolvedValue({});

    const history = createMemoryHistory();
    history.push(`/recoverylink?token=${token}`);
    render(
      <Router history={history}>
        <PasswordResetForm />
      </Router>
    );

    userEvent.paste(screen.getByLabelText(/newPassword/i), validPassword);
    await screen.findByDisplayValue(validPassword);

    userEvent.paste(screen.getByLabelText(/confirmPassword/i), validPassword);
    await waitFor(() => {
      expect(screen.getAllByDisplayValue(validPassword)).toHaveLength(2);
    });

    userEvent.click(screen.getByRole('button', { type: 'submit' }));
    await waitFor(() => expect(reset).toHaveBeenCalled());
    expect(reset).toHaveBeenCalledWith({
      userId: userForToken.id,
      resetToken: token,
      password: validPassword,
      confirmPassword: validPassword,
    });
    expect(screen.getByRole('alert')).toHaveTextContent(/success/i);
  });

  it('handles invalid values', async () => {
    const reset = jest
      .spyOn(userService, 'pwdUpdate')
      .mockImplementation(() => mockRejection());

    const history = createMemoryHistory();
    history.push(`/recoverylink?token=${token}`);
    render(
      <Router history={history}>
        <PasswordResetForm />
      </Router>
    );

    userEvent.paste(screen.getByLabelText(/newPassword/i), invalidPassword);
    await screen.findByDisplayValue(invalidPassword);

    userEvent.paste(screen.getByLabelText(/confirmPassword/i), validPassword);
    await screen.findByDisplayValue(validPassword);

    userEvent.click(screen.getByRole('button', { type: 'submit' }));
    await waitFor(() => expect(reset).toHaveBeenCalled());

    hasHelperText(screen.getByLabelText(/newPassword/i), /passwordFormat/i);

    userEvent.clear(screen.getByLabelText(/newPassword/i));
    await screen.findByDisplayValue('');

    userEvent.click(screen.getByRole('button', { type: 'submit' }));
    await waitFor(() => expect(reset).toHaveBeenCalled());

    hasHelperText(screen.getByLabelText(/newPassword/i), /passwordFormat/i);
  });
});
