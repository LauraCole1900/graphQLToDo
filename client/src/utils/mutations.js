import { gql } from "@apollo/client";

export const ADD_TODO = gql`
  mutation addToDo($name: String!, $description: String!, $due: String) {
    addToDo(name: $name, description: $description, due: $due) {
      _id
      name
      description
      due
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      _id
      email
      password
    }
  }
`;

export const CREATE_TODO = gql`
  mutation createToDo($userId: String!, $name: String!, $description: String!, $due: String) {
    createToDo(userId: $userId, name: $name, description: $description, due: $due) {
      _id
      userId
      name
      description
      due
    }
  }
`;