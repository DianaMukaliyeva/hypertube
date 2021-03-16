import React from 'react';
import { render, screen, within } from '@testing-library/react';
import OmniAuthLogin from './OmniAuthLogin';
import authService from '../../services/auth';
import userEvent from '@testing-library/user-event';

describe('all elements are rendered', () => {
  beforeEach(() => {
    render(<OmniAuthLogin />);
  });

  it('renders login with google button with a logo', () => {
    const button = screen.getByRole('button', { name: /google/i });
    const logo = within(button).getByRole('img', { name: /google/i });
    expect(logo).toHaveAttribute('src', 'google-logo.png');
  });

  it('renders login with 42 button with a logo', () => {
    const button = screen.getByRole('button', { name: /42/i });
    const logo = within(button).getByRole('img', { name: /42/i });
    expect(logo).toHaveAttribute('src', '42-logo.png');
  });
});

describe('calls the right service', () => {
  it('google button calls googleUrl', () => {
    const googleUrl = jest
      .spyOn(authService, 'googleUrl')
      .mockResolvedValue({ url: 'googletest' });

    render(<OmniAuthLogin />);

    userEvent.click(screen.getByRole('button', { name: /google/i }));

    expect(googleUrl).toHaveBeenCalledTimes(1);
  });

  it('42 button calls fortytwoUrl', () => {
    const fortytwoUrl = jest
      .spyOn(authService, 'fortytwoUrl')
      .mockResolvedValue({ url: '42test' });

    render(<OmniAuthLogin />);

    userEvent.click(screen.getByRole('button', { name: /42/i }));

    expect(fortytwoUrl).toHaveBeenCalledTimes(1);
  });
});
