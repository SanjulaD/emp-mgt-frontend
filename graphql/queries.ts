import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees($search: String, $sortBy: String, $sortOrder: String) {
    getEmployees(search: $search, sortBy: $sortBy, sortOrder: $sortOrder) {
      id
      firstName
      lastName
      email
      number
      gender
      photo
      createdAt
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
