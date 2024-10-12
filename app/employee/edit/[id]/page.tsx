'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@components/atoms/InputField';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@redux/hooks';
import { useAppSelector } from '@redux/store';
import { fetchEmployeeById } from '@redux/thunk';
import Loader from '@components/atoms/Loader';
import { Employee } from '@graphql/types/employeeTypes';
import { employeeSchema } from '@lib/schemas/employeeSchema';

const EditEmployee: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<Employee>({
    resolver: zodResolver(employeeSchema),
  });

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.employees.loading);

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id))
        .unwrap()
        .then((employeeData) => {
          if (employeeData) {
            reset(employeeData);
          } else {
            toast.error('Employee not found');
          }
        })
        .catch((error) => {
          toast.error('Failed to fetch employee details');
        });
    }
  }, [id, dispatch, reset]);

  const onSubmit: SubmitHandler<Employee> = (data) => {
    console.log('click u[date');
    // dispatch(updateEmployee({ id, ...data }))
    //   .unwrap()
    //   .then(() => {
    //     toast.success('Employee updated successfully');
    //     router.push('/employee/list');
    //   })
    //   .catch((error) => {
    //     toast.error('Failed to update employee');
    //   });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-md mx-auto py-8">
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

        <div className="mt-auto flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
