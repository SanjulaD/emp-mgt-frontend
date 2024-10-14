import React, { useState, useEffect } from 'react';
import Button from '@components/atoms/Button';
import Loader from '@components/atoms/Loader';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteEmployee, fetchEmployees } from '@redux/thunk';
import { useAppDispatch } from '@redux/hooks';
import { useAppSelector } from '@redux/store';
import { toast, ToastContainer } from 'react-toastify';
import { getGenderDisplay } from '@lib/utils/helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Table from '@components/atoms/Table';
import EmployeeCard from '@components/molecules/EmployeeCard';
import SearchBar from '@components/molecules/SearchBar';
import { DEFAULT_SEARCH_TERM, DEFAULT_SORT_BY, DEFAULT_SORT_ORDER, VIEW_MODES } from '@lib/utils/constants';

const EmployeeList = ({ viewMode }: { viewMode: typeof VIEW_MODES.LIST | typeof VIEW_MODES.GRID }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.employees);
  const loadingEmployees = useAppSelector((state) => state.employees.loadingEmployees);

  const [search, setSearch] = useState<string>(DEFAULT_SEARCH_TERM);
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_BY);
  const [sortOrder, setSortOrder] = useState<string>(DEFAULT_SORT_ORDER);

  useEffect(() => {
    dispatch(fetchEmployees({ search, sortBy, sortOrder }));
  }, [dispatch, search, sortBy, sortOrder]);

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

  const handleSearch = (term: string, sortBy: string, sortOrder: string) => {
    setSearch(term);
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  const columns = [
    {
      header: 'Image',
      accessor: (row: any) =>
        row.photo ? (
          <Image src={row.photo} alt={row.firstName} width={70} height={50} />
        ) : (
          <Image
            src="https://robohash.org/default"
            alt={`${row.firstName} ${row.lastName}`}
            width={70}
            height={50}
            priority={true}
            quality={80}
          />
        ),
    },
    { header: 'First Name', accessor: 'firstName' },
    { header: 'Last Name', accessor: 'lastName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone Number', accessor: 'number' },
    { header: 'Gender', accessor: (row: any) => getGenderDisplay(row.gender) },
    {
      header: 'Actions',
      accessor: (row: any) => (
        <div className="space-x-2">
          <Button
            onClick={() => handleEdit(row.id)}
            className="bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            <MdEdit className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            <RiDeleteBin6Line className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      ),
    },
  ];

  if (viewMode === 'list') {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <ToastContainer />
        <SearchBar onSearch={handleSearch} />
        {loadingEmployees ? <Loader /> : <Table columns={columns} data={employees} />}
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto py-8">
      <ToastContainer />
      <SearchBar onSearch={handleSearch} />
      {loadingEmployees ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default EmployeeList;
