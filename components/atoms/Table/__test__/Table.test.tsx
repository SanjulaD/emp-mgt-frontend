import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '@components/atoms/Table';

describe('Table Component', () => {
  const columns = [
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Email', accessor: 'email' },
  ];

  const data = [
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
  ];

  test('renders table headers correctly', () => {
    render(<Table columns={columns} data={data} />);

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  test('renders table rows correctly', () => {
    render(<Table columns={columns} data={data} />);

    data.forEach((row) => {
      const firstNameElements = screen.getAllByText(row.firstName);
      firstNameElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });

      const lastNameElements = screen.getAllByText(row.lastName);
      lastNameElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });

      const emailElements = screen.getAllByText(row.email);
      emailElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  test('renders empty table when no data is provided', () => {
    render(<Table columns={columns} data={[]} />);

    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });

    expect(screen.queryAllByRole('row')).toHaveLength(1); // Only the header row should be present
  });

  test('renders custom cell content using accessor function', () => {
    const customColumns = [{ header: 'Full Name', accessor: (row: any) => `${row.firstName} ${row.lastName}` }];

    const customData = [{ firstName: 'John', lastName: 'Doe' }];

    render(<Table columns={customColumns} data={customData} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
