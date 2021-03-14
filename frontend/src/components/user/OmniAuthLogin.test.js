import React from 'react';
import { render, screen } from '@testing-library/react';
import OmniAuthLogin from './OmniAuthLogin';

describe('all elements are rendered', () => {
	beforeEach(() => {
    render(<OmniAuthLogin />);
  });

	test('renders login with google button', () => {
    expect(screen.getByRole('button', { name: /google/i }));
  });

	test('renders login with 42 button', () => {
    expect(screen.getByRole('button', { name: /42/i }));
  });
});
