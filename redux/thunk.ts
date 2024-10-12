import { createAsyncThunk } from '@reduxjs/toolkit';
import { employeeResolvers } from '@graphql/resolvers';
import { CreateEmployeeInput } from '@graphql/types/employeeTypes';

// Fetch employees thunk
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const employees = await employeeResolvers.Query.getEmployees();
  return employees;
});

// Fetch employee by ID thunk
export const fetchEmployeeById = createAsyncThunk('employees/fetchEmployeeById', async (id: string) => {
  const employee = await employeeResolvers.Query.getEmployeeById(null, { id });
  return employee;
});

// Create employee thunk
export const createEmployee = createAsyncThunk('employees/createEmployee', async (input: CreateEmployeeInput) => {
  const employee = await employeeResolvers.Mutation.createEmployee(null, input);
  return employee;
});

// Delete employee thunk
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: string) => {
  const deletedEmployee = await employeeResolvers.Mutation.deleteEmployee(null, { input: { id } });
  return deletedEmployee;
});