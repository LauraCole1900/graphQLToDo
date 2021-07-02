const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type ToDo {
    _id: ID!
    name: String!
    description: String!
    due: String
    created_At: Date!
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

  }
  `;

  module.exports = typeDefs;