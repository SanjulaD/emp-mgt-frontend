import Button from '@components/atoms/Button';
import EmployeeCard from './EmployeeCard';
import { MdEdit } from 'react-icons/md'; // Import edit icon
import { RiDeleteBin6Line } from 'react-icons/ri'; // Import delete icon

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

const employees: Employee[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    gender: 'Male',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '098-765-4321',
    gender: 'Female',
  },
  // Add more employees here
];

const EmployeeList = ({ viewMode }: { viewMode: 'list' | 'grid' }) => {
  const handleEdit = (id: number) => {
    console.log(`Edit employee with id ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete employee with id ${id}`);
  };

  // List View (Table)
  if (viewMode === 'list') {
    return (
      <div className="max-w-5xl mx-auto py-8">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b">
                <td className="px-4 py-2">{employee.firstName}</td>
                <td className="px-4 py-2">{employee.lastName}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.phoneNumber}</td>
                <td className="px-4 py-2">{employee.gender}</td>
                <td className="px-4 py-2">
                  <div className="space-x-2">
                    <Button
                      onClick={() => handleEdit(employee.id)}
                      className="bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600 transition duration-200"
                    >
                      <MdEdit className="h-5 w-5 mr-1" aria-hidden="true" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(employee.id)}
                      className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 transition duration-200"
                    >
                      <RiDeleteBin6Line className="h-5 w-5 mr-1" aria-hidden="true" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Grid View (Cards)
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            firstName={employee.firstName}
            lastName={employee.lastName}
            email={employee.email}
            phoneNumber={employee.phoneNumber}
            gender={employee.gender}
            onEdit={() => handleEdit(employee.id)}
            onDelete={() => handleDelete(employee.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
