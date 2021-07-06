import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      email
      todos
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
  query oneUser {
    oneUser {
      _id
      email
    }
  }
`;