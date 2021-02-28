import React from 'react';
import { render } from '@testing-library/react';
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

test('renders a button', () => {
  const { getByRole } = render(<LoginForm setUser={mockSetUser} />);

  expect(getByRole('button')).toBeInTheDocument();
});
