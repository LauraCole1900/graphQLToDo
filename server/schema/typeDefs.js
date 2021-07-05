const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type ToDo {
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
    allUsers: [User]!
    user(userID: ID!): User
    todos: [ToDo]
  }

  type Mutation {
    addUser(email: String!, password: String!): User
    addToDo(name: String!, description: String!): ToDo
    editToDo(_id: String!): ToDo
    deleteToDo(_id: ID!): String
  }
  `;

  module.exports = typeDefs;