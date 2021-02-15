import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './components/App';

test('Renders login screen', () => {
  render(<App />);
  const loginButton = screen.getByText(/Login/i);
  expect(loginButton).toBeInTheDocument();
});
