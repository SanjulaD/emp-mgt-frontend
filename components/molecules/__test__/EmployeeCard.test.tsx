import { render, screen } from '@testing-library/react';
import EmployeeCard from '@components/molecules/EmployeeCard';

describe('EmployeeCard Component', () => {
  const props = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    gender: 'M',
    photo: 'https://example.com/photo.jpg',
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays employee information correctly', () => {
    render(
      <EmployeeCard
        firstName={props.firstName}
        lastName={props.lastName}
        email={props.email}
        phoneNumber={props.phoneNumber}
        gender={props.gender}
        photo={props.photo}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />
    );

    expect(screen.getByText(`${props.firstName} ${props.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(props.email)).toBeInTheDocument();
    expect(screen.getByText(props.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<EmployeeCard {...props} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    editButton.click();

    expect(props.onEdit).toHaveBeenCalled();
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<EmployeeCard {...props} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    deleteButton.click();

    expect(props.onDelete).toHaveBeenCalled();
  });
});
