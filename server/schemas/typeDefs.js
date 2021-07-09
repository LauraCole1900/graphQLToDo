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
    GetMyToDos(userId: String!): [ToDo]
    GetOneToDo(_id: ID!): ToDo
    GetOneUser(email: String): User
    GetToDos: [ToDo]
  }

  type Mutation {
    addUser(email: String!, password: String!): User
    createToDo(userId: String!, name: String!, description: String!, due: String): ToDo
    deleteToDo(_id: String!): ToDo
    editToDo(id: String!, name: String!, description: String! due: String): ToDo
  }
  `;

  module.exports = typeDefs;