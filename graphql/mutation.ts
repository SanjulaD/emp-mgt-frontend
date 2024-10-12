import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $firstName: String!
    $lastName: String!
    $email: String!
    $number: String!
    $gender: String!
    $photo: String
  ) {
    createEmployee(
      firstName: $firstName
      lastName: $lastName
      email: $email
      number: $number
      gender: $gender
      photo: $photo
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;
