import { GET_EMPLOYEES, GET_EMPLOYEE_BY_ID } from '@graphql/queries';
import { mockEmployeeData } from '@graphql/mocks/mockEmployeeData';
import { employeeResolvers } from '@graphql/resolvers';
import { DELETE_EMPLOYEE } from '@graphql/mutation';
import { GetEmployeesResponse, GetEmployeeByIdResponse, DeleteEmployeeResponse } from '@graphql/types/employeeTypes';

const mockedClient = {
  query: jest.fn(),
  mutate: jest.fn(),
  cache: {
    readQuery: jest.fn(),
    writeQuery: jest.fn(),
  },
};

jest.mock('@graphql/client', () => {
  const originalModule = jest.requireActual('@graphql/client');
  return {
    __esModule: true,
    ...originalModule,
    client: jest.fn(() => mockedClient),
  };
});

describe('employeeResolvers with mock data', () => {
  beforeEach(() => {
    mockedClient.query.mockClear();
    mockedClient.mutate.mockClear();
  });

  describe('Query', () => {
    it('should fetch all employees', async () => {
      const mockData: GetEmployeesResponse = { getEmployees: mockEmployeeData };
      mockedClient.query.mockResolvedValue({ data: mockData });

      const result = await employeeResolvers.Query.getEmployees({
        search: '',
        sortBy: 'name',
        sortOrder: 'asc',
      });

      expect(mockedClient.query).toHaveBeenCalledWith({
        query: GET_EMPLOYEES,
        variables: { search: '', sortBy: 'name', sortOrder: 'asc' },
        fetchPolicy: 'network-only',
      });

      expect(result).toEqual(mockData.getEmployees);
    });

    it('should fetch an employee by ID', async () => {
      const employeeId = '1'; // Example employee ID
      const mockData: GetEmployeeByIdResponse = { getEmployeeById: mockEmployeeData[0] }; // Assuming the first employee matches
      mockedClient.query.mockResolvedValue({ data: mockData });

      const result = await employeeResolvers.Query.getEmployeeById(null, { id: employeeId });

      expect(mockedClient.query).toHaveBeenCalledWith({
        query: GET_EMPLOYEE_BY_ID,
        variables: { id: employeeId },
        fetchPolicy: 'network-only',
      });

      expect(result).toEqual(mockData.getEmployeeById);
    });
  });

  describe('Mutation', () => {
    it('should delete an employee', async () => {
      const employeeId = '1'; // Example employee ID
      const mockData: DeleteEmployeeResponse = { deleteEmployee: mockEmployeeData[0] };
      mockedClient.mutate.mockResolvedValue({ data: mockData });

      const result = await employeeResolvers.Mutation.deleteEmployee(null, { input: { id: employeeId } });

      expect(mockedClient.mutate).toHaveBeenCalledWith({
        mutation: DELETE_EMPLOYEE,
        variables: { input: { id: employeeId } },
      });

      expect(result).toEqual(mockData.deleteEmployee);
    });
  });
});
