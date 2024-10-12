export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  gender: string;
  photo?: string;
}

export interface GetEmployeesResponse {
  getEmployees: Employee[];
}

export interface GetEmployeeByIdResponse {
  getEmployeeById: Employee;
}

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  gender: string;
  photo?: string;
}

export interface CreateEmployeeResponse {
  createEmployee: Employee;
}

export interface DeleteEmployeeInput {
  id: string;
}

export interface DeleteEmployeeResponse {
  deleteEmployee: Employee;
}
