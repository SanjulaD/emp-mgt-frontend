import React, { useEffect } from 'react';
import Button from '@components/atoms/Button';
import Loader from '@components/atoms/Loader';
import EmployeeCard from './EmployeeCard';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteEmployee, fetchEmployees } from '@redux/thunk';
import { useAppDispatch } from '@redux/hooks';
import { useAppSelector } from '@redux/store';
import { toast, ToastContainer } from 'react-toastify';
import { getGenderDisplay } from '@lib/utils/helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const EmployeeList = ({ viewMode }: { viewMode: 'list' | 'grid' }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.employees);
  const loadingEmployees = useAppSelector((state) => state.employees.loadingEmployees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    router.push(`/employee/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteEmployee(id))
      .unwrap()
      .then(() => {
        toast.success('Employee deleted successfully');
      })
      .catch((error) => {
        console.error(`Failed to delete employee with id ${id}:`, error);
        toast.error(`Failed to delete employee with id ${id}`);
      });
  };

  if (loadingEmployees) {
    return <Loader />;
  }

  if (viewMode === 'list') {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <ToastContainer />
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Image</th>
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
                <td className="px-4 py-2">
                  {employee.photo ? (
                    <Image src={employee.photo} alt={employee.firstName} width={70} height={50} />
                  ) : (
                    <Image
                      src="https://robohash.org/mail@ashallendesign.co.uk"
                      alt="Default placeholder"
                      width={70}
                      height={50}
                    />
                  )}
                </td>
                <td className="px-4 py-2">{employee.firstName}</td>
                <td className="px-4 py-2">{employee.lastName}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.number}</td>
                <td className="px-4 py-2">{getGenderDisplay(employee.gender)}</td>
                <td className="px-4 py-2">
                  <div className="space-x-2">
                    <Button
                      onClick={() => handleEdit(employee.id)}
                      className="bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600 transition duration-200"
                    >
                      <MdEdit className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(employee.id)}
                      className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 transition duration-200"
                    >
                      <RiDeleteBin6Line className="h-5 w-5" aria-hidden="true" />
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

  return (
    <div className="max-w-8xl mx-auto py-8">
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees?.map((employee) => (
          <EmployeeCard
            key={employee.id}
            firstName={employee.firstName}
            lastName={employee.lastName}
            email={employee.email}
            phoneNumber={employee.number}
            gender={employee.gender}
            photo={employee?.photo}
            onEdit={() => handleEdit(employee.id)}
            onDelete={() => handleDelete(employee.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
