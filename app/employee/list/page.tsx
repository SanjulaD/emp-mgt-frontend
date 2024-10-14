'use client';
import { useRouter } from 'next/navigation';
import EmployeeList from '@components/organisms/EmployeeList';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { MdGridView } from 'react-icons/md';
import { CiViewList } from 'react-icons/ci';
import Button from '@components/atoms/Button';
import { EMPLOYEE_PATHS, VIEW_MODES } from '@lib/utils/constants';

const Employee = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<(typeof VIEW_MODES)[keyof typeof VIEW_MODES]>(VIEW_MODES.LIST);

  const handleAddEmployee = () => {
    router.push(EMPLOYEE_PATHS.ADD);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === VIEW_MODES.LIST ? VIEW_MODES.GRID : VIEW_MODES.LIST));
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-end items-center mb-4 space-x-4">
        <Button
          onClick={handleAddEmployee}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <FaPlus className="h-5 w-5 mr-2" aria-hidden="true" />
          Add Employee
        </Button>

        <Button
          onClick={toggleViewMode}
          className="flex items-center bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          {viewMode === VIEW_MODES.LIST ? (
            <MdGridView className="h-5 w-5" aria-hidden="true" />
          ) : (
            <CiViewList className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      <EmployeeList viewMode={viewMode} />
    </div>
  );
};

export default Employee;
