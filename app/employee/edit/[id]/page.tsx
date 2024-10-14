'use client';

import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@components/atoms/InputField';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@redux/hooks';
import { useAppSelector } from '@redux/store';
import { updateEmployee, fetchEmployeeById } from '@redux/thunk';
import Loader from '@components/atoms/Loader';
import { Employee } from '@graphql/types/employeeTypes';
import { employeeSchema } from '@lib/schemas/employeeSchema';
import Button from '@components/atoms/Button';
import { toast, ToastContainer } from 'react-toastify';
import { EMPLOYEE_PATHS, BUTTON_TYPES } from '@lib/utils/constants';

const EditEmployee: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<Employee>({
    resolver: zodResolver(employeeSchema),
  });

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loadingUpdate = useAppSelector((state) => state.employees.loadingUpdate);
  const loadingEmployeeById = useAppSelector((state) => state.employees.loadingEmployeeById);

  useEffect(() => {
    const employeeId = id as string;

    if (id) {
      dispatch(fetchEmployeeById(employeeId))
        .unwrap()
        .then((employeeData) => {
          if (employeeData) {
            reset(employeeData);
          } else {
            toast.error('Employee not found');
          }
        })
        .catch(() => {
          toast.error('Failed to fetch employee details');
        });
    }
  }, [id, dispatch, reset]);

  const onSubmit: SubmitHandler<Employee> = async (data) => {
    const input = {
      id: id as string,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      number: data.number,
      gender: data.gender,
    };

    try {
      const result = await dispatch(updateEmployee(input)).unwrap();
      if (!result || !result.id) {
        const errorMessage = 'Failed to update employee. Please try again.';
        console.error(errorMessage);
        toast.error(errorMessage);
        return;
      }
      toast.success('Employee updated successfully');

      router.push(EMPLOYEE_PATHS.LIST);
    } catch (error) {
      console.error('Failed to update employee:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`Failed to update employee: ${errorMessage}`);
    }
  };

  const handleCancel = () => {
    router.push(EMPLOYEE_PATHS.LIST);
  };

  if (loadingEmployeeById) {
    return <Loader />;
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
        <InputField name="firstName" control={control} label="First Name" required />
        <InputField name="lastName" control={control} label="Last Name" required />
        <InputField name="email" control={control} label="Email" type="email" required />
        <InputField name="number" control={control} label="Phone Number" required />
        <InputField name="gender" control={control} label="Gender" as="select" required>
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </InputField>

        <div className="mt-auto flex justify-end space-x-4">
          <Button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button type={BUTTON_TYPES.SUBMIT} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {loadingUpdate ? 'Saving...' : 'Update'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
