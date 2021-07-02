const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type ToDo {
    _id: ID!
    name: String!
    description: String!
    due: String
  }

  type User {
    _id: ID!
    email: String!
    password: String!
  }

  # GET one user
  # GET all ToDos?
  type Query {
    user: User
    todos: [ToDo]
  }

  type Mutation {
    createToDo(name: String!, description: String!): ToDo
    editToDo(_id: String!): ToDo
    deleteToDo(_id: String!)
  }
  `;

  module.exports = typeDefs;