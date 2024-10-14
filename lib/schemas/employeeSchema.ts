import { z } from 'zod';

export const employeeSchema = z.object({
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
  number: z
    .string()
    .regex(/^(\+94)?[0-9]{10}$/, 'Invalid phone number. Format: +94123456789 or 0123456789')
    .transform((num) => num.trim()),
  gender: z.enum(['M', 'F'], { required_error: 'Gender is required' }),
});
