import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from '@graphql/mutation';
import { GET_EMPLOYEES, GET_EMPLOYEE_BY_ID } from '@graphql/queries';
import {
  Employee,
  CreateEmployeeInput,
  SearchEmployeeParams,
  CreateEmployeeResponse,
  DeleteEmployeeResponse,
  GetEmployeeByIdResponse,
  GetEmployeesResponse,
  UpdateEmployeeInput,
  UpdateEmployeeResponse,
} from '@graphql/types/employeeTypes';
import { FetchPolicy } from '@apollo/client';
import { client } from '@graphql/client';

const employeeResolvers = {
  Query: {
    async getEmployees({ search, sortBy, sortOrder }: SearchEmployeeParams) {
      const { data }: { data: GetEmployeesResponse } = await client().query({
        query: GET_EMPLOYEES,
        variables: { search, sortBy, sortOrder },
        fetchPolicy: 'network-only' as FetchPolicy,
      });
      return data.getEmployees;
    },
    async getEmployeeById(_: unknown, { id }: { id: string }): Promise<Employee | null> {
      const { data }: { data: GetEmployeeByIdResponse } = await client().query({
        query: GET_EMPLOYEE_BY_ID,
        fetchPolicy: 'network-only' as FetchPolicy,
        variables: { id },
      });
      return data.getEmployeeById;
    },
  },
  Mutation: {
    async createEmployee(_: unknown, input: CreateEmployeeInput): Promise<Employee> {
      const { data } = await client().mutate<CreateEmployeeResponse>({
        mutation: CREATE_EMPLOYEE,
        variables: { input },
      });

      if (!data || !data.createEmployee) {
        throw new Error('Failed to create employee');
      }

      return data.createEmployee;
    },
    async updateEmployee(_: unknown, input: UpdateEmployeeInput): Promise<Employee> {
      const { data } = await client().mutate<UpdateEmployeeResponse>({
        mutation: UPDATE_EMPLOYEE,
        variables: { input },
      });

      if (!data || !data.updateEmployee) {
        throw new Error('Failed to update employee');
      }

      return data.updateEmployee;
    },
    async deleteEmployee(_: unknown, { input }: { input: { id: string } }): Promise<Employee> {
      const { data } = await client().mutate<DeleteEmployeeResponse>({
        mutation: DELETE_EMPLOYEE,
        variables: { input: { id: input.id } },
      });

      if (!data || !data.deleteEmployee) {
        throw new Error('Failed to delete employee');
      }

      return data.deleteEmployee;
    },
  },
};

export { employeeResolvers };
