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
  }

  # GET one user
  # GET all ToDos?
  type Query {
    GetAllUsers: [User]!
    GetMyToDos(userId: ID!): [ToDo]
    GetOneUser(email: String): User
    GetToDos: [ToDo]
  }

  type Mutation {
    addUser(email: String!, password: String!): User
    addToDo(userId: ID!, todoId: ID!): User
    createToDo(userId: String!, name: String!, description: String!, due: String): ToDo
    editToDo(_id: String!): ToDo
    deleteToDo(_id: ID!): String
  }
  `;

  module.exports = typeDefs;