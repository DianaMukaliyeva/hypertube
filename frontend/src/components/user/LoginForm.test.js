import React from 'react';
import jwt from 'jsonwebtoken';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import authService from '../../services/auth';

// eslint-disable-next-line no-undef
const validUser = { email: 'kalle@kalle.fi', password: 'kallenSalasana1' };
const userForToken = { id: 'fjah4327842379fdjks', lang: 'en' };
const token = jwt.sign(userForToken, 'Salainen');

describe('all elements are rendered', () => {
  beforeEach(() => {
    const mockSetUser = jest.fn((u) => u);
    render(<LoginForm setUser={mockSetUser} />);
  });

  it('renders header Login', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(/login/i);
  });

  it('renders email field', () => {
    expect(screen.getByLabelText(/email/i));
  });

  it('renders password field', () => {
    expect(screen.getByLabelText(/password/i));
  });

  it('renders all three buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('renders login button', () => {
    expect(screen.getByRole('button', { name: /login$/i }));
  });

  it('renders Forgot password link', () => {
    expect(screen.getByText(/forgot password/i));
  });

  it('does not render alert', () => {
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('form is submitted', () => {
  it('calls login function with email and password', async () => {
    const mockSetUser = jest.fn();

    const login = jest
      .spyOn(authService, 'login')
      .mockResolvedValue({ token: token });

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(token);

    render(<LoginForm setUser={mockSetUser} />);

    const emailField = screen.getByLabelText(/email/i);
    act(() => {
      userEvent.paste(emailField, validUser.email);
    });

    await screen.findByDisplayValue(validUser.email);

    const passwordField = screen.getByLabelText(/password/i);
    act(() => {
      userEvent.paste(passwordField, validUser.password);
    });

    await screen.findByDisplayValue(validUser.password);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /login$/i }));
    });

    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(validUser.email, validUser.password);
    expect(mockSetUser).toHaveBeenCalled();
  });

  it('sets the user', async () => {
    const mockSetUser = jest.fn();

    const login = jest.spyOn(authService, 'login');
    login.mockResolvedValue({ token: token });

    const getLocalStorage = jest.spyOn(
      window.localStorage.__proto__,
      'getItem'
    );
    getLocalStorage.mockReturnValue(token);

    render(<LoginForm setUser={mockSetUser} />);

    const emailField = screen.getByLabelText(/email/i);
    act(() => {
      userEvent.paste(emailField, validUser.email);
    });

    await screen.findByDisplayValue(validUser.email);

    const passwordField = screen.getByLabelText(/password/i);
    act(() => {
      userEvent.paste(passwordField, validUser.password);
    });

    await screen.findByDisplayValue(validUser.password);

    await act(async () => {
      await userEvent.click(screen.getByRole('button', { name: /login$/i }));
    });

    expect(mockSetUser).toHaveBeenCalled();
    expect(mockSetUser).toHaveBeenCalledTimes(1);
    expect(mockSetUser).toHaveBeenCalledWith({
      lang: userForToken.lang,
      userId: userForToken.id,
    });
  });
});
