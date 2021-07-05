import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      email
      todos
    }
  }

  query allTodos {
    todos {
      _id
      name
      description
      due
    }
  }

  query oneUser {
    user
  }
  `;