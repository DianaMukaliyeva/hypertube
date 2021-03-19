import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

const user = {
  username: 'kovis78',
  firstname: 'kalle',
  lastname: 'laitela',
  avatar: 'avatarstringpng',
};

describe('all elements are rendered', () => {
  it('renders all names', () => {
    render(<UserProfile user={user} />);

    screen.getByText(user.username);
    screen.getByText(new RegExp(user.firstname, 'i'));
    screen.getByText(new RegExp(user.lastname, 'i'));
  });

  it('renders avatar if set', () => {
    render(<UserProfile user={user} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', user.avatar);
  });

  it('renders empty avatar if avatar is not set', () => {
    render(<UserProfile user={{ ...user, avatar: null }} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'emptyAvatar.png');
  });

  it('renders empty div if user is not set', () => {
    const { container } = render(<UserProfile user={null} />);
    expect(container.firstChild).toBeNull();
  });
});
