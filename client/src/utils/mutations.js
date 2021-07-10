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

export const CREATE_TODO = gql`
mutation createToDo($userId: String!, $name: String!, $description: String!, $due: String, $done: Boolean!) {
  createToDo(userId: $userId, name: $name, description: $description, due: $due, done: $done) {
    _id
    userId
    name
    description
    due
    done
  }
}
`;

export const DELETE_TODO = gql`
  mutation deleteToDo($id: String!) {
    deleteToDo(_id: $id) {
      _id
      name
      description
      due
      done
    }
  }
`;

export const EDIT_TODO = gql`
  mutation editToDo($id: String!, $name: String!, $description: String!, $due: String, $done: Boolean!) {
    editToDo(_id: $id, name: $name, description: $description, due: $due, done: $done) {
      _id
      name
      description
      due
      done
    }
  }
`;