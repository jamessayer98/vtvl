import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';

it('renders homepage unchanged', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot('homepage');
});

it('renders Import CSV modal unchanged', () => {
  const { container } = render(<Home />);

  const button = screen.getByText('Import');
  fireEvent.click(button);

  expect(container).toMatchSnapshot('import csv');
});
