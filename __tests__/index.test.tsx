import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Home', () => {
  it('renders import button', () => {
    render(<Home />);

    const button = screen.getByText('Import');

    expect(button).toBeInTheDocument();
  });
});

describe('Import modal', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('display import from csv modal', () => {
    const button = screen.getByText('Import');
    fireEvent.click(button);

    expect(screen.getByText('Import from CSV file'));
    expect(screen.getByText('Upload file')).toBeDisabled();

    const closeBtn = screen.getByAltText('close');
    fireEvent.click(closeBtn);

    expect(screen.queryByText('Import from CSV file')).toBeNull();
  });

  const testCSV = `Wallet Address, Beneficiary, Name, Company, Round Type
  test, someone, xyz, abc, 123
  0x9Dd39f8fB5Dfa73b805921A3fc45EEBb0d2AC8f8, anyone, test, abc, aa1
  `;

  it('accepts upload via click', () => {
    const user = userEvent.setup();

    const button = screen.getByText('Import');
    fireEvent.click(button);

    const fileInput = screen.getByTestId('file-upload');
    const invalidFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    user.upload(fileInput, invalidFile);

    expect(screen.queryByText('hello.png')).toBeNull();
    expect(screen.getByText('Upload file')).toBeDisabled();

    const validFile = new File([testCSV], 'hello.csv', { type: 'text/csv' });
    user.upload(fileInput, validFile);

    expect(screen.queryByText('hello.csv'));
    expect(screen.getByText('Upload file')).toHaveAttribute('disabled', '');
  });

  it('accepts file via drag and drop', () => {
    const button = screen.getByText('Import');
    fireEvent.click(button);

    const dropElement = screen.getByTestId('drop-target');
    const invalidFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.drop(dropElement, {
      dataTransfer: {
        files: [invalidFile],
      },
    });

    expect(screen.queryByText('hello.png')).toBeNull();
    expect(screen.getByText('Upload file')).toBeDisabled();

    const validFile = new File([testCSV], 'hello.csv', { type: 'text/csv' });
    fireEvent.drop(dropElement, {
      dataTransfer: {
        files: [validFile],
      },
    });

    expect(screen.queryByText('hello.csv'));
    expect(screen.getByText('Upload file')).toBeEnabled();
  });
});
