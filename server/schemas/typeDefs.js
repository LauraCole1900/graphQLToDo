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
    GetOneUser(email: String): User
    ToDos: [ToDo]
    GetMyToDos(_id: ID!): [User]
  }

  type Mutation {
    addUser(email: String!, password: String!): User
    addToDo(userId: ID!, todoId: ID!): User
    editToDo(_id: String!): ToDo
    deleteToDo(_id: ID!): String
    newToDo(name: String!, description: String!, due: String): ToDo
  }
  `;

  module.exports = typeDefs;