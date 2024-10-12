'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@components/atoms/InputField'; // Ensure this component can handle the "select" prop as well
import { useRouter } from 'next/navigation';

// Zod schema for validation
const employeeSchema = z.object({
  firstName: z
    .string()
    .min(6, 'First name must be at least 6 characters long')
    .max(10, 'First name must be at most 10 characters long')
    .regex(/^[A-Za-z]+$/, 'First name must only contain alphabets'),
  lastName: z
    .string()
    .min(6, 'Last name must be at least 6 characters long')
    .max(10, 'Last name must be at most 10 characters long')
    .regex(/^[A-Za-z]+$/, 'Last name must only contain alphabets'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().regex(/^(\+94)?[0-9]{10}$/, 'Invalid phone number. Format: +94123456789 or 0123456789'),
  gender: z.enum(['M', 'F'], { required_error: 'Gender is required' }),
});

// Type for form data
type EmployeeForm = z.infer<typeof employeeSchema>;

const AddEmployee: React.FC = () => {
  const { control, handleSubmit } = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<EmployeeForm> = (data) => {
    console.log('Employee added:', data);
    // Here you would typically make an API call to add the employee to the system
    // e.g., await addEmployee(data);
    router.push('/employee/list'); // Redirect back to the employee list after submission
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
        <InputField name="firstName" control={control} label="First Name" required />
        <InputField name="lastName" control={control} label="Last Name" required />
        <InputField name="email" control={control} label="Email" type="email" required />
        <InputField name="phoneNumber" control={control} label="Phone Number" required />
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
