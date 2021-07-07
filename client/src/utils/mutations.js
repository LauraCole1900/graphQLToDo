import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      _id
      email
      password
    }
  }
`;

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

export const NEW_TODO = gql`
  mutation newToDo($name: String!, $description: String, $due: String)
    newToDo(name: $name, description: $description, due: $due) {
      _id
      name
      description
      due
    }
`;