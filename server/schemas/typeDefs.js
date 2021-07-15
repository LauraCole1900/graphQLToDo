const { gql } = require("apollo-server-express");

const typeDefs = gql`

  input ToDoInput {
    name: String!
    description: String!
    due: String
    done: Boolean!
  }

  type ToDo {
    userId: ID!
    _id: ID!
    name: String!
    description: String!
    due: String
    done: Boolean!
  }

  type User {
    _id: ID
    email: String!
    password: String!
  }

  # GET one user
  # GET all ToDos?
  type Query {
    GetAllUsers: [User]!
    GetMyToDos(userId: String!): [ToDo]
    GetOneToDo(_id: String!): ToDo
    GetOneUser(email: String): User
    GetToDos: [ToDo]
  }

  type Mutation {
    addUser(email: String!, password: String!): User
    createToDo(userId: String!, name: String!, description: String!, due: String, done: Boolean!): ToDo
    deleteToDo(_id: String!): ToDo
    editToDo(_id: ID!, name: String!, description: String!, due: String, done: Boolean!): ToDo
  }
  `;

  module.exports = typeDefs;