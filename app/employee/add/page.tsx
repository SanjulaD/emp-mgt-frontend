'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@components/atoms/InputField'; // Ensure this component can handle the "select" prop as well
import { useRouter } from 'next/navigation';
import { employeeSchema } from '@lib/schemas/employeeSchema';
import { Employee } from '@graphql/types/employeeTypes';
import { createEmployee, fetchEmployees } from '@redux/thunk';
import { useAppDispatch } from '@redux/hooks';
import { toast, ToastContainer } from 'react-toastify';

const AddEmployee: React.FC = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<Employee>({
    resolver: zodResolver(employeeSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<Employee> = async (data) => {
    const input = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      number: data.number,
      gender: data.gender,
      photo: data.photo,
    };

    try {
      const result = await dispatch(createEmployee(input)).unwrap();
      if (!result || !result.id) {
        const errorMessage = 'Failed to create employee. Please try again.';
        console.error(errorMessage);
        toast.error(errorMessage);
        return;
      }
      dispatch(fetchEmployees());
      toast.success('Employee added successfully');

      router.push('/employee/list');
    } catch (error) {
      console.error('Failed to add employee:', error);
      const errorMessage = error.message || 'An unknown error occurred';
      toast.error(`Failed to add employee: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      <ToastContainer />
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

        <div className="mt-auto flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
