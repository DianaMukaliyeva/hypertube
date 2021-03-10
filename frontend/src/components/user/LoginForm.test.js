import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

const mockSetUser = jest.fn((u) => u);

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook
  // can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        // eslint-disable-next-line no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('all elements are rendered', () => {
  beforeEach(() => {
    render(<LoginForm setUser={mockSetUser} />);
  });

  test('renders header Login', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(/login/i);
  });

  test('renders email field', () => {
    expect(screen.getByLabelText(/email/i));
  });

  test('renders password field', () => {
    expect(screen.getByLabelText(/password/i));
  });

  test('renders all three buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

	test('renders login with google button', () => {
    expect(screen.getByRole('button', { name: /google/i }));
  });

	test('renders login with 42 button', () => {
    expect(screen.getByRole('button', { name: /42/i }));
  });

  test('renders Forgot password link', () => {
    expect(screen.getByText(/forgot password/i));
  });
});
