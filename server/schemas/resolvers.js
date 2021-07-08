const { ToDo, User } = require("../models");

const resolvers = {
  Query: {
    GetMyToDos: async (_, userId) => {
      return await ToDo.find(userId)
    },
    GetOneUser: async (_, email) => {
      return User.findOne(email);
    },
    GetToDos: async () => {
      return ToDo.find({})
    },
  },

  Mutation: {
    addUser: async (_, { email, password }) => {
      return await User.create({ email, password })
    },
    createToDo: async (_, { userId, name, description, due }) => {
      return await ToDo.create({ userId, name, description, due })
    },
    deleteToDo: async (_, { _id, name, description, due }) => {
      return await ToDo.deleteOne({ _id, name, description, due })
    },
    editToDo: async (_, { _id, name, description, due }) => {
      return await ToDo.updateOne({ _id, name, description, due })
    },
  }
}

module.exports = resolvers;