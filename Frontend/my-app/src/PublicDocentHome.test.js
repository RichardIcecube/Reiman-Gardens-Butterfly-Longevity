import { render, screen } from '@testing-library/react';
import PublicDocentHome from './PublicDocentHome';

test('renders learn react link', () => {
  render(<PublicDocentHome />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
