// import { render, screen } from '@testing-library/react';
import App from './App';
import { render,screen } from './helpers/test-utils';

test('renders Welcome to Postagram text', () => {
  render ( <App /> );
  const linkElement = screen.getByText(/welcome to postgram!/i);
  expect(linkElement).toBeInTheDocument();
});
