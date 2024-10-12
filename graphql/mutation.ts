import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
      firstName
      lastName
      email
      number
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($input: DeleteEmployeeInput!) {
    deleteEmployee(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;
