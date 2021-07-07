const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type ToDo {
    userId: ID!
    _id: ID!
    name: String!
    description: String!
    due: String
  }

  type User {
    _id: ID
    email: String!
    password: String!
    todos: [ToDo]
  }

  # GET one user
  # GET all ToDos?
  type Query {
    GetAllUsers: [User]!
    GetMyToDos(_id: ID!): [User]
    GetOneUser(email: String): User
    GetToDos: [ToDo]
  }

  type Mutation {
    addUser(email: String!, password: String!): User
    addToDo(userId: ID!, todoId: ID!): User
    createToDo(name: String!, description: String!, due: String): ToDo
    editToDo(_id: String!): ToDo
    deleteToDo(_id: ID!): String
  }
  `;

  module.exports = typeDefs;