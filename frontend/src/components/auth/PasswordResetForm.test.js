import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { render, screen } from '@testing-library/react';
import PasswordResetForm from './PasswordResetForm';

const userForToken = {
  id: 'ofiahkljh432ask',
};
const token = jwt.sign(userForToken, 'Salainen');

describe('all elements are rendered', () => {
  it('renders new password field', () => {
    const history = createMemoryHistory();
    history.push(`/?token=${token}`);
    render(
      <Router history={history}>
        <PasswordResetForm />
      </Router>
    );
    screen.debug();
  });
});
