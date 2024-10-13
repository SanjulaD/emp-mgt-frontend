import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
      firstName
      lastName
      email
      number
      gender
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
      id
      firstName
      lastName
      email
      number
      gender
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
      gender
    }
  }
`;
