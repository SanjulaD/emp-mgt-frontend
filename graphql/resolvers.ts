import client from '@graphql/client';
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE } from '@graphql/mutation';
import { GET_EMPLOYEES, GET_EMPLOYEE_BY_ID } from '@graphql/queries';
import {
  Employee,
  CreateEmployeeInput,
  DeleteEmployeeInput,
  CreateEmployeeResponse,
  DeleteEmployeeResponse,
  GetEmployeeByIdResponse,
  GetEmployeesResponse,
} from '@graphql/types/employeeTypes';

const employeeResolvers = {
  Query: {
    async getEmployees(): Promise<Employee[]> {
      const { data }: { data: GetEmployeesResponse } = await client.query({ query: GET_EMPLOYEES });
      return data.getEmployees;
    },
    async getEmployeeById(_: unknown, { id }: { id: string }): Promise<Employee | null> {
      const { data }: { data: GetEmployeeByIdResponse } = await client.query({
        query: GET_EMPLOYEE_BY_ID,
        variables: { id },
      });
      return data.getEmployeeById;
    },
  },
  Mutation: {
    async createEmployee(_: unknown, input: CreateEmployeeInput): Promise<Employee> {
      const { data } = await client.mutate<CreateEmployeeResponse>({
        mutation: CREATE_EMPLOYEE,
        variables: input,
      });

      if (!data || !data.createEmployee) {
        throw new Error('Failed to create employee');
      }

      return data.createEmployee;
    },
    async deleteEmployee(_: unknown, { id }: DeleteEmployeeInput): Promise<Employee> {
      const { data } = await client.mutate<DeleteEmployeeResponse>({
        mutation: DELETE_EMPLOYEE,
        variables: { id },
      });

      if (!data || !data.deleteEmployee) {
        throw new Error('Failed to delete employee');
      }

      return data.deleteEmployee;
    },
  },
};

export { employeeResolvers };
