import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    getEmployees {
      id
      firstName
      lastName
      email
      number
      gender
      photo
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
      id
      firstName
      lastName
      email
      number
      gender
    }
  }
`;
