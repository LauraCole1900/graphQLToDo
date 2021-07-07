import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      email
      todos{
        _id
        name
        description
        due
      }
    }
  }
`;

export const QUERY_TODOS = gql`
  query allTodos {
    todos {
      _id
      name
      description
      due
    }
  }
`;

export const QUERY_ONE_USER = gql`
  query GetOneUser($email: String) {
    GetOneUser(email: $email) {
      _id
      email
      password
    }
  }
`;

export const QUERY_ME = gql`
  query GetMe($email: String!) {
    GetMe(email: $email) {
      _id
      email
    }
  }
`;

export const QUERY_MY_TODOS = gql`
  query GetMyToDos($id: ID!) {
    GetMyToDos(_id: $id) {
      _id
      email
      todos {
        _id
        name
        description
        due
      }
    }
  }
`;