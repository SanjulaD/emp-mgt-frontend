import { employeeSchema } from '../employeeSchema';

describe('employeeSchema', () => {
  it('should validate correct employee data', () => {
    const validEmployeeData = {
      firstName: 'Charles',
      lastName: 'Johnson',
      email: 'charles.johnson@example.com',
      number: '+94123456789',
      gender: 'M',
    };

    const result = employeeSchema.safeParse(validEmployeeData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validEmployeeData);
  });

  it('should throw an error for invalid first name', () => {
    const invalidEmployeeData = {
      firstName: 'Char', // Invalid: less than 6 characters
      lastName: 'Johnson',
      email: 'charles.johnson@example.com',
      number: '+94123456789',
      gender: 'M',
    };

    const result = employeeSchema.safeParse(invalidEmployeeData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('First name must be at least 6 characters long');
    }
  });

  it('should throw an error for invalid last name', () => {
    const invalidEmployeeData = {
      firstName: 'Charles',
      lastName: 'Jo', // Invalid: less than 6 characters
      email: 'charles.johnson@example.com',
      number: '+94123456789',
      gender: 'M',
    };

    const result = employeeSchema.safeParse(invalidEmployeeData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Last name must be at least 6 characters long');
    }
  });

  it('should throw an error for invalid email', () => {
    const invalidEmployeeData = {
      firstName: 'Charles',
      lastName: 'Johnson',
      email: 'invalid-email', // Invalid email
      number: '+94123456789',
      gender: 'M',
    };

    const result = employeeSchema.safeParse(invalidEmployeeData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address');
    }
  });

  it('should throw an error for invalid phone number format', () => {
    const invalidEmployeeData = {
      firstName: 'Charles',
      lastName: 'Johnson',
      email: 'charles.johnson@example.com',
      number: 'abcd12345', // Invalid: contains letters
      gender: 'M',
    };

    const result = employeeSchema.safeParse(invalidEmployeeData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid phone number. Format: +94123456789 or 0123456789');
    }
  });

  it('should throw an error for missing gender', () => {
    const invalidEmployeeData = {
      firstName: 'Charles',
      lastName: 'Johnson',
      email: 'charles.johnson@example.com',
      number: '+94123456789',
      // gender is missing
    };

    const result = employeeSchema.safeParse(invalidEmployeeData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Gender is required');
    }
  });
});
