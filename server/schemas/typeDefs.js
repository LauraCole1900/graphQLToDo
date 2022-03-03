const { gql } = require("apollo-server-express");

const typeDefs = gql`

# //==================//
# //      Inputs      //
# //==================//

  input ToDoInput {
    name: String!
    description: String!
    due: String
    done: Boolean!
  }


# //=================//
# //      Types      //
# //=================//

  type ToDo {
    userId: ID!
    _id: ID!
    name: String!
    description: String!
    due: String
    done: Boolean!
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    email: String!
    password: String!
  }


# //=================//
# //     Queries     //
# //=================//

  type Query {

  # //===================//
  # //   To-Do Queries   //
  # //===================//

    GetMyToDos(userId: ID): [ToDo]
    GetOneToDo(_id: ID!): ToDo
    GetToDos: [ToDo]


  # //====================//
  # //    User Queries    //
  # //====================//

    GetAllUsers: [User]!
    GetMe: User
    GetOneUser(email: String): User
  }


# //=================//
# //    Mutations    //
# //=================//

  type Mutation {

  # //=====================//
  # //   To-Do Mutations   //
  # //=====================//

    createToDo(userId: ID, name: String!, description: String!, due: String, done: Boolean!): ToDo
    deleteToDo(_id: ID!): ToDo
    editToDo(_id: ID!, name: String!, description: String!, due: String): ToDo
    markDone(_id: ID!, done: Boolean!): ToDo

  # //====================//
  # //   User Mutations   //
  # //====================//
  
    addUser(email: String!, password: String!): Auth
    login(email: String! password: String!): Auth
  }
  `;

module.exports = typeDefs;