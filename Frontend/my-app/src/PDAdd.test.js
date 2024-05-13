import { render, screen } from '@testing-library/react';
import PDAdd from './PDAdd';

test('renders learn react link', () => {
  render(<PDAdd />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
