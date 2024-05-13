import { render, screen } from '@testing-library/react';
import PDFact from './PDFact';

test('renders learn react link', () => {
  render(<PDFact />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
